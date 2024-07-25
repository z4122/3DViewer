import * as THREE from 'three';
import { PopOverAccordion } from './popover-accordion';
import { PropAndInput } from './props-input';


type Props = {
  mesh: THREE.Mesh
}

export function AttributePanel(props: Props) {
  const { mesh } = props

  return (
    <div onClick={(event) => { event.stopPropagation() }}>
      <PopOverAccordion open={true} content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '8px', paddingRight: '8px', paddingBottom: '16px' }}>
          <div>
            <div style={{ color: '#ccc', fontSize: '16px' }}>Position</div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '8px' }}>
              <PropAndInput name={'X'} value={String(mesh.position.x)} onChange={(value) => mesh.position.x = value} />
              <PropAndInput name={'Y'} value={String(mesh.position.y)} onChange={(value) => mesh.position.y = value} />
              <PropAndInput name={'Z'} value={String(mesh.position.z)} onChange={(value) => mesh.position.z = value} />
            </div>
          </div>

          <div>
            <div style={{ color: '#ccc', fontSize: '16px' }}>Rotate</div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '8px' }}>
              <PropAndInput name={'X'} value={String(mesh.rotation.x)} unit={'°'} onChange={(value) => mesh.rotation.x = value} />
              <PropAndInput name={'Y'} value={String(mesh.rotation.y)} unit={'°'} onChange={(value) => mesh.rotation.y = value} />
              <PropAndInput name={'Z'} value={String(mesh.rotation.z)} unit={'°'} onChange={(value) => mesh.rotation.z = value} />
            </div>
          </div>

          <div >
            <div style={{ color: '#ccc', fontSize: '16px' }}>Scale</div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '8px' }}>
              <PropAndInput name={'X'} value={String(mesh.scale.x)} onChange={(value) => {
                mesh.scale.x = value
              }} />
              <PropAndInput name={'Y'} value={String(mesh.scale.y)} onChange={
                (value) => mesh.scale.y = value
              } />
              <PropAndInput name={'Z'} value={String(mesh.scale.z)} onChange={(value) => mesh.scale.z = value} />
            </div>
          </div>
        </div>
      } />
    </div>
  )

}