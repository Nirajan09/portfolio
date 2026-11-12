---
title: "Designing a 60 FPS Interactive Particle Mesh in Pure Canvas 2D"
summary: "Why I avoided Three.js and WebGL for my site-wide backdrop and built a deterministic, zero-re-render Canvas 2D network using pre-rendered glow sprites."
publishedAt: "2026-11-10"
category: "Frontend Performance"
tags:
  - "Canvas 2D"
  - "React"
  - "Performance"
  - "Animation"
featured: true
---

Interactive background animations are notoriously double-edged on developer portfolios: they establish strong visual identity above the fold, yet heavier WebGL scenes often inflate JavaScript bundles by hundreds of kilobytes and cause frame drops on mid-range laptops or mobile devices.

For my portfolio's cyber-dark backdrop (`InteractiveMesh.tsx`), the goal was simple: render a glowing, pointer-reactive mesh across the whole viewport while keeping bundle weight negligible and **zero React state updates inside the animation loop**.

## Why Native Canvas 2D Over Three.js

Three.js is indispensable for genuine 3D geometry, shaders, and lighting models. For a crisp 2D node-and-edge network background, however, shipping a 3D engine creates unnecessary cost:

- **Zero extra runtime dependency**: Native `<canvas>` `getContext("2d")` adds zero kilobytes to third-party chunks.
- **Instant startup**: No shader compilation stall during initial page paint.
- **Clean progressive degradation**: When `prefers-reduced-motion: reduce` matches, it draws a single deterministic static frame cleanly and stops `requestAnimationFrame`.

## Eliminating Expensive Per-Frame Gradients with Sprite Caching

The single biggest performance bottleneck in custom 2D particle canvases is drawing radial gradients (`ctx.createRadialGradient`) or `ctx.shadowBlur` for every particle on every frame.

Instead of recomputing gradients at 60 FPS across 120 particles (`7,200` gradient allocations per second), `createGlowSprite` pre-renders **three reusable `48x48` offscreen canvases** once at mount time (cyan, blue, and violet):

```ts title="components/background/InteractiveMesh.tsx"
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
```

During animation, each particle glow becomes a hardware-accelerated bitmap blit (`ctx.drawImage`) plus a tiny solid core `ctx.arc`.

## Deterministic Seeding & Viewport-Adaptive Density

Rather than scattering particles arbitrarily with `Math.random()`, the mesh seeds node positions and drift velocities using a lightweight `mulberry32` PRNG (`SEED = 20260930`). That ensures visual balance remains predictable across renders without hydration mismatches.

Density and link threshold adapt dynamically to screen width:

| Breakpoint | Max Nodes | Target Area / Node | Max Link Distance |
| :--- | :---: | :---: | :---: |
| Mobile (`< 640px`) | `45` | `26,000 px²` | `110 px` |
| Tablet (`640px – 1023px`) | `70` | `18,000 px²` | `125 px` |
| Desktop (`>= 1024px`) | `120` | `13,000 px²` | `140 px` |

On window resize (such as mobile address-bar collapse), existing nodes proportionally scale their coordinates (`n.x *= nx / w`) rather than respawning, avoiding sudden visual jumps.

## Closure-Isolated Physics Loop & Battery Respect

To prevent triggering React reconciliation at 60 Hz, every simulation variable (`nodes`, `mouse`, `w`, `h`, `last`, `raf`) lives strictly inside a single `useEffect` closure:

1. **Squared-distance early exits**: Pair comparisons check `dx * dx + dy * dy > linkSq` before ever calling `Math.sqrt`.
2. **Gentle cursor repulsion**: Within `MOUSE_RADIUS = 150`, nodes accelerate smoothly away from the cursor and relax back toward their resting drift velocity `(bx, by)`.
3. **Tab visibility & reduced motion hooks**: A `visibilitychange` listener cancels `requestAnimationFrame` automatically when the browser tab goes into the background, and resumes smoothly without huge delta-time spikes (`dt` is clamped to `0.05s`).

## Key Takeaways

- **Cache immutable visual effects offscreen**: Pre-rendering radial glows onto small offscreen canvases turns an expensive shader-like operation into a trivial image blit.
- **Keep `requestAnimationFrame` out of React state**: Treat `<canvas>` as an imperative surface initialized once via `useRef`.
- **Respect user constraints by default**: Paused background tabs, capped DPR (`Math.min(dpr, 2)`), mobile density scaling, and `prefers-reduced-motion` support belong in the first draft, not a later cleanup pass.
