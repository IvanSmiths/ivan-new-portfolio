"use client";
import { Canvas } from "@react-three/fiber";

function MyThree() {
  return (
    <div>
      <div id="canvas-container">
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}

export default MyThree;
