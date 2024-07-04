"use client";

// src/PlaneWithCubes.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const PlaneWithCubes = () => {
  // Calculate positions for cubes
  const cubeSize = 1;
  const gap = 0.2;
  const cubes = [];
  const rows = 4;
  const cols = 20;
  const planeWidth = window.innerWidth / 100;
  const planeHeight = (cubeSize + gap) * rows;
  const startX = -planeWidth / 2 + cubeSize / 2;
  const startY = planeHeight / 2 - cubeSize / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cubes.push({
        position: [
          startX + col * (cubeSize + gap),
          startY - row * (cubeSize + gap),
          0,
        ],
      });
    }
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ width: "100vw", height: "100vh", background: "red" }}
    >
      <ambientLight intensity={0.1} color="red" />
      {cubes.map((cube, index) => (
        <mesh key={index} position={cube.position}>
          <Box args={[cubeSize, cubeSize, cubeSize]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      ))}
    </Canvas>
  );
};

export default PlaneWithCubes;
