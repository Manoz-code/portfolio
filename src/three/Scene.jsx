import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* =========================================================
   CHARACTER
   ========================================================= */

function TestCharacter() {
  const group = useRef();
  const body = useRef();
  const head = useRef();

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;

    // Main breathing motion
    group.current.position.y =
      Math.sin(t * 1.15) * 0.07;

    // Subtle body rotation
    group.current.rotation.y =
      Math.sin(t * 0.55) * 0.22;

    group.current.rotation.x =
      Math.sin(t * 0.7) * 0.025;

    // Slight breathing expansion
    if (body.current) {
      body.current.scale.y =
        1 + Math.sin(t * 1.15) * 0.018;
    }

    // Head gently looks around
    if (head.current) {
      head.current.rotation.y =
        Math.sin(t * 0.45) * 0.12;

      head.current.rotation.x =
        Math.sin(t * 0.65) * 0.035;
    }
  });

  return (
    <group
      ref={group}
      position={[-1.25, 0, 0.35]}
      scale={0.9}
    >

      {/* BODY */}
      <mesh ref={body} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.7, 1.4, 8, 16]} />
        <meshStandardMaterial
          color="#263142"
          roughness={0.45}
          metalness={0.2}
        />
      </mesh>

      {/* HEAD */}
      <group ref={head} position={[0, 1.25, 0]}>

        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#c47b55"
            roughness={0.7}
          />
        </mesh>

        {/* HAIR */}
        <mesh position={[0, 0.3, -0.03]}>
          <sphereGeometry args={[0.56, 32, 20]} />
          <meshStandardMaterial
            color="#111111"
          />
        </mesh>

        {/* FACE LIGHT */}
        <mesh position={[0, -0.02, 0.51]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#61e7ff" />
        </mesh>

      </group>

      {/* LEFT ARM */}
      <mesh
        position={[-0.85, 0, 0]}
        rotation={[0, 0, -0.25]}
      >
        <capsuleGeometry args={[0.16, 0.9, 8, 12]} />
        <meshStandardMaterial color="#263142" />
      </mesh>

      {/* RIGHT ARM */}
      <mesh
        position={[0.85, 0, 0]}
        rotation={[0, 0, 0.25]}
      >
        <capsuleGeometry args={[0.16, 0.9, 8, 12]} />
        <meshStandardMaterial color="#263142" />
      </mesh>

      {/* CHEST LIGHT */}
      <mesh position={[0, 0.25, 0.7]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#61e7ff" />
      </mesh>

    </group>
  );
}

function CameraParallax() {
  const { camera, pointer } = useThree();

  const smooth = useRef({
    scroll: 0,
    x: 0,
    y: 1,
    z: 6,
  });

  useFrame(() => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const scroll = maxScroll > 0
      ? THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1)
      : 0;

    /*
      Strong cinematic movement.

      Scroll:
      - moves camera forward
      - moves camera sideways
      - raises camera
      - adds a small cinematic tilt

      Mouse:
      - adds independent parallax
    */

    const targetX =
      Math.sin(scroll * Math.PI * 2) * 1.5 +
      pointer.x * 0.65;

    const targetY =
      1 +
      scroll * 0.9 +
      pointer.y * 0.3;

    const targetZ =
      6 -
      scroll * 2.5;

    smooth.current.x = THREE.MathUtils.lerp(
      smooth.current.x,
      targetX,
      0.055
    );

    smooth.current.y = THREE.MathUtils.lerp(
      smooth.current.y,
      targetY,
      0.055
    );

    smooth.current.z = THREE.MathUtils.lerp(
      smooth.current.z,
      targetZ,
      0.055
    );

    camera.position.x = smooth.current.x;
    camera.position.y = smooth.current.y;
    camera.position.z = smooth.current.z;

    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z,
      -scroll * 0.045 + pointer.x * 0.018,
      0.04
    );

    camera.lookAt(
      Math.sin(scroll * Math.PI * 2) * 0.35,
      0.65 + scroll * 0.3,
      0
    );
  });

  return null;
}

