'use client';

/* eslint-disable no-param-reassign -- three.js objects are mutated in place by design. */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BLOCK = { w: 1.8, h: 0.42, d: 0.62 };
const DROP_FROM = 5;

function shade(hex, amount) {
  const c = new THREE.Color(hex);
  const hsl = {};
  c.getHSL(hsl);
  return new THREE.Color().setHSL(hsl.h, hsl.s, Math.min(0.85, Math.max(0.15, hsl.l + amount)));
}

// A tower that grows a block for every right answer; wrong answers drop a block that
// tumbles off. `placed` and `missed` only ever go up during a game.
export default function TowerScene({
  placed, missed, color = '#2F6F62', label,
}) {
  const stageRef = useRef(null);
  const api = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd6dde3, 0.9 * Math.PI));
    const sun = new THREE.DirectionalLight(0xffffff, 0.8 * Math.PI);
    sun.position.set(4, 10, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, {
      left: -5, right: 5, top: 12, bottom: -2,
    });
    scene.add(sun);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(1.9, 2.1, 0.3, 48),
      new THREE.MeshStandardMaterial({ color: 0xC9A46A, roughness: 0.7 }),
    );
    base.position.y = -0.15;
    base.receiveShadow = true;
    scene.add(base);

    const geometry = new THREE.BoxGeometry(BLOCK.w, BLOCK.h, BLOCK.d);
    const moving = [];
    const tower = [];
    let lookY = 1;
    let frame = 0;

    const resize = () => {
      const { width, height } = stage.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix();
    };
    const draw = () => {
      const top = tower.length * BLOCK.h;
      const target = Math.max(1, top - 0.6);
      lookY += (target - lookY) * (reduce ? 1 : 0.08);
      camera.position.set(5.5, lookY + 3, 7.5);
      camera.lookAt(0, lookY, 0);
      renderer.render(scene, camera);
    };

    const step = () => {
      frame = 0;
      for (let i = moving.length - 1; i >= 0; i -= 1) {
        const m = moving[i];
        m.t += 1 / 40;
        if (m.kind === 'place') {
          const k = Math.min(1, m.t);
          const ease = 1 - (1 - k) ** 3;
          m.mesh.position.y = m.to + (DROP_FROM * (1 - ease));
          if (k >= 1) moving.splice(i, 1);
        } else {
          m.vy -= 0.012;
          m.mesh.position.y += m.vy;
          m.mesh.position.x += m.vx;
          m.mesh.rotation.z += m.spin;
          if (m.mesh.position.y < -6) {
            scene.remove(m.mesh);
            m.mesh.material.dispose();
            moving.splice(i, 1);
          }
        }
      }
      draw();
      if (moving.length || Math.abs(lookY - Math.max(1, tower.length * BLOCK.h - 0.6)) > 0.01) {
        frame = requestAnimationFrame(step);
      }
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const block = (tint) => {
      const material = new THREE.MeshStandardMaterial({ color: tint, roughness: 0.55 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    };

    api.current = {
      place() {
        const n = tower.length;
        const mesh = block(shade(color, n % 2 ? 0.08 : -0.04));
        // Alternate layers like a log cabin, slightly off-centre so it looks hand-stacked.
        mesh.rotation.y = n % 2 ? Math.PI / 2 : 0;
        mesh.position.x = (Math.sin(n * 2.3) * 0.08);
        mesh.position.z = (Math.cos(n * 1.7) * 0.08);
        const to = BLOCK.h / 2 + n * BLOCK.h;
        tower.push(mesh);
        if (reduce) {
          mesh.position.y = to;
          draw();
          return;
        }
        mesh.position.y = to + DROP_FROM;
        moving.push({
          kind: 'place', mesh, to, t: 0,
        });
        kick();
      },
      miss() {
        if (reduce) return;
        const mesh = block(new THREE.Color(0xB42318));
        mesh.position.set(0.6, tower.length * BLOCK.h + DROP_FROM, 0);
        moving.push({
          kind: 'fall', mesh, t: 0, vy: -0.05, vx: 0.05, spin: -0.08,
        });
        kick();
      },
      reset() {
        tower.splice(0).forEach((m) => { scene.remove(m); m.material.dispose(); });
        draw();
      },
    };

    const observer = new ResizeObserver(() => { resize(); draw(); });
    observer.observe(stage);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      api.current = null;
    };
  }, [color]);

  // Turn prop changes into animations.
  const seen = useRef({ placed: 0, missed: 0 });
  useEffect(() => {
    if (!api.current) return;
    if (placed < seen.current.placed) api.current.reset();
    for (let i = Math.min(seen.current.placed, placed); i < placed; i += 1) api.current.place();
    for (let i = seen.current.missed; i < missed; i += 1) api.current.miss();
    seen.current = { placed, missed };
  }, [placed, missed]);

  return <div ref={stageRef} role="img" aria-label={label} className="h-full w-full" />;
}
