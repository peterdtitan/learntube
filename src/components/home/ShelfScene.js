'use client';

/* eslint-disable max-len, no-param-reassign -- geometry tables read best one object per line, and three.js objects are mutated in place by design. */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Low-poly objects, one per skill id. Each builder adds meshes to a group whose origin sits on the shelf.
function mat(color, roughness = 0.75) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02 });
}
function add(group, geometry, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  group.add(mesh);
  return mesh;
}
const WOOD = 0xC9A46A;
const DARK = 0x2B323A;

const BUILDERS = {
  cooking(g) {
    add(g, new THREE.CylinderGeometry(0.42, 0.38, 0.44, 40), mat(0xD9573F, 0.5), 0, 0.22);
    add(g, new THREE.CylinderGeometry(0.44, 0.44, 0.05, 40), mat(0xC24A34, 0.5), 0, 0.465);
    add(g, new THREE.SphereGeometry(0.07, 16, 12), mat(DARK), 0, 0.53);
    [-1, 1].forEach((s) => {
      add(g, new THREE.TorusGeometry(0.09, 0.025, 8, 20), mat(DARK), s * 0.46, 0.34).rotation.x = Math.PI / 2;
    });
  },
  knitting(g) {
    add(g, new THREE.SphereGeometry(0.38, 32, 24), mat(0x82B0A2), 0, 0.38);
    [[0, 0, 0], [Math.PI / 2, 0, 0.4], [0.6, Math.PI / 2, 0], [1.1, 0.4, 1.2]].forEach(([x, y, z]) => {
      add(g, new THREE.TorusGeometry(0.385, 0.018, 8, 48), mat(0x6E9C8E), 0, 0.38).rotation.set(x, y, z);
    });
    [-1, 1].forEach((s) => {
      add(g, new THREE.CylinderGeometry(0.018, 0.018, 1.0, 10), mat(WOOD, 0.6), 0, 0.6, 0.05).rotation.z = s * 0.55;
    });
  },
  sewing(g) {
    [0.035, 0.565].forEach((y) => add(g, new THREE.CylinderGeometry(0.34, 0.34, 0.07, 40), mat(WOOD, 0.6), 0, y));
    add(g, new THREE.CylinderGeometry(0.26, 0.26, 0.46, 40), mat(0xD97894), 0, 0.3);
    add(g, new THREE.CylinderGeometry(0.012, 0.012, 0.6, 8), mat(0xC7CDD3, 0.3), 0.3, 0.42, 0.2).rotation.z = -0.5;
  },
  drawing(g) {
    add(g, new THREE.BoxGeometry(0.8, 0.07, 0.58), mat(0x34495E, 0.7), 0, 0.035);
    add(g, new THREE.BoxGeometry(0.76, 0.03, 0.54), mat(0xFAF8F2, 0.9), 0.01, 0.085);
    add(g, new THREE.TorusGeometry(0.12, 0.012, 6, 30), mat(0x55616C), -0.12, 0.102, 0.02).rotation.x = Math.PI / 2;
    const pencil = new THREE.Group();
    pencil.position.set(0.05, 0.13, 0.05);
    pencil.rotation.set(0, 0.7, Math.PI / 2);
    g.add(pencil);
    add(pencil, new THREE.CylinderGeometry(0.035, 0.035, 0.62, 6), mat(0xE3B341, 0.6));
    add(pencil, new THREE.ConeGeometry(0.035, 0.1, 6), mat(0xE8C9A0, 0.8), 0, 0.36);
    add(pencil, new THREE.CylinderGeometry(0.036, 0.036, 0.06, 12), mat(0xE89AAA, 0.8), 0, -0.34);
  },
  guitar(g) {
    const body = new THREE.Group();
    body.scale.setScalar(0.82);
    body.rotation.z = 0.1;
    g.add(body);
    add(body, new THREE.SphereGeometry(0.3, 32, 20), mat(0xC47A3D, 0.5), 0, 0.31).scale.z = 0.35;
    add(body, new THREE.SphereGeometry(0.22, 32, 20), mat(0xC47A3D, 0.5), 0, 0.63).scale.z = 0.35;
    add(body, new THREE.CylinderGeometry(0.07, 0.07, 0.02, 24), mat(0x2B1B10), 0, 0.5, 0.1).rotation.x = Math.PI / 2;
    add(body, new THREE.BoxGeometry(0.07, 0.48, 0.05), mat(0x5A3A22, 0.6), 0, 1.0);
    add(body, new THREE.BoxGeometry(0.12, 0.14, 0.05), mat(0x5A3A22, 0.6), 0, 1.29);
  },
  photography(g) {
    add(g, new THREE.BoxGeometry(0.62, 0.4, 0.28), mat(0x3D4752, 0.5), 0, 0.2);
    add(g, new THREE.BoxGeometry(0.22, 0.1, 0.2), mat(0x3D4752, 0.5), -0.1, 0.45);
    add(g, new THREE.CylinderGeometry(0.15, 0.16, 0.22, 32), mat(DARK, 0.4), 0.04, 0.2, 0.24).rotation.x = Math.PI / 2;
    const glass = new THREE.MeshStandardMaterial({ color: 0x4F7FD9, roughness: 0.15, metalness: 0.4 });
    add(g, new THREE.CylinderGeometry(0.11, 0.11, 0.01, 32), glass, 0.04, 0.2, 0.355).rotation.x = Math.PI / 2;
    add(g, new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16), mat(0xD9573F), 0.2, 0.42);
  },
  'software-engineering': (g) => {
    add(g, new THREE.BoxGeometry(1.0, 0.05, 0.66), mat(0xB8C2CC, 0.45), 0, 0.025);
    const hinge = new THREE.Group();
    hinge.position.set(0, 0.05, -0.32);
    hinge.rotation.x = -0.28;
    g.add(hinge);
    add(hinge, new THREE.BoxGeometry(1.0, 0.64, 0.035), mat(0xB8C2CC, 0.45), 0, 0.32);
    add(hinge, new THREE.PlaneGeometry(0.9, 0.54), new THREE.MeshBasicMaterial({ color: 0x17212B }), 0, 0.32, 0.019);
    [[0.46, 0x2F6F62, -0.1], [0.3, 0xD9A441, -0.18], [0.52, 0x7C8A96, -0.05], [0.24, 0x2F6F62, -0.2]]
      .forEach(([w, color, x], i) => {
        add(hinge, new THREE.PlaneGeometry(w, 0.04), new THREE.MeshBasicMaterial({ color }), x, 0.48 - i * 0.09, 0.021);
      });
  },
  data(g) {
    add(g, new THREE.BoxGeometry(0.9, 0.05, 0.5), mat(0xE6EAEE), 0, 0.025);
    [[0.3, 0x9DB8EE], [0.55, 0x7699E3], [0.42, 0x9DB8EE], [0.76, 0x4F7FD9]].forEach(([h, color], i) => {
      add(g, new THREE.BoxGeometry(0.16, h, 0.16), mat(color, 0.55), -0.3 + i * 0.2, 0.05 + h / 2);
    });
  },
  'digital-marketing': (g) => {
    add(g, new THREE.CylinderGeometry(0.1, 0.3, 0.62, 32), mat(0x2696A8, 0.5), 0, 0.34).rotation.z = -Math.PI / 2;
    add(g, new THREE.TorusGeometry(0.3, 0.025, 8, 40), mat(0xF3F5F7, 0.5), 0.31, 0.34).rotation.y = Math.PI / 2;
    add(g, new THREE.BoxGeometry(0.08, 0.26, 0.08), mat(DARK), -0.12, 0.13);
  },
  'music-production': (g) => {
    add(g, new THREE.TorusGeometry(0.34, 0.035, 12, 40, Math.PI), mat(0x3A3F55), 0, 0.2);
    [-1, 1].forEach((s) => {
      add(g, new THREE.CylinderGeometry(0.13, 0.13, 0.12, 28), mat(0x7C6CD8, 0.55), s * 0.34, 0.2).rotation.z = Math.PI / 2;
    });
  },
};

