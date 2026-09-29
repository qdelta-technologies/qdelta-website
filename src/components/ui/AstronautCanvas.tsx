"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import * as THREE from "three";

function AstronautMesh() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/astronaut.glb");
  const { actions, names } = useAnimations(animations, group);

  // Play the GLB's existing idle animation continuously
  useEffect(() => {
    if (names.length > 0 && actions) {
      // Find the idle or primary animation
      const animName =
        names.find((n) => n.toLowerCase().includes("idle")) ||
        names.find((n) => n.toLowerCase().includes("anim")) ||
        names[0];

      const action = actions[animName];
      if (action) {
        action.reset().fadeIn(0.5).play();
        action.setLoop(THREE.LoopRepeat, Infinity);
      }
    }
  }, [actions, names]);

  // Subtle breathing micro-float to keep the character alive
  useFrame((state) => {
    if (group.current) {
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.9) * 0.035 - 1.15;
    }
  });

  return (
    <group ref={group} dispose={null} position={[0, -1.15, 0]}>
      {/* 
        Slightly turned towards the center headline (looking inward)
        Scaled to fit the camera view gracefully
      */}
      <group rotation={[0, 0.45, 0]}>
        <Center top={false}>
          <primitive object={scene} scale={0.012} />
        </Center>
      </group>
    </group>
  );
}

// Preload the GLB model for instant streaming
useGLTF.preload("/models/astronaut.glb");

export default function AstronautCanvas() {
  return (
    <div
      className="pointer-events-none absolute -bottom-6 sm:bottom-0 md:bottom-2 lg:bottom-4 left-[-20px] sm:left-2 md:left-6 lg:left-14 w-[240px] sm:w-[320px] md:w-[390px] lg:w-[460px] h-[340px] sm:h-[440px] md:h-[530px] lg:h-[620px] z-[15] select-none"
      aria-hidden="true"
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 0.15, 3.8],
          fov: 42,
        }}
        style={{ background: "transparent" }}
      >
        {/* ================= LIGHTING SYSTEM ================= */}
        {/* 1. Ambient Fill: Cool neutral fill to preserve suit PBR textures */}
        <ambientLight intensity={0.9} color="#e2e8f0" />

        {/* 2. Key Light: Soft frontal studio light */}
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.2}
          color="#f8fafc"
        />

        {/* 3. Golden Horizon Rim Light (Matching QDelta #FAB406 Golden Horizon) */}
        {/* Bottom rim light radiating up from the golden arc beneath the boots */}
        <pointLight
          position={[-1.5, -1.2, 0.5]}
          intensity={3.8}
          color="#FAB406"
          distance={5}
        />

        {/* Back-left golden rim halo */}
        <directionalLight
          position={[-3, 0.5, -2]}
          intensity={2.2}
          color="#FAB406"
        />

        {/* Subtle warm underglow */}
        <pointLight
          position={[0, -2, 1]}
          intensity={2.0}
          color="#F59E0B"
          distance={4}
        />

        {/* ================= 3D ASTRONAUT MODEL ================= */}
        <React.Suspense fallback={null}>
          <AstronautMesh />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
