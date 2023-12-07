import React, { useRef } from "react";

import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={100}
      alphaTest={0.85}
      scale={3}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={5}
        radius={10}
        intensity={2}
        ambient={0.55}
        position={[5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
