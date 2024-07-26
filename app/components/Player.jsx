import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";

export default function Player() {
  const playerRef = useRef();
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const movementSpeed = 2;
    let velocity = { x: 0, y: 0, z: 0 };

    if (keysPressed.forward) velocity.z -= movementSpeed;
    if (keysPressed.backward) velocity.z += movementSpeed;
    if (keysPressed.leftward) velocity.x -= movementSpeed;
    if (keysPressed.rightward) velocity.x += movementSpeed;

    playerRef.current.setLinvel(velocity, true);
  });

  return (
    <>
      <RigidBody ref={playerRef} position={[0, 0.5, 2]}>
        <mesh castShadow>
          <PerspectiveCamera position={[0, 3, 10]} makeDefault />
          <boxGeometry />
          <meshStandardMaterial color={"yellow"} />
        </mesh>
      </RigidBody>
    </>
  );
}
