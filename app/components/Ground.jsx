export default function Ground() {
  return (
    <>
      <mesh rotation-x={Math.PI * -0.5} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"lightblue"} />
      </mesh>
    </>
  );
}