function fallbackObject(g, color) {
  add(g, new THREE.BoxGeometry(0.5, 0.5, 0.5), mat(new THREE.Color(color)), 0, 0.25);
}

const SHELF_Y = { HAND: 1.4, SCREEN: 0 };
const SLOTS_X = [-3.1, -1.55, 0, 1.55, 3.1];

export default function ShelfScene({
  skills, selectedId, accent, onSelect, onHover,
}) {
  const stageRef = useRef(null);
  const apiRef = useRef(null);
  const handlers = useRef({ onSelect, onHover });
  handlers.current = { onSelect, onHover };
  const current = useRef({ selectedId, accent });
  current.current = { selectedId, accent };

  useEffect(() => {
    const stage = stageRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = 'absolute inset-0 h-full w-full';
    renderer.domElement.style.touchAction = 'pan-y';
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);
    const look = new THREE.Vector3(0, 1.05, 0);
    camera.position.set(0, 2.1, 10);

    // Physically based lights since r155: intensities are scaled by PI to match the earlier look.
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd6dde3, 0.85 * Math.PI));
    const sun = new THREE.DirectionalLight(0xffffff, 0.7 * Math.PI);
    sun.position.set(-3, 8, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, {
      left: -6, right: 6, top: 5, bottom: -3,
    });
    scene.add(sun);

    const OAK = 0xC8AF88;
    Object.values(SHELF_Y).forEach((y) => {
      const plank = add(scene, new THREE.BoxGeometry(7.9, 0.14, 1.4), mat(OAK, 0.85), 0, y - 0.07, 0);
      plank.receiveShadow = true;
      plank.castShadow = true;
    });
    [-1, 1].forEach((s) => {
      const upright = add(scene, new THREE.BoxGeometry(0.14, 2.75, 1.4), mat(0xB89C72, 0.85), s * 4.02, 1.1, 0);
      upright.receiveShadow = true;
      upright.castShadow = true;
    });

    const items = [];
    const hits = [];
    const spots = {};
    const slot = { HAND: 0, SCREEN: 0 };
    skills.forEach((skill) => {
      const tier = skill.tier in SHELF_Y ? skill.tier : 'SCREEN';
      const x = SLOTS_X[slot[tier] % SLOTS_X.length];
      slot[tier] += 1;
      const group = new THREE.Group();
      (BUILDERS[skill.id] || ((g) => fallbackObject(g, skill.color)))(group);
      group.position.set(x, SHELF_Y[tier], 0);
      group.userData = { id: skill.id, baseY: SHELF_Y[tier] };
      group.traverse((o) => {
        if (o.isMesh) {
          Object.assign(o, { castShadow: true, receiveShadow: true });
          o.userData.item = group;
          hits.push(o);
        }
      });
      scene.add(group);
      items.push(group);
      spots[skill.id] = { x, y: SHELF_Y[tier] };
    });

    const markerMaterial = new THREE.MeshBasicMaterial({ color: current.current.accent });
    const marker = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.022, 8, 80), markerMaterial);
    marker.rotation.x = Math.PI / 2;
    marker.visible = false;
    scene.add(marker);
    let markerTo = null;

    let hovered = null;
    const pointer = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const canvas = renderer.domElement;

    function pick(e) {
      const rect = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(hits, false)[0];
      return hit ? hit.object.userData.item : null;
    }

    let frame = 0;
    let running = false;
    let visible = true;
    const clock = new THREE.Clock();

    function update(t) {
      const ease = reduce ? 1 : 0.12;
      const cam = reduce ? 1 : 0.06;
      const dist = Math.max(3.4 / 0.5735, 9.4 / (0.5735 * camera.aspect));
      camera.position.x += ((reduce ? 0 : pointer.x * 0.9) - camera.position.x) * cam;
      camera.position.y += (2.1 + (reduce ? 0 : -pointer.y * 0.4) - camera.position.y) * cam;
      camera.position.z += (dist - camera.position.z) * (reduce ? 1 : 0.1);
      camera.lookAt(look);
      items.forEach((g) => {
        const lift = g === hovered ? 0.1 : 0;
        g.position.y += (g.userData.baseY + lift - g.position.y) * ease;
        const wobble = g === hovered && !reduce ? Math.sin(t * 2) * 0.12 : 0;
        g.rotation.y += (wobble - g.rotation.y) * ease;
      });
      if (markerTo) {
        if (!marker.visible || reduce) marker.position.set(markerTo.x, markerTo.y + 0.006, 0);
        marker.visible = true;
        marker.position.x += (markerTo.x - marker.position.x) * ease;
        marker.position.y += (markerTo.y + 0.006 - marker.position.y) * ease;
      }
    }

    function draw() {
      update(clock.getElapsedTime());
      renderer.render(scene, camera);
    }

    function loop() {
      draw();
      if (running) frame = requestAnimationFrame(loop);
    }

    function start() {
      if (reduce) { draw(); return; }
      if (running || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function resize() {
      const { clientWidth: w, clientHeight: h } = stage;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      draw();
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (e.clientY - rect.top) / rect.height - 0.5;
      const hit = pick(e);
      if (hit !== hovered) {
        hovered = hit;
        canvas.style.cursor = hit ? 'pointer' : 'default';
        handlers.current.onHover?.(hit ? hit.userData.id : null);
      }
      if (reduce) draw();
    };
    const onLeave = () => {
      hovered = null;
      pointer.x = 0;
      pointer.y = 0;
      handlers.current.onHover?.(null);
      if (reduce) draw();
    };
    const onClick = (e) => {
      const hit = pick(e);
      if (hit) handlers.current.onSelect?.(hit.userData.id);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('click', onClick);
    document.addEventListener('visibilitychange', onVisibility);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    });
    io.observe(stage);

    apiRef.current = {
      select(id) { markerTo = spots[id] || null; if (!running) draw(); },
      setAccent(color) { markerMaterial.color.set(color); if (!running) draw(); },
    };

    apiRef.current.select(current.current.selectedId);
    resize();
    start();

    return () => {
      stop();
      apiRef.current = null;
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('click', onClick);
      scene.traverse((o) => {
        if (o.isMesh) {
          o.geometry.dispose();
          o.material.dispose();
        }
      });
      renderer.dispose();
      canvas.remove();
    };
    // The scene is built once per skill list; selection and colour update through apiRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills]);

  useEffect(() => { apiRef.current?.select(selectedId); }, [selectedId]);
  useEffect(() => { apiRef.current?.setAccent(accent); }, [accent]);

  return <div ref={stageRef} className="absolute inset-0" aria-hidden="true" />;
}
