import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const Scene = ({ vertex, fragment }) => {
  const meshRef = useRef();
  const noiseTexture = useTexture("/image/noise1.png");
  useFrame((state) => {
    let time = state.clock.getElapsedTime();
    meshRef.current.material.uniforms.iTime.value = time + 20;
  });
  const uniforms = useMemo(
    () => ({
      iTime: {
        type: "f",
        value: 1.0,
      },
      iResolution: {
        type: "v2",
        value: new THREE.Vector2(4, 3),
      },
      iChannel0: {
        type: "t",
        value: noiseTexture,
      },
    }),
    []
  );
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 3]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
