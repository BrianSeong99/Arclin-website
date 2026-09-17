"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Exploded isometric layer stack. `progress` (0..1, scroll-driven) separates the slabs.
 * Slabs are ordered bottom→top; the IP boundary is a translucent ember plane.
 */
export type StackLayer = { id: string; owner: "partner" | "arclin" };

const IVORY = "#f4f1e8";
const PINE = "#1e4d46";
const PINE_LIGHT = "#2e6b61";
const SAND = "#dcd5bf";
const EMBER = "#c4562f";

function Slabs({ layers, exploded, animate, activeId, onActiveChange }: { layers: StackLayer[]; exploded: boolean; animate: boolean; activeId?: string | null; onActiveChange?: (id: string | null) => void }) {
  const group = useRef<THREE.Group>(null);
  const refs = useRef<THREE.Group[]>([]);
  const boundaries = useRef<THREE.Mesh[]>([]);
  const lifts = useRef<number[]>(layers.map(() => 0));
  // a boundary plane above every owner change from the bottom
  const bIdxs = layers.map((l, i) => (i > 0 && l.owner !== layers[i - 1].owner ? i : -1)).filter((i) => i > 0);
  const p = useRef(animate ? 0 : 1);
  useFrame(({ clock }, dt) => {
    const target = exploded || !animate ? 1 : 0;
    // time-based easing so the explosion completes in ~1.2s regardless of frame rate
    p.current = THREE.MathUtils.lerp(p.current, target, 1 - Math.exp(-Math.min(dt, 0.1) * 3.2));
    const gap = 0.16 + p.current * 0.9;
    refs.current.forEach((g, i) => {
      if (!g) return;
      const want = activeId === layers[i].id ? 0.18 : 0;
      lifts.current[i] = THREE.MathUtils.lerp(lifts.current[i], want, 1 - Math.exp(-Math.min(dt, 0.1) * 8));
      g.position.y = i * gap + lifts.current[i];
    });
    boundaries.current.forEach((m, k) => {
      if (!m) return;
      m.position.y = (bIdxs[k] - 0.5) * gap;
      (m.material as THREE.MeshBasicMaterial).opacity = 0.05 + p.current * 0.22;
    });
    if (group.current && animate) group.current.rotation.y = Math.PI / 4 + Math.sin(clock.getElapsedTime() * 0.25) * 0.06;
  });
  return (
    <group ref={group} rotation={[0, Math.PI / 4, 0]} position={[0, -1.45, 0]}>
      {layers.map((l, i) => (
        <group
          key={l.id}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          position={[0, i * 0.16, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            onActiveChange?.(l.id);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            onActiveChange?.(null);
            document.body.style.cursor = "";
          }}
        >
          <RoundedBox args={[2.0, 0.12, 2.0]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color={l.owner === "arclin" ? IVORY : SAND} roughness={0.6} metalness={0.02} />
          </RoundedBox>
          {/* edge stripe */}
          <RoundedBox args={[2.05, 0.02, 2.05]} radius={0.01} position={[0, -0.06, 0]}>
            <meshStandardMaterial color={activeId === l.id ? "#6fd3b4" : l.owner === "arclin" ? PINE : PINE_LIGHT} roughness={0.5} />
          </RoundedBox>
          {/* module marks: low, soft tiles */}
          {[-0.6, 0, 0.6].map((x) => (
            <RoundedBox key={x} args={[0.36, 0.03, 0.36]} radius={0.01} position={[x, 0.075, -0.6 + (i % 3) * 0.6]}>
              <meshStandardMaterial color={l.owner === "arclin" ? "#cfd9d3" : "#c9c0a6"} roughness={0.7} />
            </RoundedBox>
          ))}
        </group>
      ))}
      {bIdxs.map((b, k) => (
        <mesh
          key={b}
          ref={(el) => {
            if (el) boundaries.current[k] = el;
          }}
          position={[0, (b - 0.5) * 0.16, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[2.3, 2.3]} />
          <meshBasicMaterial color={EMBER} transparent opacity={0.2} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Keeps the orthographic zoom proportional to the canvas so the exploded stack always fits. */
function FitZoom() {
  const { camera, size } = useThree();
  useEffect(() => {
    const c = camera as THREE.OrthographicCamera;
    // eslint-disable-next-line react-hooks/immutability -- three.js camera is mutated by design
    c.zoom = Math.min(size.width, size.height) / 5.0;
    c.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

export function CareOSStack({ layers, exploded, animate = true, activeId, onActiveChange, className }: { layers: StackLayer[]; exploded: boolean; animate?: boolean; activeId?: string | null; onActiveChange?: (id: string | null) => void; className?: string }) {
  return (
    <Canvas className={className} dpr={[1, 1.75]} flat frameloop={animate ? "always" : "demand"} orthographic camera={{ position: [5, 4.2, 5], zoom: 100, near: 0.1, far: 50 }} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} onCreated={({ camera }) => camera.lookAt(0, 0.2, 0)}>
      <hemisphereLight args={["#fbf8ef", "#c9c3ae", 0.9]} />
      <directionalLight position={[3, 6, 2]} intensity={1.3} color="#fff8ea" />
      <directionalLight position={[-4, 3, -3]} intensity={0.45} color="#dfeee8" />
      <FitZoom />
      <Slabs layers={layers} exploded={exploded} animate={animate} activeId={activeId} onActiveChange={onActiveChange} />
    </Canvas>
  );
}
