export default function Cube() {
  return (
    <>
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry />
        <meshStandardMaterial color={"lightgreen"} />
      </mesh>
    </>
  );
}
