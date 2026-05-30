'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//--# Configurações
const CONFIG = {
  lights: {
    ambientIntensity: 0.2,
    pointPosition: [10, 10, 10] as [number, number, number],
    pointIntensity: 1.5,
    pointColor: "#818cf8",
  },

  camera: {
    fov: 40,
    startZ: 15,          
    zoomInZ: 8,          
    scrollZ: -2,         
    zoomDuration: 4,     
    scrollMultiplier: 1.5, 
  },

  node: {
    geometryArgs: [2, 4] as [number, number],
    color: "#0a0a20",
    emissive: "#4f46e5",
    emissiveIntensity: 0.5,
    wireframe: true,
    roughness: 0.1,
    distortLoading: 1.2,
    speedLoading: 6.0,
    distortCalm: 0.4,
    speedCalm: 1.5,
    calmDuration: 4, 
    floatSpeed: 1.5,
    floatRotation: 0.2,
    floatIntensity: 2.0,
    baseRotSpeedY: 0.05,
    baseRotSpeedX: 0.03,
    mouseSensitivity: 20, 
    mouseLerp: 0.01,      
  },

  cylinders: {
    count: 16, 
    colors: ["#818cf8", "#4f46e5", "#22c55e", "#10b981", "#ffffff"],
    emissiveIntensity: 1.2,
    opacity: 0.6,
    wireframe: true, 
    sidesMin: 5,
    sidesMax: 10,
    radiusMin: 1,
    radiusMax: 2.1,
    heightMin: 3,
    heightMax: 6,
    spreadX: 32,
    spreadY: 32,
    spreadZ: 10,
    offsetZ: -40, 
    animScaleTarget: 1, 
    appearDuration: 1.2,
    disappearDuration: 0.6,
    staggerDelay: 0.03, 
    easeAppear: 'back.out(1.5)', 
    easeDisappear: 'power2.in',
    scrollStart: 'top 70%',
    scrollEnd: 'bottom 30%',
    groupFloatSpeed: 0.2,
    groupFloatHeight: 1.5,
    groupRotSpeed: 0.03,
    individualRotSpeedX: 0.002,
    individualRotSpeedY: 0.003,
  },

  endPortal: {
    count: 3000,
    colors: ["#1f1f1f", "#faf2ff", "#e2b3ff", "#ffffff", "#ffffff"],
    size: 0.12, // Tamanho dos blocos/partículas
    spread: 55, // Espalhamento do vazio
    opacityTarget: 0.9, 
    rotationSpeedY: 0.015, 
    rotationSpeedX: 0.01,
    rotationSpeedZ: 0.005,
  }
};
//--# ==========================================


function RNMCNode({ loadingDone }: { loadingDone: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);

  useEffect(() => {
    if (loadingDone && materialRef.current) {
      gsap.to(materialRef.current, {
        distort: CONFIG.node.distortCalm,
        speed: CONFIG.node.speedCalm,
        duration: CONFIG.node.calmDuration,
        ease: 'power2.out'
      });
    }
  }, [loadingDone]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.y = t * CONFIG.node.baseRotSpeedY;
      meshRef.current.rotation.x = t * CONFIG.node.baseRotSpeedX;
    }

    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / CONFIG.node.mouseSensitivity;
      const targetY = (state.pointer.y * Math.PI) / CONFIG.node.mouseSensitivity;

      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * CONFIG.node.mouseLerp;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * CONFIG.node.mouseLerp;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={CONFIG.node.floatSpeed} rotationIntensity={CONFIG.node.floatRotation} floatIntensity={CONFIG.node.floatIntensity}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={CONFIG.node.geometryArgs} />
          <MeshDistortMaterial
            ref={materialRef}
            color={CONFIG.node.color}
            emissive={CONFIG.node.emissive}
            emissiveIntensity={CONFIG.node.emissiveIntensity}
            wireframe={CONFIG.node.wireframe}
            roughness={CONFIG.node.roughness}
            distort={CONFIG.node.distortLoading} 
            speed={CONFIG.node.speedLoading}   
          />
        </mesh>
      </Float>
    </group>
  );
}

function CameraRig({ loadingDone }: { loadingDone: boolean }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!loadingDone || !camera) return;

    gsap.to(camera.position, {
      z: CONFIG.camera.zoomInZ,
      duration: CONFIG.camera.zoomDuration,
      ease: 'power3.out',
      onComplete: () => {
        gsap.to(camera.position, {
          z: CONFIG.camera.scrollZ,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: () => `+=${window.innerHeight * CONFIG.camera.scrollMultiplier}`, 
            scrub: 1.5,
          }
        });
      }
    });
  }, [loadingDone]);

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, CONFIG.camera.startZ]} fov={CONFIG.camera.fov} />;
}

