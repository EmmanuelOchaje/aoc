"use client";

import { useEffect, useRef } from "react";
import { NIGERIA_BORDER } from "@/content/nigeria";

/**
 * Wireframe globe with route arcs radiating from Lagos.
 *
 * Drawn on a 2D canvas rather than with three.js: the projection is
 * orthographic and the geometry is a few thousand points, so a WebGL
 * dependency would cost ~150KB to do arithmetic we can do here.
 *
 * Honours prefers-reduced-motion by rendering a single static frame.
 */

type Vec3 = { x: number; y: number; z: number };

const ORIGIN = { name: "LAGOS", lat: 6.5, lng: 3.4 };

const DESTINATIONS = [
  { name: "LONDON", lat: 51.5, lng: -0.1 },
  { name: "NEW YORK", lat: 40.7, lng: -74.0 },
  { name: "DUBAI", lat: 25.2, lng: 55.3 },
  { name: "GUANGZHOU", lat: 23.1, lng: 113.3 },
  { name: "TORONTO", lat: 43.7, lng: -79.4 },
];

/**
 * The globe is fixed rather than spinning.
 *
 * Rotating it swings Nigeria in and out of view and undercuts the
 * point, which is that every route leaves from one place. Turning the
 * sphere so the origin's longitude faces the camera puts Nigeria dead
 * centre, with the Americas falling away left and Asia over the right
 * limb. Only the departing traffic moves, and it loops continuously.
 */
const VIEW_ROTATION = -(ORIGIN.lng * Math.PI) / 180;

const DOT_COUNT = 1500;
/** Pale steel — the globe sits on the dark navy hero, so it reads light. */
const DOT = "186, 206, 226";
const GOLD = "201, 177, 144";

function toVec(lat: number, lng: number): Vec3 {
  const phi = (lat * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  return {
    x: Math.cos(phi) * Math.sin(theta),
    y: Math.sin(phi),
    z: Math.cos(phi) * Math.cos(theta),
  };
}

function rotateY({ x, y, z }: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: x * cos + z * sin, y, z: -x * sin + z * cos };
}

/** Spherical interpolation, so arcs follow great circles like real routes. */
function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return a;

  const sinOmega = Math.sin(omega);
  const wa = Math.sin((1 - t) * omega) / sinOmega;
  const wb = Math.sin(t * omega) / sinOmega;

  return {
    x: a.x * wa + b.x * wb,
    y: a.y * wa + b.y * wb,
    z: a.z * wa + b.z * wb,
  };
}

/** Evenly distributed points via the Fibonacci sphere. */
function buildDots(count: number): Vec3[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, index) => {
    const y = 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * index;
    return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
  });
}

export function HeroGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dots = buildDots(DOT_COUNT);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let radius = 0;
    let frame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      radius = Math.min(width, height) * 0.42;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      // Fixed viewpoint — only the traffic along the routes moves.
      const spin = VIEW_ROTATION;
      const cx = width / 2;
      const cy = height / 2;

      context.clearRect(0, 0, width, height);

      // No halo behind the sphere: it warmed the right of the hero and
      // broke the flat, even background.

      // Landmass-free dot shell — only the front hemisphere is drawn
      for (const dot of dots) {
        const point = rotateY(dot, spin);
        if (point.z <= 0) continue;

        const depth = point.z;
        context.globalAlpha = 0.10 + depth * 0.45;
        context.fillStyle = `rgba(${DOT}, 1)`;
        context.beginPath();
        context.arc(
          cx + point.x * radius,
          cy - point.y * radius,
          depth * 1.15,
          0,
          Math.PI * 2,
        );
        context.fill();
      }
      context.globalAlpha = 1;

      // Nigeria, drawn on the surface so the routes visibly launch
      // from the country rather than from an anonymous point.
      // Sits under the arcs so departing pulses read on top of it.
      const border = NIGERIA_BORDER.map(([lat, lng]) =>
        rotateY(toVec(lat, lng), spin),
      );

      // Only draw it while the country faces the camera — as the globe
      // turns away the shape would otherwise fold in on itself.
      if (border.every((point) => point.z > 0)) {
        context.beginPath();
        border.forEach((point, index) => {
          const px = cx + point.x * radius;
          const py = cy - point.y * radius;
          if (index === 0) context.moveTo(px, py);
          else context.lineTo(px, py);
        });
        context.closePath();

        // Depth-fade with the rest of the globe as it rotates
        const facing = Math.min(
          1,
          border.reduce((sum, point) => sum + point.z, 0) / border.length * 1.5,
        );

        context.globalAlpha = facing;
        context.fillStyle = `rgba(${GOLD}, 0.18)`;
        context.fill();
        context.strokeStyle = `rgba(${GOLD}, 0.85)`;
        context.lineWidth = 1.2;
        context.lineJoin = "round";
        context.stroke();
        context.globalAlpha = 1;
      }

      // Route arcs from Lagos, lifted off the surface
      const origin = toVec(ORIGIN.lat, ORIGIN.lng);

      DESTINATIONS.forEach((destination, index) => {
        const target = toVec(destination.lat, destination.lng);
        const steps = 64;

        context.beginPath();
        let started = false;

        for (let step = 0; step <= steps; step++) {
          const t = step / steps;
          const surface = slerp(origin, target, t);
          const lift = 1 + Math.sin(Math.PI * t) * 0.22;
          const point = rotateY(
            {
              x: surface.x * lift,
              y: surface.y * lift,
              z: surface.z * lift,
            },
            spin,
          );

          if (point.z <= 0) {
            started = false;
            continue;
          }

          const px = cx + point.x * radius;
          const py = cy - point.y * radius;

          if (started) {
            context.lineTo(px, py);
          } else {
            context.moveTo(px, py);
            started = true;
          }
        }

        context.strokeStyle = `rgba(${GOLD}, 0.55)`;
        context.lineWidth = 1.1;
        context.stroke();

        // A pulse travelling the route, offset per arc so they stagger
        if (!reduceMotion) {
          const progress = ((time * 0.00016 + index * 0.2) % 1);
          const surface = slerp(origin, target, progress);
          const lift = 1 + Math.sin(Math.PI * progress) * 0.22;
          const point = rotateY(
            {
              x: surface.x * lift,
              y: surface.y * lift,
              z: surface.z * lift,
            },
            spin,
          );

          if (point.z > 0) {
            const px = cx + point.x * radius;
            const py = cy - point.y * radius;
            const glow = context.createRadialGradient(px, py, 0, px, py, 9);
            glow.addColorStop(0, `rgba(${GOLD}, 0.95)`);
            glow.addColorStop(1, `rgba(${GOLD}, 0)`);
            context.fillStyle = glow;
            context.beginPath();
            context.arc(px, py, 9, 0, Math.PI * 2);
            context.fill();
          }
        }

        // Destination marker, hidden as it passes behind the globe
        const marker = rotateY(target, spin);
        if (marker.z > 0) {
          const px = cx + marker.x * radius;
          const py = cy - marker.y * radius;

          context.fillStyle = `rgba(${GOLD}, 0.9)`;
          context.beginPath();
          context.arc(px, py, 2.4, 0, Math.PI * 2);
          context.fill();

          context.globalAlpha = Math.min(1, marker.z * 1.6);
          context.fillStyle = `rgba(${DOT}, 0.8)`;
          context.font =
            '500 9px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif';
          context.letterSpacing = "1.5px";
          context.fillText(destination.name, px + 8, py + 3);
          context.globalAlpha = 1;
        }
      });

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full ${className}`}
    />
  );
}
