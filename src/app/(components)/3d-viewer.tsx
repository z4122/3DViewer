import React, { useEffect, useState } from 'react'
import { ClosableDialog } from './closable-dialog'
import { CloseIcon } from './icons/close'
import styled from "@mui/material/styles/styled";
import { Renderer } from '../core/renderer';
import ExportDropDown from './export-drop-down';


type Props = {
  handleClose: () => void
  glbFileUrl: string
  style?: React.CSSProperties
}

const CloseIconWrapper = styled('div')({
  position: 'absolute', 
  top: '32px', 
  right: '32px',

  '&:hover': {
    cursor: 'pointer'
  }
})

export function ThreeViewer(props: Props) {
  const { style, handleClose, glbFileUrl } = props

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();
  const [render, setRenderer] = useState<Renderer | null>();

  useEffect(() => {
    if (canvas) {
      const renderer = new Renderer(canvas);
      setRenderer(renderer);
      return () => {
        renderer.dispose();
      };
    }

    return () => {};
  }, [canvas]);

  useEffect(() => {
    if (render) {
      render.addGLBModel(glbFileUrl);
    }
  }, [glbFileUrl, render]);

  const exportAs = (type: 'GLTF' | 'USDZ' | 'STL' | 'OBJ') => {
    render?.exportAs(type)
  }

  return (
    <ClosableDialog
      style={{
        position: 'absolute',
        width: '100%',
        margin: 0,
        backgroundColor: '#A9CADC',
        maxHeight: '100%',
        maxWidth: '100%',
        ...style
      }}
      open={true}
      handleClose={handleClose}
    >
    <canvas
      style={{ width: '100%', height: '100%', position: 'absolute' }}
      ref={setCanvas}
    ></canvas>

      <CloseIconWrapper onClick={handleClose}>
        <CloseIcon></CloseIcon>
      </CloseIconWrapper>

      <div style={{position: 'absolute', left: '32px', bottom: '32px'}}>
        <div>Model Name Is Here</div>
        <div>Prompt Fake Is Here</div>
      </div>

      <div style={{position: 'absolute', right: '32px', bottom: '32px'}}>
        <ExportDropDown exportAs={exportAs}/>
      </div>
    </ClosableDialog>
  )
}