function Particles() {
  const particles = useRef();
  const count = 180;

  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] =
      (Math.random() - 0.5) * 9;

    positions[i * 3 + 1] =
      Math.random() * 6 - 2;

    positions[i * 3 + 2] =
      (Math.random() - 0.5) * 6;
  }

  useFrame((state) => {
    if (!particles.current) return;

    particles.current.rotation.y =
      state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={particles}>

      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#61e7ff"
        size={0.025}
        transparent
        opacity={0.7}
        sizeAttenuation
      />

    </points>
  );
}


/* =========================================================
   WORKSTATION
   ========================================================= */

function Workstation() {
  const desk = useRef();
  const screen = useRef();
  const screenGlow = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (desk.current) {
      desk.current.rotation.y =
        Math.sin(t * 0.18) * 0.025;
    }

    if (screen.current) {
      screen.current.material.opacity =
        0.88 + Math.sin(t * 1.5) * 0.05;
    }

    if (screenGlow.current) {
      screenGlow.current.material.opacity =
        0.12 + Math.sin(t * 2) * 0.04;
    }
  });

  const codeLines = [
    { x: -0.9, y: 0.42, w: 0.45, c: "#9b7cff" },
    { x: -0.4, y: 0.42, w: 0.75, c: "#61e7ff" },
    { x: -0.9, y: 0.22, w: 0.7, c: "#61e7ff" },
    { x: -0.15, y: 0.22, w: 0.42, c: "#9b7cff" },
    { x: -0.9, y: 0.02, w: 0.55, c: "#61e7ff" },
    { x: -0.3, y: 0.02, w: 0.85, c: "#61e7ff" },
    { x: -0.9, y: -0.18, w: 0.32, c: "#9b7cff" },
    { x: -0.52, y: -0.18, w: 0.62, c: "#61e7ff" },
    { x: -0.9, y: -0.38, w: 0.82, c: "#61e7ff" },
  ];

  return (
    <group
      ref={desk}
      position={[0.85, -0.65, -0.65]}
    >

      {/* DESK */}
      <mesh>
        <boxGeometry args={[4.8, 0.18, 2.1]} />
        <meshStandardMaterial
          color="#111720"
          roughness={0.35}
          metalness={0.35}
        />
      </mesh>

      {/* DESK LEGS */}
      {[
        [-2.05, -1.05, -0.75],
        [2.05, -1.05, -0.75],
        [-2.05, -1.05, 0.75],
        [2.05, -1.05, 0.75],
      ].map((position, i) => (
        <mesh key={i} position={position}>
          <boxGeometry args={[0.16, 2.1, 0.16]} />
          <meshStandardMaterial color="#080b10" />
        </mesh>
      ))}

      {/* MONITOR */}
      <group position={[0, 1.35, -0.45]}>

        <mesh>
          <boxGeometry args={[2.8, 1.65, 0.18]} />
          <meshStandardMaterial
            color="#090d13"
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>

        {/* SCREEN */}
        <mesh
          ref={screen}
          position={[0, 0, 0.105]}
        >
          <planeGeometry args={[2.48, 1.33]} />
          <meshBasicMaterial
            color="#07151b"
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* CODE */}
        {codeLines.map((line, i) => (
          <mesh
            key={i}
            position={[
              line.x + line.w / 2,
              line.y,
              0.12,
            ]}
          >
            <planeGeometry
              args={[line.w, 0.045]}
            />
            <meshBasicMaterial
              color={line.c}
            />
          </mesh>
        ))}

        {/* SYSTEM INDICATOR */}
        <mesh
          position={[0.82, 0.49, 0.13]}
        >
          <sphereGeometry
            args={[0.035, 12, 12]}
          />
          <meshBasicMaterial
            color="#5cffae"
          />
        </mesh>

        {/* SCREEN GLOW */}
        <mesh
          ref={screenGlow}
          position={[0, 0, 0.11]}
        >
          <planeGeometry
            args={[2.48, 1.33]}
          />
          <meshBasicMaterial
            color="#61e7ff"
            transparent
            opacity={0.12}
          />
        </mesh>

        {/* MONITOR STAND */}
        <mesh position={[0, -1.02, 0]}>
          <boxGeometry
            args={[0.18, 0.8, 0.18]}
          />
          <meshStandardMaterial
            color="#151c27"
          />
        </mesh>

        <mesh position={[0, -1.42, 0]}>
          <boxGeometry
            args={[1.0, 0.08, 0.5]}
          />
          <meshStandardMaterial
            color="#151c27"
          />
        </mesh>

      </group>

      {/* KEYBOARD */}
      <mesh position={[0, 0.18, 0.55]}>
        <boxGeometry args={[2.0, 0.08, 0.7]} />
        <meshStandardMaterial color="#090d13" />
      </mesh>

      <mesh
        position={[0, 0.225, 0.55]}
        ref={screenGlow}
      >
        <boxGeometry args={[1.7, 0.012, 0.45]} />
        <meshBasicMaterial
          color="#61e7ff"
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* MOUSE */}
      <mesh position={[1.35, 0.2, 0.5]}>
        <sphereGeometry args={[0.18, 16, 10]} />
        <meshStandardMaterial color="#151c27" />
      </mesh>

      <pointLight
        position={[0, 1.1, 0.2]}
        intensity={7}
        distance={5}
        color="#61e7ff"
      />

    </group>
  );
}

