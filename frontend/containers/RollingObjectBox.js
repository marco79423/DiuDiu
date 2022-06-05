import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Canvas} from '@react-three/fiber'
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import {Physics} from '@react-three/cannon'
import {generateId} from '@paji-sdk/utils'
import {createUseStyles} from 'react-jss'
import * as Tone from "tone"

import {selectObjectList} from '../selectors'
import useDeveloperMode from '../hooks/useDeveloperMode'
import useComponentSize from '../hooks/useComponentSize'
import useIsClientSideRendering from '../hooks/useIsClientSideRendering'
import Floor from '../components/object-box/Floor'
import Barrier from '../components/object-box/Barrier'
import Object from '../components/object-box/Object'
import objectSlice from '../slices/object'


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

export default function RollingObjectBox() {
  const ref = React.useRef()
  const classes = useStyles()
  const dispatch = useDispatch()
  const developerMode = useDeveloperMode()
  const isClientSideRendering = useIsClientSideRendering()
  const {width, height, ready} = useComponentSize(ref)
  const objectList = useSelector(selectObjectList)

  React.useEffect(() => {
    if (developerMode) {
      console.log('啟動開發者模式')
    }
  }, [developerMode])

  const synthRef = React.useRef()
  React.useEffect(() => {
    const filter = new Tone.Filter(1800, 'lowpass').toDestination()
    synthRef.current = new Tone.NoiseSynth({
      noise: {
        type: 'white',
        playbackRate: 2
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.0001,
        release: 0.1
      }
    }).connect(filter)
  }, [])

  const addObject = () => {
    synthRef.current.triggerAttackRelease('0.01')
    dispatch(objectSlice.actions.addOne({
      id: generateId(),
      rolling: false,
      defaultPosition: [0, -5, 5],
      defaultVelocity: [Math.random() * 10 - 5, -Math.random() * 5, Math.random() * 10 - 5],
    }))
  }

  const updateObject = (id, changes) => {
    dispatch(objectSlice.actions.updateOne({
      id,
      changes,
    }))
  }

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
