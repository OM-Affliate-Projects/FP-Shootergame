"use client";
import { Suspense } from "react";
import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Lights,
  Ground,
  Cube,
  FirstPersonControls,
  Player,
  Lab
} from "./components";
import { Physics, RigidBody } from "@react-three/rapier";


export default function Game() {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows camera={{ position: [10, 1.5, 0] }}>
        <Suspense fallback={null}>
          <Physics debug>
            {testing ? <axesHelper /> : null}
            {testing ? <gridHelper args={[100, 100]} /> : null}
            {testing ? <Stats /> : null}
            <Lights />
            {/* <RigidBody>
              <mesh>
                <planeGeometry />
                <meshStandardMaterial />
              </mesh>
            </RigidBody> */}
            <RigidBody>
              <Ground />
            </RigidBody>
            {/* <RigidBody>
              <Cube />
            </RigidBody> */}
            <Player />
            <Lab/>
            {/* <FirstPersonControls /> */}
            <OrbitControls />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
