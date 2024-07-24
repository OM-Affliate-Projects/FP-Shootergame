import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

export default function Lights() {
  const lightRef = useRef();

  useHelper(lightRef, DirectionalLightHelper, 5, "red");
  return (
    <>
      <ambientLight />
      <directionalLight position={[0, 5, 5]} ref={lightRef} />
    </>
  );
}
