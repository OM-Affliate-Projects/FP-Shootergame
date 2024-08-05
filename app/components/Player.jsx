import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";

export default function Player() {
  const playerRef = useRef();
  const [keysPressed, setKeysPressed] = useState({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
  });
  const [mouse, setMouse] = useState({
    rightButtonDown: false,
    movementX: 0,
    movementY: 0,
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

    const handleMouseDown = (event) => {
      if (event.button === 2) {
        setMouse((prev) => ({ ...prev, rightButtonDown: true }));
      }
    };

    const handleMouseUp = (event) => {
      if (event.button === 2) {
        setMouse((prev) => ({ ...prev, rightButtonDown: false }));
      }
    };

    const handleMouseMove = (event) => {
      if (mouse.rightButtonDown) {
        setMouse((prev) => ({
          ...prev,
          movementX: event.movementX,
          movementY: event.movementY,
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse.rightButtonDown]);

  useFrame(() => {
    if (playerRef.current) {
      const movementSpeed = 2;
      const angularSpeed = 0.5;

      let velocity = new Vector3();
      let angularVelocity = new Vector3();

      // Get the player's current rotation (quaternion)
      const quaternion = playerRef.current.rotation(); // Retrieves the quaternion representing the rotation

      // Create a local direction vector (e.g., forward)
      const localForward = new Vector3(0, 0, 1); // Assuming forward is along the negative Z-axis

      // Transform the local direction to world space using the quaternion
      const worldForward = localForward.clone().applyQuaternion(quaternion);

      // Calculate the linear velocity based on user input
      if (keysPressed.forward)
        velocity.add(worldForward.multiplyScalar(-movementSpeed)); // Forward moves in world backward direction
      if (keysPressed.backward)
        velocity.add(worldForward.multiplyScalar(movementSpeed)); // Backward moves in world forward direction

      if (keysPressed.leftward) {
        angularVelocity.y = angularSpeed;
      } else if (keysPressed.rightward) {
        angularVelocity.y = -angularSpeed;
      }

      if (
        mouse.rightButtonDown &&
        (mouse.movementX !== 0 || mouse.movementY !== 0)
      ) {
        angularVelocity.y -= mouse.movementX * angularSpeed;
        setMouse((prev) => ({
          ...prev,
          movementX: 0,
          movementY: 0,
        }));
      }

      playerRef.current.setLinvel(velocity, true);
      playerRef.current.setAngvel(angularVelocity, true);
    }
  });

  return (
    <>
      <RigidBody
        ref={playerRef}
        position={[0, 0.5, 2]}
        type="kinematicVelocity"
      >
        <mesh castShadow>
          <PerspectiveCamera position={[0, 3, 10]} makeDefault />
          <boxGeometry />
          <meshStandardMaterial color={"yellow"} />
        </mesh>
      </RigidBody>
    </>
  );
}
