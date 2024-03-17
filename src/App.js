import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import Axios from "axios";

const Scene = ({ vertex, fragment }) => {
  const meshRef = useRef();
  const noiseTexture = useTexture("/noise2.png");
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

function App() {
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  useEffect(() => {
    Axios.get("/vertexShader.glsl")
      .then((res) => {
        setVertex(res.data);
        console.log(res.data);
      })
      .catch();
    Axios.get("/fragmentShader.glsl").then((res) => setFragment(res.data));
  }, []);

  if (vertex == "" || fragment == "") return null;

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <Scene vertex={vertex} fragment={fragment} />
    </Canvas>
  );
}

export default App;
