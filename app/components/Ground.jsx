export default function Ground() {
  return (
    <>
      <mesh rotation-x={Math.PI * -0.5} receiveShadow position={[0,-0.0001,0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"lightblue"} />
      </mesh>
    </>
  );
}
