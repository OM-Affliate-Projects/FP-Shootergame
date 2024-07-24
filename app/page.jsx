"use client";
import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Lights, Ground, Cube, FirstPersonControls } from "./components";

export default function Game() {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows camera={{ position: [5, 1.5, 0] }}>
        {testing ? <axesHelper /> : null}
        {testing ? <gridHelper /> : null}
        {testing ? <Stats /> : null}
        <Lights />
        <Ground />
        <Cube />
        {/* <OrbitControls /> */}
        <FirstPersonControls />
      </Canvas>
    </div>
  );
}
