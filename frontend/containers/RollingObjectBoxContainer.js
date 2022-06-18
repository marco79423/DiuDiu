import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {generateId} from '@paji-sdk/utils'
import * as Tone from "tone"

import {selectObjectList} from '../selectors'
import useDeveloperMode from '../hooks/useDeveloperMode'
import objectSlice from '../slices/object'
import RollingObjectBox from '../components/object-box/RollingObjectBox'


export default function RollingObjectBoxContainer() {
  const dispatch = useDispatch()
  const developerMode = useDeveloperMode()
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

  return (
    <RollingObjectBox
      objectList={objectList}
      addObject={addObject}
      updateObject={updateObject}
    />
  )
}
