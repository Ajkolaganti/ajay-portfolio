"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface SkillEntry {
  name: string;
  off: [number, number, number];
}

interface ClusterDef {
  id: string;
  center: [number, number, number];
  skills: SkillEntry[];
}

const CLUSTERS: ClusterDef[] = [
  {
    id: "Languages",
    center: [-3.2, 2.2, 0.3],
    skills: [
      { name: "Java 8/11/17", off: [-0.65, 0.45, -0.3] },
      { name: "SQL (T-SQL)", off: [0.55, 0.35, 0.5] },
      { name: "TypeScript", off: [-0.1, -0.65, 0.4] },
    ],
  },
  {
    id: "Backend",
    center: [2.8, 2.0, -0.5],
    skills: [
      { name: "Spring Boot", off: [-0.7, 0.6, -0.2] },
      { name: "Hibernate/JPA", off: [0.7, 0.5, 0.3] },
      { name: "Microservices", off: [-0.6, -0.3, 0.6] },
      { name: "REST APIs", off: [0.4, -0.6, -0.4] },
      { name: "SOAP", off: [0.65, 0.2, -0.7] },
      { name: "Kafka", off: [-0.4, 0.7, 0.5] },
    ],
  },
  {
    id: "Cloud / Infra",
    center: [0.3, 0.0, 2.5],
    skills: [
      { name: "AWS (EC2, S3, RDS, SQS)", off: [-0.7, 0.5, -0.4] },
      { name: "Docker", off: [0.65, 0.6, 0.4] },
      { name: "Kubernetes", off: [-0.4, -0.5, 0.55] },
      { name: "CI/CD", off: [0.7, -0.45, -0.5] },
    ],
  },
  {
    id: "Database",
    center: [3.2, -2.2, -0.3],
    skills: [
      { name: "SQL Server", off: [-0.6, 0.5, -0.3] },
      { name: "PostgreSQL", off: [0.6, 0.45, 0.5] },
      { name: "Oracle/MySQL", off: [-0.5, -0.45, 0.6] },
      { name: "Stored Procedures", off: [0.7, -0.5, -0.3] },
      { name: "Query Optimization", off: [0.2, 0.7, -0.6] },
      { name: "ETL", off: [-0.7, -0.5, -0.4] },
    ],
  },
  {
    id: "Security",
    center: [-3.0, -2.2, 0.5],
    skills: [
      { name: "IAM", off: [-0.5, 0.6, -0.4] },
      { name: "RBAC", off: [0.6, 0.5, 0.3] },
      { name: "OWASP", off: [-0.4, -0.4, 0.6] },
      { name: "Fortify", off: [0.6, -0.5, -0.4] },
      { name: "Black Duck", off: [0.3, 0.7, -0.55] },
      { name: "Audit Trails", off: [-0.6, -0.6, -0.3] },
    ],
  },
  {
    id: "Frontend",
    center: [-0.2, -3.8, -0.8],
    skills: [
      { name: "React", off: [-0.6, 0.4, -0.35] },
      { name: "Next.js", off: [0.55, 0.45, 0.4] },
      { name: "Tailwind CSS", off: [0.05, -0.6, 0.35] },
    ],
  },
];

// Backend↔Database, Backend↔Cloud, Languages↔Backend, Cloud↔Database,
// Security↔Cloud, Frontend↔Backend — drawn center-to-center in blue-white
const CROSS_PAIRS: [string, string][] = [
  ["Languages", "Backend"],
  ["Backend", "Cloud / Infra"],
  ["Backend", "Database"],
  ["Cloud / Infra", "Database"],
  ["Security", "Cloud / Infra"],
  ["Frontend", "Backend"],
];

// ─── Types ─────────────────────────────────────────────────────────────────────

interface NodeData {
  clusterIdx: number;
  clusterId: string;
  skill: string;
  pos: [number, number, number];
  phase: number;
}

// ─── Scene graph ───────────────────────────────────────────────────────────────

interface GraphProps {
  activeSkill: string;
  activeCategory: string;
  reducedMotion: boolean;
}

