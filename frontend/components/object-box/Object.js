import React from 'react'
import {useBox} from '@react-three/cannon'
import {Box} from '@react-three/drei'


export default function Object({object}) {
  const [ref, api] = useBox(() => ({mass: 1, position: object.defaultPosition, velocity: object.defaultVelocity}))

  return (
    <Box ref={ref} args={[1, 1, 1]} position={object.defaultPosition} castShadow={true}>
      <meshPhongMaterial color={'#202020'}/>
    </Box>
  )
}
