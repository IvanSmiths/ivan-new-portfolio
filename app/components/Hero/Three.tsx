"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Three = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Create an array of 20 cubes
    const cubes = [];
    const cubeSize = 0.5;
    const gap = 0.1;
    const totalCubes = 20;
    const rows = 4;
    const cols = Math.ceil(totalCubes / rows);

    // Calculate the starting x and y positions
    const startX = -((cols - 1) * (cubeSize + gap)) / 2;
    const startY = ((rows - 1) * (cubeSize + gap)) / 2;

    // Create and position cubes
    for (let i = 0; i < totalCubes; i++) {
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      const row = Math.floor(i / cols);
      const col = i % cols;

      cube.position.x = startX + col * (cubeSize + gap);
      cube.position.y = startY - row * (cubeSize + gap);
      scene.add(cube);
      cubes.push(cube);
    }

    renderer.render(scene, camera);

    // Clean up on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);
  return (
    <div>
      <div
        ref={mountRef}
        style={{ width: "100vw", height: "100vh", display: "flex" }}
      />
    </div>
  );
};

export default Three;
