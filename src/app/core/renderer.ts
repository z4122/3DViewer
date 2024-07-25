import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';

import { ScaleControls } from './scale-controls';
import { saveString, saveToLocal } from '../utils/common';



export class Renderer {
  public readonly webGLRenderer: THREE.WebGLRenderer;
  public readonly scene: THREE.Scene;
  public readonly camera: THREE.PerspectiveCamera;
  public readonly canvas: HTMLCanvasElement;

  private _onWindowResize: any;
  private _onMouseClick: any;
  private _onMouseDown: any;
  private _onMouseUp: any;
  private _onMouseMove: any;

  private _mouseDown: boolean = false;
  private _mouseMove: boolean = false;

  private _animationId: number;
  private _controls: OrbitControls;
  private _pointLight: THREE.PointLight;

  private _loader = new GLTFLoader();
  private _mouse = new THREE.Vector2();
  private _raycaster = new THREE.Raycaster();

  private _scaleControls: ScaleControls;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.webGLRenderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    let width = canvas.width;
    let height = canvas.height;
    if (canvas.parentElement) {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      this.webGLRenderer.setSize(width, height);
    }

    // init scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xA9CADC);

    // init camera
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1200);
    this.camera.up.set(0, 1, 0);
    this.camera.position.set(20, 0, 0);

    // set orbit control
    this._controls = new OrbitControls(this.camera, this.canvas);
    this._controls.maxDistance = 1000;
    this._controls.minDistance = 10;
    this._controls.mouseButtons = {
      LEFT: 0,
      MIDDLE: 2,
      RIGHT: 0,
    };

    // init light
    this._pointLight = new THREE.PointLight(0xffffff, 3, 0, 0);
    const hemisphereLight = new THREE.HemisphereLight(0x8d7c7c, 0x494966);
    this.scene.add(this._pointLight);
    this.scene.add(hemisphereLight);

    this.webGLRenderer.clear();

    this._animationId = 0;
    this.render();

    this._scaleControls = new ScaleControls(this);

    this.registerEventListeners();
  }

  public render() {
    this.webGLRenderer.render(this.scene, this.camera);
    this._controls.update();
    const { x, y, z } = this.camera.position.clone();
    this._pointLight.position.set(x, y, z);
    this._animationId = requestAnimationFrame(this.render.bind(this));
  }

  public dispose(): void {
    cancelAnimationFrame(this._animationId);
    window.removeEventListener('resize', this._onWindowResize);
    this.webGLRenderer.dispose();
  }

  public addGLBModel(url: string) {
    this._loader.load(url, (glb: GLTF) => {
      this._scaleControls.dispose();

      glb.scene.scale.set(10, 10, 10);
      const model = glb.scene
      this.scene.add(model);
    });
  }

  public exportAs(type: 'gltf' | 'glb' | 'stl') {
    let exporter: GLTFExporter | USDZExporter | STLExporter | OBJExporter;
    switch (type) {
      case 'gltf': {
        exporter = new GLTFExporter();
        exporter.parse(this.scene, (result) => {
          saveToLocal(result, type);
        }, (error) => {
          console.log('exporter error', type, error);
        })
        break;
      }
      case 'glb': {
        exporter = new GLTFExporter();
        exporter.parse(this.scene, (result) => {
          saveToLocal(result, type);
        }, (error) => {
          console.log('exporter error', type, error);
        }, { binary: true })
        break;
      }
      case 'stl': {
        exporter = new STLExporter();
        const result = exporter.parse(this.scene, { binary: true });
        saveString(result, 'scene.stl');
        break;
      }
    }
  }

  protected onWindowResize() {
    if (this.canvas?.parentElement) {
      const width = this.canvas.parentElement.clientWidth;
      const height = this.canvas.parentElement.clientHeight;
      this.webGLRenderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  private registerEventListeners() {
    this._onWindowResize = this.onWindowResize.bind(this);
    this._onMouseClick = this.onMouseClick.bind(this);
    this._onMouseDown = this.onMouseDown.bind(this);
    this._onMouseUp = this.onMouseUp.bind(this);
    this._onMouseMove = this.onMouseMove.bind(this);

    window.addEventListener('mousedown', this._onMouseDown, false);
    window.addEventListener('mouseup', this._onMouseUp, false);
    window.addEventListener('mousemove', this._onMouseMove, false);
    window.addEventListener('click', this._onMouseClick, false);
    window.addEventListener('resize', this._onWindowResize, false);
  }

  private onMouseDown(_: MouseEvent) {
    this._mouseDown = true;
    this._mouseMove = false;
  }

  private onMouseUp(_: MouseEvent) {
    this._mouseDown = false;
  }

  private onMouseMove(_: MouseEvent) {
    if (this._mouseDown) {
      this._mouseMove = true;
    }
  }

  private onMouseClick(event: MouseEvent) {
    if (this._mouseMove) {
      return;
    }

    this._scaleControls.dispose();
    const rect = this.canvas.getBoundingClientRect();

    // normilize mouse pos to [-1, 1]
    this._mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this._mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this._raycaster.setFromCamera(this._mouse, this.camera);

    const intersects = this._raycaster.intersectObjects([this.scene]);

    for (let i = 0; i < intersects.length; i++) {
      this._scaleControls.showScaleControl(
        intersects[i].object as THREE.Mesh,
      );
      return;
    }
  }
}
