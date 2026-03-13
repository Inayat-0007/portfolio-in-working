"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 280;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const isCyan = Math.random() > 0.4;
      col[i * 3] = isCyan ? 0.2 + Math.random() * 0.2 : 0.4 + Math.random() * 0.2;
      col[i * 3 + 1] = isCyan ? 0.8 + Math.random() * 0.2 : 0.3 + Math.random() * 0.2;
      col[i * 3 + 2] = isCyan ? 0.95 + Math.random() * 0.05 : 0.8 + Math.random() * 0.2;
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.02;
    meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.03;
    meshRef.current.position.y = Math.sin(t * 0.05) * 0.3;
    meshRef.current.position.x = Math.cos(t * 0.04) * 0.2;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NeuralLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const linePositions = useMemo(() => {
    const pos: number[] = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      const x1 = (Math.random() - 0.5) * 18;
      const y1 = (Math.random() - 0.5) * 12;
      const z1 = (Math.random() - 0.5) * 8;
      pos.push(
        x1, y1, z1,
        x1 + (Math.random() - 0.5) * 4,
        y1 + (Math.random() - 0.5) * 3,
        z1 + (Math.random() - 0.5) * 2
      );
    }
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    if (!linesRef.current || !materialRef.current) return;
    const t = state.clock.getElapsedTime();
    linesRef.current.rotation.y = t * 0.012;
    linesRef.current.rotation.x = Math.sin(t * 0.06) * 0.02;
    materialRef.current.opacity = 0.04 + Math.sin(t * 0.8) * 0.03;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePositions.length / 3}
          args={[linePositions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        color="#00f0ff"
        transparent
        opacity={0.06}
      />
    </lineSegments>
  );
}

function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.15);
  });

  return (
    <mesh ref={meshRef} position={[2, 1, -2]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial
        color="#00f0ff"
        transparent
        opacity={0.03}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <Particles />
        <NeuralLines />
        <GlowOrb />
      </Canvas>
    </div>
  );
}
