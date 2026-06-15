import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Book3DProps {
  className?: string;
  autoRotateSpeed?: number;
}

export default function Book3D({ className = '', autoRotateSpeed = 0.01 }: Book3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Drag rotation state
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.1, y: -0.6 });
  const currentRotation = useRef({ x: 0.1, y: -0.6 });

  // Refs for high performance loop reads
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);

  // Synchronize state changes to refs for the animation loop
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // LOCAL SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.3));
    mountRef.current.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffd700, 3, 15, Math.PI / 4, 0.5, 1); // golden spotlight
    spotLight.position.set(-3, 4, 3);
    scene.add(spotLight);

    // BOOK DESIGN & GROUPS
    const bookGroup = new THREE.Group();
    scene.add(bookGroup);

    // Cover material (Royal Mystic Purple/Indigo leather)
    const coverMaterial = new THREE.MeshStandardMaterial({
      color: 0x221144, // very dark purple
      roughness: 0.3,
      metalness: 0.2,
    });

    // Gold material for trims and symbols
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // gold
      roughness: 0.2,
      metalness: 0.9,
    });

    // Page material (Off-white old paper sheets)
    const pageMaterial = new THREE.MeshStandardMaterial({
      color: 0xfdfbf7,
      roughness: 0.8,
      metalness: 0.05,
    });

    // Page edges material (Gold-edge finished books)
    const pageEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.3,
      metalness: 0.8,
    });

    // Construct Book Covers
    const coverThickness = 0.08;
    const coverWidth = 2.0;
    const coverHeight = 2.8;

    // Back Cover Mesh
    const backCoverGeo = new THREE.BoxGeometry(coverWidth, coverHeight, coverThickness);
    const backCover = new THREE.Mesh(backCoverGeo, coverMaterial);
    backCover.position.z = -0.16;
    bookGroup.add(backCover);

    // Front Cover Mesh
    const frontCoverGeo = new THREE.BoxGeometry(coverWidth, coverHeight, coverThickness);
    const frontCover = new THREE.Mesh(frontCoverGeo, coverMaterial);
    frontCover.position.z = 0.16;
    bookGroup.add(frontCover);

    // Spine/Bind Mesh
    const spineGeo = new THREE.BoxGeometry(coverThickness * 1.5, coverHeight, 0.36);
    const spine = new THREE.Mesh(spineGeo, coverMaterial);
    spine.position.x = -coverWidth / 2;
    bookGroup.add(spine);

    // Gold spine accents
    const spineTrimGeo = new THREE.BoxGeometry(0.02, coverHeight + 0.04, 0.38);
    const spineTrim = new THREE.Mesh(spineTrimGeo, goldMaterial);
    spineTrim.position.copy(spine.position);
    bookGroup.add(spineTrim);

    // Book Pages Block (nested inside front/back cover)
    const pagesGeo = new THREE.BoxGeometry(coverWidth - 0.08, coverHeight - 0.12, 0.25);
    // Multimaterial for page block to have white on the facing split and golden edges on the rims
    const pageMaterials = [
      pageEdgeMaterial, // right face (edges)
      coverMaterial,    // left face (no-render/hidden inside spine)
      pageEdgeMaterial, // top face
      pageEdgeMaterial, // bottom face
      pageMaterial,     // front face
      pageMaterial,     // back face
    ];
    // Remove individual mesh and configure box with page material index
    const pages = new THREE.Mesh(pagesGeo, pageMaterials);
    pages.position.x = 0.02; // slide slightly right
    pages.position.z = 0;
    bookGroup.add(pages);

    // Mystic Gold symbol emblem on the front cover
    const emblemGeo = new THREE.TorusKnotGeometry(0.4, 0.1, 48, 8);
    const emblem = new THREE.Mesh(emblemGeo, goldMaterial);
    emblem.position.set(0.1, 0, 0.21); // sits on front cover
    emblem.scale.set(1, 1, 0.2); // flat against cover
    bookGroup.add(emblem);

    const goldStarGeo = new THREE.OctahedronGeometry(0.2, 0);
    const goldStarTop = new THREE.Mesh(goldStarGeo, goldMaterial);
    goldStarTop.position.set(0.1, 0.8, 0.21);
    bookGroup.add(goldStarTop);

    const goldStarBot = new THREE.Mesh(goldStarGeo, goldMaterial);
    goldStarBot.position.set(0.1, -0.8, 0.21);
    bookGroup.add(goldStarBot);

    // Floating Particles around the book (blessings vibe)
    const particleCount = 40;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const pMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.07,
      transparent: true,
      opacity: 0.6,
    });
    const floatingGlow = new THREE.Points(particlesGeo, pMat);
    scene.add(floatingGlow);

    // Interaction handlers
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      previousMousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.current.x,
        y: e.clientY - previousMousePosition.current.y
      };

      // Update target rotation
      targetRotation.current.y += deltaMove.x * 0.007;
      targetRotation.current.x += deltaMove.y * 0.007;

      // Constrain vertical rotation to prevent flipping upside down
      targetRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.current.x));

      previousMousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    // Attach local element listeners
    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      previousMousePosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length === 0) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.current.x,
        y: e.touches[0].clientY - previousMousePosition.current.y
      };

      targetRotation.current.y += deltaMove.x * 0.008;
      targetRotation.current.x += deltaMove.y * 0.008;
      targetRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.current.x));

      previousMousePosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Setup IntersectionObserver to suspend execution when offscreen
    let isIntersecting = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    // Animation Tick
    let time = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Performant bypass if hidden/offsite
      if (!isIntersecting || document.hidden) return;

      time += 0.01;

      // Gentle floating up and down
      const hoverMultiplier = isHoveredRef.current ? 1.4 : 1.0;
      bookGroup.position.y = Math.sin(time * 2) * 0.15 * hoverMultiplier;
      bookGroup.position.x = Math.cos(time * 0.8) * 0.05;

      // Floating dust particles orbit
      floatingGlow.rotation.y = time * 0.12;
      floatingGlow.rotation.x = time * 0.05;
      
      const positionsArr = floatingGlow.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positionsArr[i * 3 + 1] += Math.sin(time + positionsArr[i * 3]) * 0.003; // gentle pulse
      }
      floatingGlow.geometry.attributes.position.needsUpdate = true;

      // Auto-rotation when not dragging
      if (!isDraggingRef.current) {
        targetRotation.current.y += autoRotateSpeed * (isHoveredRef.current ? 1.8 : 1.0);
      }

      // Smooth interpolation (lerp) toward target rotations
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.1;

      bookGroup.rotation.x = currentRotation.current.x;
      bookGroup.rotation.y = currentRotation.current.y;
      bookGroup.rotation.z = Math.sin(time * 0.6) * 0.03; // very slight elegant banking

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      if (mountRef.current && domEl) {
        mountRef.current.removeChild(domEl);
      }

      // Dispose
      scene.clear();
      coverMaterial.dispose();
      goldMaterial.dispose();
      pageMaterial.dispose();
      pageEdgeMaterial.dispose();
      backCoverGeo.dispose();
      frontCoverGeo.dispose();
      spineGeo.dispose();
      spineTrimGeo.dispose();
      pagesGeo.dispose();
      emblemGeo.dispose();
      goldStarGeo.dispose();
      particlesGeo.dispose();
      pMat.dispose();
    };
  }, [autoRotateSpeed]);

  return (
    <div
      id="book-3d-wrapper"
      className={`relative w-full h-[320px] sm:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
    >
      {/* 3D Render DOM Mount */}
      <div id="book-3d-canvas" ref={mountRef} className="w-full h-full" />

      {/* Aura background glow behind the canvas using Tailwind */}
      <div 
        id="book-aura-glow"
        className="absolute w-52 h-52 -z-10 rounded-full bg-yellow-500/10 blur-[100px] transition-all duration-700 select-none pointer-events-none"
        style={{
          transform: isHovered ? 'scale(1.4)' : 'scale(1.0)',
          border: isHovered ? '2px solid rgba(234, 179, 8, 0.05)' : 'none'
        }}
      />
    </div>
  );
}
