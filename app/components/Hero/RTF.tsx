"use client";
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const CubeGrid = () => {
  const cubes = [];
  const numberOfCubes = 40;
  const rows = 4;
  const cols = Math.ceil(numberOfCubes / rows);
  const spacing = 1.5; // Adjust spacing between cubes

  for (let i = 0; i < numberOfCubes; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const x = col * spacing - (cols * spacing) / 2 + spacing / 2;
    const y = row * spacing - (rows * spacing) / 2 + spacing / 2;
    cubes.push(
      <Box key={i} position={[x, y, 0]}>
        <meshStandardMaterial attach="material" color="orange" />
      </Box>,
    );
  }

  return <>{cubes}</>;
};

const MyThree = () => {
  return (
    <div>
      <div id="canvas-container">
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <CubeGrid />
        </Canvas>
      </div>
    </div>
  );
};

export default MyThree;
