"use client";

import React, { useRef, useEffect, useState, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import * as THREE from "three";

// Error boundary to prevent any 3D/WebGL error from surfacing as a white box or crash
class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("AstronautCanvas encountered an error:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

interface AstronautMeshProps {
  onLoaded?: () => void;
}

function AstronautMesh({ onLoaded }: AstronautMeshProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/astronaut.glb");
  const { actions, names } = useAnimations(animations, group);

  // Play the GLB's existing idle animation continuously
  useEffect(() => {
    if (names.length > 0 && actions) {
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
    // Signal that the model is ready and textures/materials are initialized
    onLoaded?.();
  }, [actions, names, onLoaded]);

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

// Preload the GLB model
if (typeof window !== "undefined") {
  try {
    useGLTF.preload("/models/astronaut.glb");
  } catch (err) {
    console.warn("Failed to preload astronaut model:", err);
  }
}

export default function AstronautCanvas() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Detect WebGL support cleanly
  useEffect(() => {
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return null;
  }

  return (
    <CanvasErrorBoundary>
      <div
        className={`pointer-events-none absolute -bottom-6 sm:bottom-0 md:bottom-2 lg:bottom-4 left-[-20px] sm:left-2 md:left-6 lg:left-14 w-[240px] sm:w-[320px] md:w-[390px] lg:w-[460px] h-[340px] sm:h-[440px] md:h-[530px] lg:h-[620px] z-[15] select-none bg-transparent transition-opacity duration-700 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
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
          onCreated={({ gl, scene }) => {
            gl.setClearColor(0x000000, 0);
            scene.background = null;
          }}
          style={{ background: "transparent", backgroundColor: "transparent" }}
          className="w-full h-full bg-transparent"
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
            <AstronautMesh onLoaded={() => setIsLoaded(true)} />
          </React.Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
