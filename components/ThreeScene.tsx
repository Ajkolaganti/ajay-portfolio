"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const seededRandom = (seed: number) => {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
};

// Particle field — API constellation theme
function ParticleField({ mousePos }: { mousePos: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const { positions, linePositions } = useMemo(() => {
    // 120 nodes forming a sparse constellation
    const nodeCount = 120;
    const pos = new Float32Array(nodeCount * 3);
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = (seededRandom(i * 3 + 1) - 0.5) * 14;
      const y = (seededRandom(i * 3 + 2) - 0.5) * 8;
      const z = (seededRandom(i * 3 + 3) - 0.5) * 6;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Connect nearby nodes with edges (API graph metaphor)
    const edges: number[] = [];
    const threshold = 2.8;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < threshold) {
          edges.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(edges),
    };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !lineRef.current) return;
    const t = clock.getElapsedTime();

    // Slow drift rotation + mouse parallax
    pointsRef.current.rotation.y = t * 0.03 + mousePos.x * 0.08;
    pointsRef.current.rotation.x = t * 0.015 + mousePos.y * 0.05;
    lineRef.current.rotation.y = pointsRef.current.rotation.y;
    lineRef.current.rotation.x = pointsRef.current.rotation.x;
  });

  return (
    <>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#E8923C"
          size={0.04}
          sizeAttenuation
          depthWrite={false}
          opacity={0.7}
        />
      </Points>

      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#E8923C"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const shapes = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (seededRandom(i * 7 + 1) - 0.5) * 10,
        (seededRandom(i * 7 + 2) - 0.5) * 6,
        (seededRandom(i * 7 + 3) - 0.5) * 4 - 2,
      ] as [number, number, number],
      rotation: [seededRandom(i * 7 + 4) * Math.PI, seededRandom(i * 7 + 5) * Math.PI, 0] as [number, number, number],
      scale: 0.15 + seededRandom(i * 7 + 6) * 0.2,
      speed: 0.2 + seededRandom(i * 7 + 7) * 0.3,
      offset: seededRandom(i * 7 + 8) * Math.PI * 2,
      type: i % 2 === 0 ? "oct" : "tet",
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const s = shapes[i];
      child.position.y = s.position[1] + Math.sin(t * s.speed + s.offset) * 0.3;
      child.rotation.x = s.rotation[0] + t * s.speed * 0.4;
      child.rotation.y = s.rotation[1] + t * s.speed * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          {s.type === "oct" ? (
            <octahedronGeometry args={[1, 0]} />
          ) : (
            <tetrahedronGeometry args={[1, 0]} />
          )}
          <meshBasicMaterial
            color="#E8923C"
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>
      ))}
    </group>
  );
}

interface ThreeSceneProps {
  mousePos: { x: number; y: number };
}

export default function ThreeScene({ mousePos }: ThreeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <ParticleField mousePos={mousePos} />
      <FloatingShapes />
    </Canvas>
  );
}