function ConstellationGraph({ activeSkill, activeCategory, reducedMotion }: GraphProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const clusterEdgeRefs = useRef<(THREE.LineSegments | null)[]>([]);

  const { nodes, clusterGeoms, crossGeom } = useMemo(() => {
    // Flat node list
    const nodes: NodeData[] = [];
    CLUSTERS.forEach((cl, ci) => {
      cl.skills.forEach((s, si) => {
        nodes.push({
          clusterIdx: ci,
          clusterId: cl.id,
          skill: s.name,
          pos: [cl.center[0] + s.off[0], cl.center[1] + s.off[1], cl.center[2] + s.off[2]],
          phase: (ci * 7.3 + si * 3.14159) % (Math.PI * 2),
        });
      });
    });

    // Per-cluster all-pairs intra edges
    const clusterGeoms = CLUSTERS.map((cl) => {
      const pts = cl.skills.map((s) => [
        cl.center[0] + s.off[0],
        cl.center[1] + s.off[1],
        cl.center[2] + s.off[2],
      ]);
      const verts: number[] = [];
      for (let a = 0; a < pts.length; a++) {
        for (let b = a + 1; b < pts.length; b++) {
          verts.push(...pts[a], ...pts[b]);
        }
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(verts), 3));
      return g;
    });

    // Cross-cluster center-to-center edges
    const centerMap = new Map<string, [number, number, number]>(
      CLUSTERS.map((c) => [c.id, c.center])
    );
    const crossVerts: number[] = [];
    CROSS_PAIRS.forEach(([a, b]) => {
      const ca = centerMap.get(a)!;
      const cb = centerMap.get(b)!;
      crossVerts.push(...ca, ...cb);
    });
    const crossGeom = new THREE.BufferGeometry();
    crossGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(crossVerts), 3)
    );

    return { nodes, clusterGeoms, crossGeom };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Slow orbit — barely perceptible, one full rotation ~3 min
    if (!reducedMotion && groupRef.current) {
      groupRef.current.rotation.y = t * 0.035;
      groupRef.current.rotation.x = Math.sin(t * 0.012) * 0.07;
    }

    // Per-node scale + emissive lerp + idle drift
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const n = nodes[i];
      if (!n) return;

      const isSkill = !!activeSkill && activeSkill === n.skill;
      const isCat = !!activeCategory && activeCategory === n.clusterId;

      const tgtScale = isSkill ? 3.0 : isCat ? 2.2 : 1.0;
      const tgtEmi = isSkill ? 2.2 : isCat ? 1.4 : 0.6;

      mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, tgtScale, 0.1));

      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, tgtEmi, 0.1);

      if (!reducedMotion) {
        mesh.position.y = n.pos[1] + Math.sin(t * 0.65 + n.phase) * 0.07;
      }
    });

    // Per-cluster edge opacity
    clusterEdgeRefs.current.forEach((ls, ci) => {
      if (!ls) return;
      const mat = ls.material as THREE.LineBasicMaterial;
      const active = !!activeCategory && activeCategory === CLUSTERS[ci]?.id;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, active ? 0.7 : 0.28, 0.08);
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.25} />
      <pointLight position={[2, 4, 6]} intensity={0.35} color="#E8923C" />

      {/* Skill nodes */}
      {nodes.map((n, i) => (
        <mesh
          key={n.skill}
          position={n.pos}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial
            color="#E8923C"
            emissive="#E8923C"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
      ))}

      {/* Intra-cluster edges — dim amber, one lineSegments per cluster so opacity is animatable */}
      {CLUSTERS.map((cl, ci) => (
        <lineSegments
          key={cl.id}
          ref={(el) => {
            clusterEdgeRefs.current[ci] = el;
          }}
        >
          <primitive object={clusterGeoms[ci]} attach="geometry" />
          <lineBasicMaterial
            color="#E8923C"
            transparent
            opacity={0.28}
            depthWrite={false}
          />
        </lineSegments>
      ))}

      {/* Cross-cluster edges — cool blue-white, system-level connections */}
      <lineSegments>
        <primitive object={crossGeom} attach="geometry" />
        <lineBasicMaterial
          color="#A8C5E8"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// ─── Public component ──────────────────────────────────────────────────────────

export interface ApiConstellationSceneProps {
  activeSkill?: string;
  activeCategory?: string;
}

export default function ApiConstellationScene({
  activeSkill = "",
  activeCategory = "",
}: ApiConstellationSceneProps) {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 70 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ConstellationGraph
        activeSkill={activeSkill}
        activeCategory={activeCategory}
        reducedMotion={reducedMotion}
      />
    </Canvas>
  );
}