function RotatingCylinders({ loadingDone }: { loadingDone: boolean }) {
  const meshesRef = useRef<(THREE.Mesh | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const cfg = CONFIG.cylinders; 
  
  const cylinders = useMemo(() => {
    return Array.from({ length: cfg.count }).map(() => {
      const x = (Math.random() - 0.5) * cfg.spreadX; 
      const y = (Math.random() - 0.5) * cfg.spreadY; 
      const z = (Math.random() - 0.5) * cfg.spreadZ + cfg.offsetZ; 
      
      const radius = Math.random() * (cfg.radiusMax - cfg.radiusMin) + cfg.radiusMin;
      const height = Math.random() * (cfg.heightMax - cfg.heightMin) + cfg.heightMin;
      const sides = Math.floor(Math.random() * (cfg.sidesMax - cfg.sidesMin + 1)) + cfg.sidesMin;
      
      return {
        pos: [x, y, z],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        color: cfg.colors[Math.floor(Math.random() * cfg.colors.length)],
        args: [radius, radius, height, sides]
      };
    });
  }, [cfg]); 

  useEffect(() => {
    if (!loadingDone || meshesRef.current.length === 0) return;
    
    const animateIn = () => {
      meshesRef.current.forEach((mesh, i) => {
        if(mesh) gsap.to(mesh.scale, { 
          x: cfg.animScaleTarget, y: cfg.animScaleTarget, z: cfg.animScaleTarget, 
          duration: cfg.appearDuration, ease: cfg.easeAppear, delay: i * cfg.staggerDelay,
          overwrite: true 
        });
      });
    };

    const animateOut = () => {
      meshesRef.current.forEach((mesh, i) => {
        if(mesh) gsap.to(mesh.scale, { 
          x: 0, y: 0, z: 0, 
          duration: cfg.disappearDuration, ease: cfg.easeDisappear, delay: i * (cfg.staggerDelay / 2),
          overwrite: true 
        });
      });
    };

    ScrollTrigger.create({
      trigger: '#section-4',
      start: cfg.scrollStart,    
      end: cfg.scrollEnd,   
      onEnter: animateIn,
      onLeave: animateOut,
      onEnterBack: animateIn,
      onLeaveBack: animateOut,
    });
  }, [loadingDone, cfg]);

  useFrame((state) => {
    if (groupRef.current) {
       groupRef.current.position.y = Math.sin(state.clock.elapsedTime * cfg.groupFloatSpeed) * cfg.groupFloatHeight;
       groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * cfg.groupRotSpeed) * 0.3;
    }
    
    meshesRef.current.forEach((mesh, i) => {
      if(mesh) {
        mesh.rotation.x += cfg.individualRotSpeedX * (i % 2 === 0 ? 1 : -1) * (i % 4 + 1);
        mesh.rotation.y += cfg.individualRotSpeedY * (i % 3 === 0 ? 1 : -1) * (i % 3 + 1);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {cylinders.map((cyl, i) => (
        <mesh 
          key={i} 
          ref={(el) => { meshesRef.current[i] = el; }}
          position={new THREE.Vector3(...cyl.pos)} 
          rotation={new THREE.Euler(...cyl.rot)} 
          scale={[0, 0, 0]} 
        >
          <cylinderGeometry args={cyl.args as any} />
          <meshStandardMaterial 
            color={cyl.color} 
            wireframe={cfg.wireframe} 
            emissive={cyl.color} 
            emissiveIntensity={cfg.emissiveIntensity}
            transparent={true}
            opacity={cfg.opacity} 
          />
        </mesh>
      ))}
    </group>
  );
}

function EndPortalParticles({ loadingDone }: { loadingDone: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const cfg = CONFIG.endPortal;

  const [geometry, material] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(cfg.count * 3);
    const colors = new Float32Array(cfg.count * 3);
    const colorPalette = cfg.colors.map(c => new THREE.Color(c));

    for (let i = 0; i < cfg.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * cfg.spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * cfg.spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * cfg.spread - 5;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: cfg.size,
      vertexColors: true,
      transparent: true,
      opacity: 0, 
      blending: THREE.AdditiveBlending, 
      depthWrite: false, 
    });

    return [geo, mat];
  }, [cfg]);

  useEffect(() => {
    if (!loadingDone || !material) return;

    ScrollTrigger.create({
      trigger: '#section-6',
      start: 'top 80%',
      end: 'bottom bottom',
      onEnter: () => gsap.to(material, { opacity: cfg.opacityTarget, duration: 2.5, ease: 'power2.out', overwrite: true }),
      onLeaveBack: () => gsap.to(material, { opacity: 0, duration: 1, ease: 'power2.in', overwrite: true }),
    });
  }, [loadingDone, material, cfg.opacityTarget]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * cfg.rotationSpeedY;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * cfg.rotationSpeedX;
      pointsRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.1) * cfg.rotationSpeedZ;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}


export default function Scene({ loadingDone }: { loadingDone: boolean }) {
  return (
    <Canvas shadows dpr={[1, 1.5]}>
      <ambientLight intensity={CONFIG.lights.ambientIntensity} />
      <pointLight position={CONFIG.lights.pointPosition} intensity={CONFIG.lights.pointIntensity} color={CONFIG.lights.pointColor} />
      <EndPortalParticles loadingDone={loadingDone} />
      <CameraRig loadingDone={loadingDone} />
      <RNMCNode loadingDone={loadingDone} />
      <RotatingCylinders loadingDone={loadingDone} />
    </Canvas>
  );
}