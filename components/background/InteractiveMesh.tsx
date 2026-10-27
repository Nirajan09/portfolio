"use client";

import { useEffect, useRef } from "react";

type MeshNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Resting drift velocity the node relaxes back to after being pushed. */
  bx: number;
  by: number;
  r: number;
  /** Index into PALETTE. */
  c: number;
};

type Rgb = { r: number; g: number; b: number };

const PALETTE: readonly Rgb[] = [
  { r: 34, g: 211, b: 238 }, // cyan
  { r: 59, g: 130, b: 246 }, // blue
  { r: 139, g: 92, b: 246 }, // violet
];

const MOUSE_RADIUS = 150;
const SEED = 20260930;

/** Small deterministic PRNG so the layout is stable between renders. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Density and link distance scale with viewport width. */
function getConfig(width: number) {
  if (width < 640) return { area: 26000, max: 45, link: 110 };
  if (width < 1024) return { area: 18000, max: 70, link: 125 };
  return { area: 13000, max: 120, link: 140 };
}

function createGlowSprite({ r, g, b }: Rgb, size = 48) {
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d");
  if (!ctx) return sprite;
  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
  gradient.addColorStop(0.25, `rgba(${r},${g},${b},0.3)`);
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

/**
 * Site-wide canvas 2D network background, fixed behind all content.
 * All animation state lives in closures, so React never re-renders while it
 * runs. Full strength at the top of the page, dimmed once you scroll past the
 * hero so it never competes with text.
 */
export function InteractiveMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rand = mulberry32(SEED);
    const sprites = PALETTE.map((color) => createGlowSprite(color));
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const nodes: MeshNode[] = [];
    const mouse = { x: 0, y: 0, active: false };

    let w = 0;
    let h = 0;
    let link = 140;
    let reduced = motionQuery.matches;
    let running = false;
    let raf = 0;
    let last = 0;

    const createNode = (): MeshNode => {
      const speed = 6 + rand() * 10; // px/s, slow drift
      const angle = rand() * Math.PI * 2;
      const bx = Math.cos(angle) * speed;
      const by = Math.sin(angle) * speed;
      const pick = rand();
      return {
        x: rand() * w,
        y: rand() * h,
        vx: bx,
        vy: by,
        bx,
        by,
        r: 1 + rand() * 1.2,
        c: pick < 0.5 ? 0 : pick < 0.8 ? 1 : 2,
      };
    };

    const step = (dt: number) => {
      const relax = Math.min(1, dt * 1.5);
      const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

      for (const n of nodes) {
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < radiusSq && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const push = (1 - d / MOUSE_RADIUS) * 160 * dt; // gentle repulsion
            n.vx += (dx / d) * push;
            n.vy += (dy / d) * push;
          }
        }

        n.vx += (n.bx - n.vx) * relax;
        n.vy += (n.by - n.vy) * relax;
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        if (n.x < 0) {
          n.x = 0;
          n.vx = Math.abs(n.vx);
          n.bx = Math.abs(n.bx);
        } else if (n.x > w) {
          n.x = w;
          n.vx = -Math.abs(n.vx);
          n.bx = -Math.abs(n.bx);
        }
        if (n.y < 0) {
          n.y = 0;
          n.vy = Math.abs(n.vy);
          n.by = Math.abs(n.by);
        } else if (n.y > h) {
          n.y = h;
          n.vy = -Math.abs(n.vy);
          n.by = -Math.abs(n.by);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const linkSq = link * link;
      const mouseOn = mouse.active && !reduced;

      // Connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkSq) continue;

          let alpha = (1 - Math.sqrt(d2) / link) * 0.2;
          if (mouseOn) {
            const mx = (a.x + b.x) / 2 - mouse.x;
            const my = (a.y + b.y) / 2 - mouse.y;
            const md = Math.sqrt(mx * mx + my * my);
            if (md < MOUSE_RADIUS) alpha += (1 - md / MOUSE_RADIUS) * 0.25;
          }

          const { r, g, b: blue } = PALETTE[a.c];
          ctx.strokeStyle = `rgba(${r},${g},${blue},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes: pre-rendered glow sprite + solid core
      for (const n of nodes) {
        let near = 0;
        if (mouseOn) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < MOUSE_RADIUS) near = 1 - d / MOUSE_RADIUS;
        }
        const glow = (10 + n.r * 4) * (1 + near * 0.8);
        ctx.globalAlpha = 0.4 + near * 0.4;
        ctx.drawImage(sprites[n.c], n.x - glow / 2, n.y - glow / 2, glow, glow);

        const { r, g, b } = PALETTE[n.c];
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const frame = (time: number) => {
      const dt = Math.min(0.05, (time - last) / 1000);
      last = time;
      step(dt);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nw = Math.round(rect.width);
      const nh = Math.round(rect.height);
      if (nw === 0 || nh === 0 || (nw === w && nh === h)) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(nw * dpr);
      canvas.height = Math.round(nh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rescale existing nodes instead of regenerating (no jitter on mobile
      // address-bar resizes).
      const sx = w ? nw / w : 1;
      const sy = h ? nh / h : 1;
      for (const n of nodes) {
        n.x *= sx;
        n.y *= sy;
      }
      w = nw;
      h = nh;

      const config = getConfig(w);
      link = config.link;
      const target = Math.min(config.max, Math.round((w * h) / config.area));
      while (nodes.length < target) nodes.push(createNode());
      while (nodes.length > target) nodes.pop();

      if (!running) draw(); // static frame (reduced motion / paused)
    };

    // Canvas is fixed at the viewport origin, so client coords are canvas coords.
    const onPointerMove = (event: PointerEvent) => {
      if (reduced || event.pointerType === "touch") return;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };
    const onPointerLeave = () => {
      mouse.active = false;
    };
    const onScroll = () => {
      const t = Math.min(1, window.scrollY / (window.innerHeight * 0.7));
      canvas.style.opacity = String(1 - 0.55 * t);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const attachInteractiveListeners = () => {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("blur", onPointerLeave);
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
    };

    const detachInteractiveListeners = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", onPointerLeave);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };

    const onMotionChange = () => {
      reduced = motionQuery.matches;
      stop();
      if (reduced) {
        mouse.active = false;
        detachInteractiveListeners();
        draw();
      } else {
        attachInteractiveListeners();
        start();
      }
    };

    const resizeObserver = new ResizeObserver(resize);

    resize();
    onScroll();
    resizeObserver.observe(canvas);
    motionQuery.addEventListener("change", onMotionChange);

    if (!reduced) {
      attachInteractiveListeners();
      start();
    } else {
      draw();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      detachInteractiveListeners();
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-1 size-full"
    />
  );
}