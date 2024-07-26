"use client";
import { Suspense } from "react";
import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Lights, Ground, Cube, FirstPersonControls } from "./components";

export default function Game() {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows camera={{ position: [10, 1.5, 0] }}>
        <Suspense fallback={null}>
          {testing ? <axesHelper /> : null}
          {testing ? <gridHelper args={[100, 100]} /> : null}
          {testing ? <Stats /> : null}
          <Lights />
          <Ground />
          <Cube />
          <FirstPersonControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
