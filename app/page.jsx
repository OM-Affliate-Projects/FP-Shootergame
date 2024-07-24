"use client";
import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Lights } from "./components";

export default function Game() {
  const testing = true;

  return (
    <div className="container">
      <Canvas>
        {testing ? <axesHelper /> : null}
        {testing ? <gridHelper /> : null}
        {testing ? <Stats /> : null}
        <Lights />
        <OrbitControls />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color={"lightgreen"} />
        </mesh>
      </Canvas>
    </div>
  );
}
