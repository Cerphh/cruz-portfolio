"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackdrop() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const knotGeometry = new THREE.TorusKnotGeometry(1.35, 0.38, 180, 24);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0xa5b4fc,
      metalness: 0.72,
      roughness: 0.18,
      emissive: 0x172554,
      emissiveIntensity: 0.9,
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    group.add(knot);

    const innerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x67e8f9,
        metalness: 0.35,
        roughness: 0.08,
        emissive: 0x0f172a,
        emissiveIntensity: 0.5,
      }),
    );
    innerSphere.position.set(0.95, -0.65, 0.8);
    group.add(innerSphere);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 220;
    const positions = new Float32Array(particlesCount * 3);

    for (let index = 0; index < particlesCount; index += 1) {
      const positionIndex = index * 3;
      positions[positionIndex] = (Math.random() - 0.5) * 14;
      positions[positionIndex + 1] = (Math.random() - 0.5) * 10;
      positions[positionIndex + 2] = (Math.random() - 0.5) * 14;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0xc4b5fd,
        size: 0.04,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
      }),
    );
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0xbdd7ff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const accentLight = new THREE.PointLight(0x22d3ee, 25, 24);
    accentLight.position.set(-3, -2, 4);
    scene.add(accentLight);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;

      pointer.x = normalizedX;
      pointer.y = normalizedY;
    };

    window.addEventListener("pointermove", onPointerMove);

    let frame = 0;
    let requestId = 0;

    const animate = () => {
      frame += 0.01;

      knot.rotation.x = frame * 0.35 + pointer.y * 0.4;
      knot.rotation.y = frame * 0.5 + pointer.x * 0.5;
      innerSphere.rotation.y = -frame * 0.3;
      innerSphere.rotation.x = frame * 0.18;

      group.position.x = pointer.x * 0.45;
      group.position.y = pointer.y * 0.28;
      group.rotation.z = pointer.x * 0.08;

      const particlePositions = particlesGeometry.attributes.position.array as Float32Array;

      for (let index = 0; index < particlePositions.length; index += 3) {
        particlePositions[index + 1] += Math.sin(frame * 0.8 + particlePositions[index]) * 0.002;
      }

      particlesGeometry.attributes.position.needsUpdate = true;
      particles.rotation.y = frame * 0.07;

      renderer.render(scene, camera);
      requestId = window.requestAnimationFrame(animate);
    };

    requestId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(requestId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      mount.removeChild(renderer.domElement);
      knotGeometry.dispose();
      knotMaterial.dispose();
      innerSphere.geometry.dispose();
      innerSphere.material.dispose();
      particlesGeometry.dispose();
      (particles.material as THREE.PointsMaterial).dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-95"
      style={{
        maskImage:
          "radial-gradient(circle at 50% 34%, black 0%, black 38%, transparent 74%)",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 34%, black 0%, black 38%, transparent 74%)",
      }}
    />
  );
}