import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  activeSection: string;  // 'hero' | 'problema' | 'transformacao' | 'aprendizado' | 'bonus' | 'depoimentos' | 'oferta' | 'cta'
}

export default function ThreeCanvas({ activeSection }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // References to meshes for dynamic updates
  const particlesRef = useRef<THREE.Points | null>(null);
  const sacredSymbolsRef = useRef<THREE.Group | null>(null);
  const moonMeshRef = useRef<THREE.Mesh | null>(null);
  const moonGlowRef = useRef<THREE.Mesh | null>(null);

  // Target values for particle state interpolation
  const currentStates = useRef({
    colorLerp: 0, // 0 = purple, 0.3 = dark, 0.7 = gold, 1 = portal white-gold
    vortexSpeed: 0,
    noiseChaos: 0.1,
    particleSpeed: 1,
    cameraZ: 22,
    cameraY: 0,
    cameraRotY: 0,
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update target states based on active section
  useEffect(() => {
    const targets = currentStates.current;
    
    switch (activeSection) {
      case 'hero':
        targets.colorLerp = 0.0; // Purple/indigo
        targets.vortexSpeed = 0.1;
        targets.noiseChaos = 0.15;
        targets.particleSpeed = 1.0;
        targets.cameraZ = 22;
        targets.cameraY = 0;
        targets.cameraRotY = 0;
        break;
      case 'problema':
        targets.colorLerp = 0.35; // Heavy grey/charcoal dark
        targets.vortexSpeed = 0.05;
        targets.noiseChaos = 0.6; // Turbulent chaotic motion for heavy energy
        targets.particleSpeed = 0.8;
        targets.cameraZ = 25; // Zoom out slightly
        targets.cameraY = -1;
        targets.cameraRotY = -0.1;
        break;
      case 'transformacao':
        targets.colorLerp = 0.65; // Transmuting purple to bright Gold
        targets.vortexSpeed = 0.3;
        targets.noiseChaos = 0.2;
        targets.particleSpeed = 1.6; // High energy awakening
        targets.cameraZ = 20; // Zoom in
        targets.cameraY = 1;
        targets.cameraRotY = 0.1;
        break;
      case 'aprendizado':
        targets.colorLerp = 0.75; // Golden dust
        targets.vortexSpeed = 0.25;
        targets.noiseChaos = 0.15;
        targets.particleSpeed = 1.2;
        targets.cameraZ = 23;
        targets.cameraY = 0;
        targets.cameraRotY = 0.2;
        break;
      case 'bonus':
        targets.colorLerp = 0.8; // Warm golden sparkles
        targets.vortexSpeed = 0.4;
        targets.noiseChaos = 0.25;
        targets.particleSpeed = 1.5;
        targets.cameraZ = 21;
        targets.cameraY = 0.5;
        targets.cameraRotY = -0.1;
        break;
      case 'depoimentos':
        targets.colorLerp = 0.5; // Calmed twilight state (mixture golden and violet)
        targets.vortexSpeed = 0.15;
        targets.noiseChaos = 0.1;
        targets.particleSpeed = 0.6; // Calming balanced state
        targets.cameraZ = 24;
        targets.cameraY = -0.5;
        targets.cameraRotY = 0;
        break;
      case 'oferta':
        targets.colorLerp = 1.0; // Dynamic Sun/Portal White-Gold
        targets.vortexSpeed = 1.8; // Dynamic spiral vortex inward draw
        targets.noiseChaos = 0.3;
        targets.particleSpeed = 2.5; // High velocity activation
        targets.cameraZ = 16; // Extreme proximity
        targets.cameraY = 0;
        targets.cameraRotY = 0.5;
        break;
      case 'cta':
        targets.colorLerp = 0.9; // Stable Golden Protection Glow
        targets.vortexSpeed = 0.4;
        targets.noiseChaos = 0.1;
        targets.particleSpeed = 0.9;
        targets.cameraZ = 20;
        targets.cameraY = 0;
        targets.cameraRotY = 0.1;
        break;
    }
  }, [activeSection]);

  // Three.js Scene Setup & Animation Loop
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 22;
    cameraRef.current = camera;

    // RENDERER
    // Optimize with powerPreference for dynamic high performance GPU selection
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: "high-performance" 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const cosmicLight = new THREE.DirectionalLight(0xa855f7, 2.5); // purple
    cosmicLight.position.set(-10, 10, 5);
    scene.add(cosmicLight);

    const solarLight = new THREE.DirectionalLight(0xeab308, 2.5); // gold
    solarLight.position.set(10, -5, 5);
    scene.add(solarLight);

    // BACKGROUND GLOW / MOON
    // We construct a glowing moon representing the celestial protective anchor
    const moonGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({
      color: 0x221144,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(0, 3, -15);
    scene.add(moon);
    moonMeshRef.current = moon;

    // Moon Glow outer shell
    const glowGeo = new THREE.SphereGeometry(4.2, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Violet
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const glowMoon = new THREE.Mesh(glowGeo, glowMat);
    glowMoon.position.copy(moon.position);
    scene.add(glowMoon);
    moonGlowRef.current = glowMoon;

    // PARTICLES CREATION
    // Performance Optimization: Adapt particle counts to smaller viewports to protect mobile CPUs/GPUs
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 250 : 900;
    const spiralCount = isMobile ? 150 : 550;
    
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3); // store for morph animations

    // Color swatches
    const colorPurple = new THREE.Color('#7822e6');
    const colorIndigo = new THREE.Color('#1e3a8a');
    const colorDark = new THREE.Color('#222225');
    const colorGold = new THREE.Color('#ffd700');
    const colorWhiteGold = new THREE.Color('#fff2a3');

    for (let i = 0; i < particleCount; i++) {
      // Create a nice distribution (part spherical, part spiral, part background dust)
      let x = 0, y = 0, z = 0;
      
      if (i < spiralCount) {
        // Spiral Vortex structure
        const angle = (i / spiralCount) * Math.PI * 18;
        const radius = (i / spiralCount) * 16 + 2;
        x = Math.cos(angle) * radius;
        y = (Math.random() - 0.5) * 6;
        z = Math.sin(angle) * radius;
      } else {
        // Background cosmic field
        x = (Math.random() - 0.5) * 45;
        y = (Math.random() - 0.5) * 35;
        z = (Math.random() - 0.5) * 20 - 5;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      // Base color purple-indigo
      const blendedColor = new THREE.Color().copy(colorPurple).lerp(colorIndigo, Math.random());
      colors[i * 3] = blendedColor.r;
      colors[i * 3 + 1] = blendedColor.g;
      colors[i * 3 + 2] = blendedColor.b;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    // Create a procedural round canvas circle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const particlesMat = new THREE.PointsMaterial({
      size: 0.28,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);
    particlesRef.current = particles;

    // COMPASS / SACRED SYMBOLS
    // Floating mystic polyhedra that represent energetic shielding symbols
    const sacredSymbols = new THREE.Group();
    const symbolGeoms = [
      new THREE.IcosahedronGeometry(1.0, 1), // Sacred geometry
      new THREE.OctahedronGeometry(1.2, 0),    // Air/Ethereal element
      new THREE.TorusGeometry(0.7, 0.2, 8, 24), // Circular shielding
      new THREE.TetrahedronGeometry(0.9, 0)   // Fire activation
    ];

    const symbolCount = 6;
    for (let j = 0; j < symbolCount; j++) {
      const geom = symbolGeoms[j % symbolGeoms.length];
      const mat = new THREE.MeshBasicMaterial({
        color: j % 2 === 0 ? 0xa855f7 : 0xffd700,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });

      const mesh = new THREE.Mesh(geom, mat);
      // Scatter in the outer rims
      mesh.position.set(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10 - 2
      );
      
      // Store some motion metrics in the UserData
      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.012,
        rotY: (Math.random() - 0.5) * 0.012,
        floatSpeed: 0.002 + Math.random() * 0.003,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
      };

      sacredSymbols.add(mesh);
    }
    scene.add(sacredSymbols);
    sacredSymbolsRef.current = sacredSymbols;

    // PRE-ALLOCATED COLOR BUFFERS FOR HIGH-PERFORMANCE FLUID ANIMATION LOOP
    const blendedColors = [
      new THREE.Color().copy(colorPurple).lerp(colorIndigo, 0),
      new THREE.Color().copy(colorPurple).lerp(colorIndigo, 1 / 3),
      new THREE.Color().copy(colorPurple).lerp(colorIndigo, 2 / 3)
    ];
    const tempParticleCol = new THREE.Color();
    const tempColA = new THREE.Color();
    const tempMoonColor = new THREE.Color();
    const tempGlowColor = new THREE.Color();
    const tempSymColor = new THREE.Color();
    const tempTargetCol = new THREE.Color('#3f3f46');

    // ANIMATION
    let time = 0;
    const lerpSpeed = 0.035; // smooth morph speed
    
    // Smooth interpolations
    let activeLerp = 0; // matching targets.colorLerp
    let activeVortex = 0;
    let activeChaos = 0.1;
    let activeSpeed = 1.0;
    let activeCameraZ = 22;
    let activeCameraY = 0;
    let activeCameraRotY = 0;

    const tick = () => {
      animationFrameId.current = requestAnimationFrame(tick);
      
      // Performant bypass if tab is in background
      if (document.hidden) return;

      time += 0.01;

      // 1. DYNAMIC HIGH-PERFORMANCE SCROLL CALCULATION (Bypasses parent React state updates completely!)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      
      // Interpolate states smoothly towards targets
      const t = currentStates.current;
      activeLerp += (t.colorLerp - activeLerp) * lerpSpeed;
      activeVortex += (t.vortexSpeed - activeVortex) * lerpSpeed;
      activeChaos += (t.noiseChaos - activeChaos) * lerpSpeed;
      activeSpeed += (t.particleSpeed - activeSpeed) * lerpSpeed;
      activeCameraZ += (t.cameraZ - activeCameraZ) * lerpSpeed;
      activeCameraY += (t.cameraY - activeCameraY) * lerpSpeed;
      activeCameraRotY += (t.cameraRotY - activeCameraRotY) * lerpSpeed;

      // Update camera positioning
      camera.position.z = activeCameraZ;
      // Add subtle parallax based on exact scroll percentage
      camera.position.y = activeCameraY - (scrollProgress - 0.5) * 5;
      camera.position.x = Math.sin(time * 0.3) * 0.3; // gentle sway
      camera.rotation.y = activeCameraRotY + Math.cos(time * 0.15) * 0.015;

      // Update Moon background visual
      if (moon && glowMoon) {
        // Parallel scroll effect
        moon.position.y = 3 - (scrollProgress * 15);
        glowMoon.position.y = moon.position.y;
        
        moon.rotation.y = time * 0.03;
        moon.rotation.x = time * 0.01;
        glowMoon.rotation.z = -time * 0.01;

        // Transition moon glow based on state
        // In deep dark phase, keep it dark purple; in transformed, Golden Eclipse!
        const innerMoonT = Math.min(1, Math.max(0, (activeLerp - 0.3) * 2));
        tempMoonColor.set('#221144').lerp(tempColA.set('#9a3412'), innerMoonT);

        const innerGlowT = Math.min(1, Math.max(0, (activeLerp - 0.5) * 2));
        tempGlowColor.set('#8b5cf6').lerp(tempColA.set('#eab308'), innerGlowT);
        
        if (moonMat && glowMat) {
          moonMat.color.copy(tempMoonColor);
          glowMat.color.copy(tempGlowColor);
          
          if (activeSection === 'oferta' || activeSection === 'cta') {
            glowMat.opacity = 0.15 + Math.sin(time * 3) * 0.03; // pulsing sun portal
            moonMat.opacity = 0.35 + Math.sin(time * 1.5) * 0.05;
          } else {
            glowMat.opacity = 0.05;
            moonMat.opacity = 0.15;
          }
        }
      }

      // Update Sacred Symbols floating
      if (sacredSymbols) {
        sacredSymbols.children.forEach((symbol) => {
          const mesh = symbol as THREE.Mesh;
          mesh.rotation.x += mesh.userData.rotX;
          mesh.rotation.y += mesh.userData.rotY;
          mesh.position.y = mesh.userData.baseY + Math.sin(time * 2 + mesh.userData.floatOffset) * 0.4;
          
          // Rotate globally around screen center
          mesh.position.x += Math.sin(time * 0.1 + mesh.userData.floatOffset) * 0.005;
          
          // Color update matching main state
          const meshMat = mesh.material as THREE.MeshBasicMaterial;
          if (meshMat) {
            tempSymColor.copy(meshMat.color);
            if (activeLerp < 0.35) {
              tempTargetCol.set('#8b5cf6');
            } else if (activeLerp < 0.65) {
              tempTargetCol.set('#3f3f46');
            } else {
              tempTargetCol.set('#fbbf24');
            }
            tempSymColor.lerp(tempTargetCol, 0.05);
            meshMat.color.copy(tempSymColor);
            
            // Adjust opacity depending on the scroll
            meshMat.opacity = 0.08 + (1 - scrollProgress) * 0.15;
          }
        });
      }

      // Update Particles State
      if (particles) {
        const geo = particles.geometry;
        const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
        const colAttr = geo.getAttribute('color') as THREE.BufferAttribute;

        if (posAttr && colAttr) {
          for (let i = 0; i < particleCount; i++) {
            let x = posAttr.getX(i);
            let y = posAttr.getY(i);
            let z = posAttr.getZ(i);

            // Fetch default stable position
            const initX = initialPositions[i * 3];
            const initY = initialPositions[i * 3 + 1];
            const initZ = initialPositions[i * 3 + 2];

            // Color calculation based on activeLerp range (zero-allocation)
            if (activeLerp < 0.35) {
              const innerT = activeLerp / 0.35;
              const colA = blendedColors[i % 3];
              tempParticleCol.copy(colA).lerp(colorDark, innerT);
            } else if (activeLerp < 0.65) {
              const innerT = (activeLerp - 0.35) / 0.3;
              tempParticleCol.copy(colorDark).lerp(colorGold, innerT);
            } else if (activeLerp < 0.85) {
              const innerT = (activeLerp - 0.65) / 0.2;
              tempParticleCol.copy(colorGold).lerp(colorWhiteGold, innerT * 0.5);
            } else {
              const innerT = (activeLerp - 0.85) / 0.15;
              tempParticleCol.copy(colorGold).lerp(colorWhiteGold, innerT);
            }

            colAttr.setXYZ(i, tempParticleCol.r, tempParticleCol.g, tempParticleCol.b);

            // Position Movement logic (dynamic physics morphing)
            // Vortex swirl computation:
            if (activeVortex > 0.15 && i < spiralCount) {
              // Apply strong orbital pull (spiraling vortex) around the Y axis
              const radius = Math.sqrt(x * x + z * z);
              // Calculate angular speed proportional to vortex force and inversely to radius
              const angSpeed = (activeVortex * 0.12) / (radius * 0.15 + 1);
              const angle = Math.atan2(z, x) + angSpeed * activeSpeed;
              
              // Draw particles inwards to form an hourglass or direct circular stream
              const targetRadius = Math.max(1.5, radius - 0.05 * activeSpeed);
              x = Math.cos(angle) * targetRadius;
              z = Math.sin(angle) * targetRadius;
              
              // Move along Y to create suction feeling
              y -= 0.06 * activeSpeed;
              if (y < -12) {
                // Respawn at top of vortex
                y = 12;
                const r = Math.random() * 12 + 4;
                x = Math.cos(angle) * r;
                z = Math.sin(angle) * r;
              }
            } else {
              // Standard gentle upwards/downwards drift + noise
              y += (0.015 + Math.sin(time + initX) * 0.005) * activeSpeed;
              x += Math.sin(time + initY) * 0.01 * activeChaos;
              z += Math.cos(time + initZ) * 0.01 * activeChaos;

              if (y > 18) y = -18; // soft vertical looping
              if (x > 25) x = -25;
              if (x < -25) x = 25;
            }

            posAttr.setXYZ(i, x, y, z);
          }
          posAttr.needsUpdate = true;
          colAttr.needsUpdate = true;
        }

        // Rotate the entire particle system slowly
        particles.rotation.y = time * 0.015;
      }

      renderer.render(scene, camera);
    };

    tick();

    // CLEANUP
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose resources
      scene.clear();
      moonGeo.dispose();
      moonMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      symbolGeoms.forEach(g => g.dispose());
      texture.dispose();
    };
  }, []);

  return (
    <div
      id="three-canvas-root"
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-radial from-[#08020e] via-[#030107] to-[#010002]"
    />
  );
}
