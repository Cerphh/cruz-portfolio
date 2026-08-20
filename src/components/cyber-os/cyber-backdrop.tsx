"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CyberBackdrop() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060816, 0.08);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 2, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Dynamic grid floor
    const gridHelper = new THREE.GridHelper(30, 30, 0x22d3ee, 0x0f172a);
    gridHelper.position.y = -2;
    // Cast to material to safely modify material properties
    if (!Array.isArray(gridHelper.material)) {
      gridHelper.material.opacity = 0.45;
      gridHelper.material.transparent = true;
    }
    scene.add(gridHelper);

    // 3D holographic wireframe core
    const coreGeometry = new THREE.IcosahedronGeometry(2.5, 2);
    const wireframe = new THREE.WireframeGeometry(coreGeometry);
    const coreMaterial = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.35,
    });
    const core = new THREE.LineSegments(wireframe, coreMaterial);
    core.position.set(0, 0.5, 0);
    scene.add(core);

    // Outer shell core
    const shellGeometry = new THREE.IcosahedronGeometry(2.65, 1);
    const shellWire = new THREE.WireframeGeometry(shellGeometry);
    const shellMaterial = new THREE.LineBasicMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.15,
    });
    const shell = new THREE.LineSegments(shellWire, shellMaterial);
    shell.position.set(0, 0.5, 0);
    scene.add(shell);

    // Floating matrix particles
    const particlesCount = 300;
    const positions = new Float32Array(particlesCount * 3);
    const velocities: number[] = [];

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      velocities.push((Math.random() - 0.5) * 0.02);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.0);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x22d3ee, 5, 20);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resize);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate cyber core
      core.rotation.x = elapsedTime * 0.1;
      core.rotation.y = elapsedTime * 0.15;
      shell.rotation.x = -elapsedTime * 0.05;
      shell.rotation.y = -elapsedTime * 0.08;

      // Animate particles
      const positionsArray = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        positionsArray[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.003; // oscillate up/down
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.02;

      // Smooth camera follow mouse
      camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
      camera.position.y += ((mouseY * 2 + 1.5) - camera.position.y) * 0.05;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      wireframe.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellWire.dispose();
      shellMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
}
