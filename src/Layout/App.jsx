import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Scene } from "../component/Scene";

function App() {
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  useEffect(() => {
    Axios.get("/GLSL/vertexShader.glsl")
      .then((res) => {
        setVertex(res.data);
      })
      .catch();
    Axios.get("/GLSL/fragmentShader.glsl").then((res) => setFragment(res.data));
  }, []);

  if (vertex == "" || fragment == "") return null;

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <Scene vertex={vertex} fragment={fragment} />
    </Canvas>
  );
}

export default App;
