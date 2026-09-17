"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Line, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Procedural 3D hero: a Mimamori robot steadying a mannequin at the moment of standing.
 * No external assets. Colours mirror the design tokens (paper / ink / pine / signal).
 * `animate=false` renders one static frame (reduced-motion).
 */

const C = {
  ivory: "#f4f1e8",
  ivoryDark: "#e2ddcd",
  ink: "#171b1a",
  pine: "#1e4d46",
  pineLight: "#2e6b61",
  signal: "#6fd3b4",
  mannequin: "#cbc4ad",
  mannequinDark: "#b7af97",
  rail: "#3d423f",
};

const matte = (color: string, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) => (
  <meshStandardMaterial color={color} roughness={0.55} metalness={0.02} {...extra} />
);

function Robot({ animate }: { animate: boolean }) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const pulses = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock, pointer }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    if (root.current) root.current.position.y = Math.sin(t * 1.4) * 0.012;
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, 0.35 + pointer.x * 0.12, 0.05);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, 0.06 - pointer.y * 0.06, 0.05);
    }
    pulses.current.forEach((m, i) => {
      const p = ((t * 0.6 + i * 0.33) % 1);
      m.scale.setScalar(0.6 + p * 1.1);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.55;
    });
  });
  return (
    <group ref={root}>
      {/* base + wheels */}
      <RoundedBox args={[0.92, 0.14, 0.62]} radius={0.06} position={[0, 0.13, 0]}>
        {matte(C.ink, { roughness: 0.7 })}
      </RoundedBox>
      {[-0.31, 0.31].map((x) =>
        [-0.22, 0.22].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.09, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.06, 32]} />
            {matte(C.rail, { roughness: 0.9 })}
          </mesh>
        )),
      )}
      {/* body */}
      <mesh position={[0, 0.88, 0]}>
        <capsuleGeometry args={[0.33, 0.62, 12, 32]} />
        {matte(C.ivory)}
      </mesh>
      {/* front panel line */}
      <mesh position={[0, 0.62, 0.325]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.28, 0.012, 0.01]} />
        {matte(C.ivoryDark)}
      </mesh>
      {/* status light */}
      <mesh position={[0.18, 1.12, 0.31]}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshStandardMaterial color={C.signal} emissive={C.signal} emissiveIntensity={1.2} />
      </mesh>
      {/* neck */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.14, 24]} />
        {matte(C.rail)}
      </mesh>
      {/* head */}
      <group ref={head} position={[0, 1.86, 0]}>
        <RoundedBox args={[0.6, 0.48, 0.46]} radius={0.14} smoothness={6}>
          {matte(C.ivory)}
        </RoundedBox>
        {/* screen */}
        <RoundedBox args={[0.46, 0.32, 0.02]} radius={0.07} position={[0, 0, 0.245]}>
          {matte(C.ink, { roughness: 0.3 })}
        </RoundedBox>
        {[-0.11, 0.11].map((x) => (
          <mesh key={x} position={[x, 0.01, 0.262]}>
            <sphereGeometry args={[0.038, 20, 20]} />
            <meshStandardMaterial color={C.signal} emissive={C.signal} emissiveIntensity={0.9} />
          </mesh>
        ))}
        {/* antenna */}
        <mesh position={[0, 0.33, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.18, 12]} />
          {matte(C.rail)}
        </mesh>
        <mesh position={[0, 0.44, 0]}>
          <sphereGeometry args={[0.032, 16, 16]} />
          {matte(C.ink)}
        </mesh>
        {/* sensor pulses toward the person */}
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) pulses.current[i] = el;
            }}
            position={[-0.38, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <ringGeometry args={[0.16, 0.175, 48, 1, Math.PI * 0.75, Math.PI * 0.5]} />
            <meshBasicMaterial color={C.signal} transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
      {/* supporting arm: shoulder -> forearm -> hand at the person's forearm */}
      <group position={[-0.3, 1.02, 0.02]} rotation={[0, 0, 0.12]}>
        <mesh position={[-0.27, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.05, 0.5, 8, 20]} />
          {matte(C.ivory)}
        </mesh>
        <mesh position={[-0.58, 0, 0]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          {matte(C.pineLight, { roughness: 0.45 })}
        </mesh>
      </group>
    </group>
  );
}

/** Wooden-mannequin person mid-rise, one hand on the rail, forearm steadied by the robot. */
function Person() {
  const m = (c = C.mannequin) => matte(c, { roughness: 0.65 });
  return (
    <group position={[-1.3, 0, 0]} rotation={[0, 0.25, 0]}>
      {/* legs, slightly bent (rising) */}
      <mesh position={[-0.09, 0.42, 0.02]} rotation={[0.18, 0, 0.05]}>
        <capsuleGeometry args={[0.075, 0.6, 8, 20]} />
        {m(C.mannequinDark)}
      </mesh>
      <mesh position={[0.11, 0.42, -0.04]} rotation={[-0.12, 0, -0.04]}>
        <capsuleGeometry args={[0.075, 0.6, 8, 20]} />
        {m(C.mannequinDark)}
      </mesh>
      {/* torso leaning forward toward the robot */}
      <group position={[0, 1.02, 0]} rotation={[0, 0, -0.32]}>
        <mesh>
          <capsuleGeometry args={[0.19, 0.62, 12, 28]} />
          {m()}
        </mesh>
        {/* head */}
        <mesh position={[0, 0.62, 0]}>
          <sphereGeometry args={[0.17, 28, 28]} />
          {m()}
        </mesh>
        {/* arm toward the robot (steadied) */}
        <group position={[0.16, 0.22, 0.05]} rotation={[0, 0, -1.25]}>
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.05, 0.5, 8, 20]} />
            {m()}
          </mesh>
        </group>
        {/* arm on the handrail */}
        <group position={[-0.16, 0.22, -0.05]} rotation={[0, 0, 0.95]}>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.05, 0.54, 8, 20]} />
            {m()}
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Handrail() {
  return (
    <group position={[-1.95, 0, -0.1]}>
      {[0, 0.5].map((z) => (
        <mesh key={z} position={[0, 0.5, z - 0.25]}>
          <cylinderGeometry args={[0.02, 0.02, 1.0, 16]} />
          {matte(C.rail, { roughness: 0.4, metalness: 0.3 })}
        </mesh>
      ))}
      <mesh position={[0, 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.56, 16]} />
        {matte(C.rail, { roughness: 0.4, metalness: 0.3 })}
      </mesh>
    </group>
  );
}