function Hologram() {
  const ring = useRef();
  const core = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    if (!ring.current) return;

    const t = state.clock.elapsedTime;

    // Continuous hologram rotation
    ring.current.rotation.z = t * 0.5;
    ring.current.rotation.x =
      Math.sin(t * 0.4) * 0.15;

    // Mouse interaction
    ring.current.position.x =
      2.9 + pointer.x * 0.18;

    ring.current.position.y =
      0.5 + pointer.y * 0.12;

    // Floating motion
    ring.current.position.y +=
      Math.sin(t * 1.1) * 0.06;

    // Pulsing center
    if (core.current) {
      const scale =
        1 + Math.sin(t * 2.2) * 0.12;

      core.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={ring} position={[2.9, 0.65, -0.4]}>

      {/* Outer holographic ring */}
      <mesh>
        <torusGeometry
          args={[0.55, 0.018, 8, 64]}
        />
        <meshBasicMaterial
          color="#61e7ff"
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Inner ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry
          args={[0.35, 0.012, 8, 48]}
        />
        <meshBasicMaterial
          color="#9b7cff"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Holographic core */}
      <mesh ref={core}>
        <sphereGeometry
          args={[0.07, 16, 16]}
        />
        <meshBasicMaterial
          color="#61e7ff"
        />
      </mesh>

      <pointLight
        intensity={5}
        distance={3}
        color="#61e7ff"
      />

    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[4, 5, 6]}
        intensity={3}
      />

      <pointLight
        position={[-4, 2, 4]}
        intensity={20}
        color="#61e7ff"
      />

      <pointLight
        position={[4, 2, 2]}
        intensity={15}
        color="#9b7cff"
      />

      <CameraParallax />

      <TestCharacter />

      <Workstation />

      <Hologram />

      <Particles />

      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        position={[0, -1.15, 0]}
      >
        <planeGeometry args={[14, 14]} />

        <meshStandardMaterial
          color="#080b10"
          roughness={0.8}
        />
      </mesh>
    </>
  );
}

/* =========================================================
   CANVAS
   ========================================================= */

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 1, 6],
        fov: 45,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <color
        attach="background"
        args={["#07090c"]}
      />

      <SceneContent />
    </Canvas>
  );
}