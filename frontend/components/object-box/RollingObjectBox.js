import React from 'react'
import {Canvas} from '@react-three/fiber'
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import {Physics} from '@react-three/cannon'
import {createUseStyles} from 'react-jss'


import useDeveloperMode from '../../hooks/useDeveloperMode'
import useComponentSize from '../../hooks/useComponentSize'
import useIsClientSideRendering from '../../hooks/useIsClientSideRendering'
import Floor from './Floor'
import Barrier from './Barrier'
import Object from './Object'


const useStyles = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
})

export default function RollingObjectBox({objectList, addObject, updateObject}) {
  const ref = React.useRef()
  const classes = useStyles()
  const developerMode = useDeveloperMode()
  const isClientSideRendering = useIsClientSideRendering()
  const {width, height, ready} = useComponentSize(ref)

  const onBoxClick = () => {
    if (ready) {
      addObject()
    }
  }

  return (
    <div ref={ref} className={classes.root} onClick={onBoxClick}>
      {
        (isClientSideRendering && ready) ? (
          <Canvas className={classes.canvas}>

            <Physics gravity={[0, 0, -10]} defaultContactMaterial={{friction: 0.01, restitution: 0.5}}>
              <PerspectiveCamera makeDefault position={[0, 0, 10]}/>

              {developerMode ? <axesHelper/> : null}
              {developerMode ? <OrbitControls/> : null}

              <ambientLight color={0xf0f5fb}/>
              <spotLight
                color={0xefdfd5}
                intensity={1}
                position={[0, 0, 15]}
                distance={20}
                castShadow={true}
              />

              <Floor size={[width, height]} color={0xdfdfdf}/>

              {/* Top Barrier */}
              <Barrier
                position={[0, 5, 5]}
                rotation={[Math.PI / 2, 0, 0]}
                size={[10, 10]} color={developerMode ? 'blue' : null}/>
              Bottom Barrier
              <Barrier
                position={[0, -5, 5]}
                rotation={[-Math.PI / 2, 0, 0]}
                size={[10, 10]} color={developerMode ? 'blue' : null}/>
              {/* Left Barrier */}
              <Barrier
                position={[-5, 0, 5]}
                rotation={[0, Math.PI / 2, 0]}
                size={[10, 10]} color={developerMode ? 'green' : null}/>
              {/* Right Barrier */}
              <Barrier
                position={[5, 0, 5]}
                rotation={[0, -Math.PI / 2, 0]}
                size={[10, 10]} color={developerMode ? 'green' : null}/>

              {
                // Canvas 裡不能用 context (https://github.com/pmndrs/react-three-fiber/issues/43)
                objectList.map(object => (
                  <Object key={object.id} object={object} update={updateObject}/>
                ))
              }
            </Physics>
          </Canvas>
        ) : null
      }
    </div>
  )
}