function FloorPath() {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.2, 0.012, 2.2),
      new THREE.Vector3(1.4, 0.012, 1.9),
      new THREE.Vector3(0.9, 0.012, 1.2),
      new THREE.Vector3(0.45, 0.012, 0.55),
    ]);
    return curve.getPoints(60);
  }, []);
  return <Line points={points} color={C.pine} lineWidth={1.5} dashed dashSize={0.12} gapSize={0.09} transparent opacity={0.6} />;
}

function Rig({ animate }: { animate: boolean }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(-0.4, 0.9, 0), []);
  useFrame(({ pointer }) => {
    if (!animate) return;
    // eslint-disable-next-line react-hooks/immutability -- three.js camera is mutated per frame by design
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.25 + pointer.x * 0.25, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.35 - pointer.y * 0.12, 0.04);
    camera.lookAt(target);
  });
  return null;
}

export function HeroScene({ animate = true, className }: { animate?: boolean; className?: string }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.75]}
      flat
      frameloop={animate ? "always" : "demand"}
      camera={{ position: [0.25, 1.35, 5.4], fov: 28, near: 0.1, far: 30 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={({ camera }) => camera.lookAt(-0.4, 0.9, 0)}
    >
      <hemisphereLight args={["#fbf8ef", "#c9c3ae", 0.9]} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} color="#fff8ea" />
      <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#dfeee8" />
      <Rig animate={animate} />
      <group position={[0.35, 0, 0]}>
        <Robot animate={animate} />
        <Person />
        <Handrail />
        <FloorPath />
        <ContactShadows position={[0, 0.001, 0]} opacity={0.38} scale={7} blur={2.6} far={2.5} color="#2a2f2c" frames={animate ? Infinity : 1} />
      </group>
    </Canvas>
  );
}
