import * as THREE from 'three';
import { Renderer } from './renderer';

const _tempSize = new THREE.Vector3();
export class ScaleControls {
  private _renderer;

  private _boxHelper = new THREE.BoxHelper(new THREE.Mesh(), 0xffffff);
  private _boundingBox = new THREE.Box3();
  private _boundingCenter = new THREE.Vector3();

  private _widthIndicator = new THREE.Group();
  private _heightIndicator = new THREE.Group();
  private _depthIndicator = new THREE.Group();

  private _defaultBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
  private _defaultBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });

  constructor(render: Renderer) {
    this._renderer = render;
    this._createSizeIndicator();
    this._updateSizeDicatorPosition();
  }

  public showScaleControl(targetObject: THREE.Mesh) {
    this.dispose();

    this._renderer.webGLRenderer.setAnimationLoop(this._updateLoop.bind(this));

    this._boxHelper = new THREE.BoxHelper(targetObject, 0xffffff);
    this._boxHelper.matrixAutoUpdate = true;
    this._boxHelper.geometry.computeBoundingBox();
    this._boundingBox.copy(this._boxHelper.geometry.boundingBox!);

    this._widthIndicator.userData.text.style.visibility = 'visible';
    this._heightIndicator.userData.text.style.visibility = 'visible';
    this._depthIndicator.userData.text.style.visibility = 'visible';

    this._renderer.scene.add(this._boxHelper);
    this._renderer.scene.add(this._widthIndicator);
    this._renderer.scene.add(this._heightIndicator);
    this._renderer.scene.add(this._depthIndicator);

    // 更新分为两个部分_updateSizeDicatorPosition主要更新静止不动的边框
    this._updateSizeDicatorPosition();
    // _updateLoop主要更新文字位置 ，同时在setAnimationLoop重复调用更新文字位置
    this._updateLoop();
  }

  /**
   * 高度指示标尺
   */
  private _createSizeIndicator = () => {
    const line = new THREE.Mesh(
      this._defaultBoxGeometry,
      this._defaultBoxMaterial,
    );
    const top = new THREE.Mesh(
      this._defaultBoxGeometry,
      this._defaultBoxMaterial,
    );
    const bottom = new THREE.Mesh(
      this._defaultBoxGeometry,
      this._defaultBoxMaterial,
    );
    const edge = new THREE.Mesh(
      this._defaultBoxGeometry,
      this._defaultBoxMaterial,
    );

    line.scale.set(0.8, 0.08, 0.08); // 箭头的线
    top.scale.set(0.3, 0.08, 0.08); // 箭头的上半部分
    bottom.scale.set(0.3, 0.08, 0.08); // 箭头的下半部分
    edge.scale.set(0.08, 0.08, 0.5); // 箭头指向的边
    top.rotation.y = Math.PI / 4;
    bottom.rotation.y = -Math.PI / 4;

    const rightGroup = new THREE.Group();
    rightGroup.add(line, top, bottom, edge);
    const leftGroup = rightGroup.clone();
    leftGroup.rotation.y = Math.PI;

    const addContent = (group: THREE.Group) => {
      group.add(leftGroup.clone(), rightGroup.clone());
      const text = document.createElement('div');
      text.style.position = 'absolute';
      text.style.left = '-500px';
      text.style.color = '#00ae42';
      text.style.fontSize = '20px';
      text.style.zIndex = '100';
      text.style.visibility = 'hidden';
      this._renderer.canvas.parentElement?.appendChild(text);
      group.userData.text = text;
    };

    addContent(this._widthIndicator);
    addContent(this._heightIndicator);
    addContent(this._depthIndicator);
  };

  private _updateSizeDicatorPosition() {
    this._boundingBox.getCenter(this._boundingCenter);
    this._boundingBox.getSize(_tempSize);
    const width = _tempSize.x;
    const height = _tempSize.y;
    const depth = _tempSize.z;

    const rect = this._renderer.canvas.getBoundingClientRect();

    const updateIndicator = (
      indicatorGroup: THREE.Group,
      length: number,
      yRotation: number,
      zRotation: number,
      direction: 'x' | 'y' | 'z',
    ) => {
      indicatorGroup.children.forEach((group) => {
        const [line, top, bottom, edge] = group.children;
        const lineLen = length / 2 - 0.2;
        line.scale.x = lineLen;
        line.position.set(lineLen / 2 - 0.05, 0, 0);
        top.position.set(lineLen - 0.1, 0, 0.08);
        bottom.position.set(lineLen - 0.1, 0, -0.08);
        edge.position.set(lineLen + 0.2, 0, 0);
      });

      indicatorGroup.position.set(
        this._boundingCenter.x - (direction !== 'x' ? width / 2 : 0),
        this._boundingCenter.y - (direction !== 'y' ? height / 2 : 0),
        this._boundingCenter.z + (direction !== 'z' ? depth / 2 : 0),
      );

      indicatorGroup.userData.position = indicatorGroup.position.clone();

      indicatorGroup.rotation.y = yRotation;
      indicatorGroup.rotation.z = zRotation;

      const valuePos = new THREE.Vector3().copy(indicatorGroup.position);
      valuePos.project(this._renderer.camera);

      const text = indicatorGroup.userData.text as HTMLDivElement;
      text.style.left = `${Math.round((valuePos.x * rect.width) / 2) - 100}px`;
      text.style.bottom = `${Math.round((valuePos.y * rect.height) / 2) - 10}px`;
      text.textContent = `${length.toFixed(2)}mm`;
    };

    updateIndicator(this._widthIndicator, width, 0, 0, 'x');
    updateIndicator(this._heightIndicator, depth, -Math.PI / 2, 0, 'z');
    updateIndicator(this._depthIndicator, height, 0, Math.PI / 2, 'y');
  }

  private _updateLoop() {
    const rect = this._renderer.canvas.getBoundingClientRect();
    const distance = this._renderer.camera.position.distanceTo(
      this._boundingCenter,
    );

    // 更新尺寸指示标尺的位置，并根据相机的位置更新尺寸指示标尺的大小
    const update = (
      indicatorGroup: THREE.Group,
      textX: number,
      textY: number,
      direction: 'x' | 'y' | 'z',
    ) => {
      const text = indicatorGroup.userData.text as HTMLDivElement;
      const valuePos = new THREE.Vector3().copy(indicatorGroup.position);
      valuePos.project(this._renderer.camera);
      text.style.left = `${Math.round(((valuePos.x + 1) * rect.width) / 2) - textX}px`;
      text.style.bottom = `${Math.round(((valuePos.y + 1) * rect.height) / 2) - textY}px`;
      indicatorGroup.scale.set(1, distance / 40, distance / 40);

      const offset = distance / 100;

      if (direction === 'x') {
        indicatorGroup.position.y = indicatorGroup.userData.position.y - offset;
        indicatorGroup.position.z = indicatorGroup.userData.position.z + offset;
      } else if (direction === 'y') {
        indicatorGroup.position.x = indicatorGroup.userData.position.x - offset;
        indicatorGroup.position.z = indicatorGroup.userData.position.z + offset;
      } else if (direction === 'z') {
        indicatorGroup.position.x = indicatorGroup.userData.position.x - offset;
        indicatorGroup.position.y = indicatorGroup.userData.position.y - offset;
      }
    };

    update(this._widthIndicator, 50, -10, 'x');
    update(this._heightIndicator, 100, 10, 'z');
    update(this._depthIndicator, 100, 10, 'y');
  }

  public dispose() {
    if (this._boxHelper) {
      this._renderer.scene.remove(this._boxHelper);
      this._boxHelper.dispose();
    }

    this._renderer.webGLRenderer.setAnimationLoop(null);

    this._widthIndicator.userData.text.style.visibility = 'hidden';
    this._heightIndicator.userData.text.style.visibility = 'hidden';
    this._depthIndicator.userData.text.style.visibility = 'hidden';

    this._renderer.scene.remove(this._boxHelper);
    this._renderer.scene.remove(this._widthIndicator);
    this._renderer.scene.remove(this._heightIndicator);
    this._renderer.scene.remove(this._depthIndicator);
  }
}
