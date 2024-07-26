import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";


export default function Player() {
  const playerRef = useRef(0);
  const [keysPressed, setKeysPressed] = useState({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          setKeysPressed((prev) => ({ ...prev, forward: true }));
          break;
        case "ArrowDown":
        case "KeyS":
          setKeysPressed((prev) => ({ ...prev, backward: true }));
          break;
        case "ArrowLeft":
        case "KeyA":
          setKeysPressed((prev) => ({ ...prev, leftward: true }));
          break;
        case "ArrowRight":
        case "KeyD":
          setKeysPressed((prev) => ({ ...prev, rightward: true }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          setKeysPressed((prev) => ({ ...prev, forward: false }));
          break;
        case "ArrowDown":
        case "KeyS":
          setKeysPressed((prev) => ({ ...prev, backward: false }));
          break;
        case "ArrowLeft":
        case "KeyA":
          setKeysPressed((prev) => ({ ...prev, leftward: false }));
          break;
        case "ArrowRight":
        case "KeyD":
          setKeysPressed((prev) => ({ ...prev, rightward: false }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  }, []);



  useFrame(() => {

    if (keysPressed.forward) playerRef.current.setLinvel({x:0,y:0,z:-2})
    if (keysPressed.backward) playerRef.current.setLinvel({x:0,y:0,z:1})
    if (keysPressed.leftward) playerRef.current.setRotation()
    if (keysPressed.rightward) playerRef.current.setRotation()
      

  });


  return (
    <>

      <RigidBody ref={playerRef} position={[0, 0.5, 2]}>
        <mesh castShadow>
          <PerspectiveCamera position={[0, 1.5, 5]} makeDefault />
          <boxGeometry />
          <meshStandardMaterial color={"yellow"} />
        </mesh>
      </RigidBody>
    </>
  );
}
