"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import worldTopology from "world-atlas/countries-110m.json";
import { mapOrigin, routeLanes } from "@/content/site";

const W = 1600;
const H = 800;

/**
 * Animated coverage map: great-circle lanes out of Lagos to our most-used
 * destinations, drawn with D3 over a Natural Earth country layer. Hovering
 * a chip below the map highlights its lane.
 */
export function RouteMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    const chipsEl = chipsRef.current;
    if (!svgEl || !chipsEl) return;

    const svg = d3.select(svgEl);
    const projection = d3.geoNaturalEarth1().scale(298).translate([W / 2 - 30, H / 2 + 26]);
    const path = d3.geoPath(projection);

    const topology = worldTopology as unknown as Topology;
    const countries = topojson.feature(
      topology,
      topology.objects.countries as GeometryCollection
    ).features;
    const served = new Set<string>([...routeLanes.map((d): string => d.iso), mapOrigin.iso]);

    svg
      .append("g")
      .selectAll("path")
      .data(countries)
      .join("path")
      .attr("d", path)
      .attr("fill", (d) => (served.has(String(d.id)) ? "#DCD8D0" : "#EFEDE8"))
      .attr("stroke", "#FFFFFF")
      .attr("stroke-width", 0.6);

    svg
      .append("path")
      .datum(d3.geoGraticule10())
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#111213")
      .attr("stroke-opacity", 0.045)
      .attr("stroke-width", 0.5);

    const arcs = svg.append("g");
    const pts = svg.append("g");
    const labels = svg.append("g");
    const [ox, oy] = projection([...mapOrigin.coords]) as [number, number];

    type Lane = {
      name: string;
      node: SVGPathElement;
      len: number;
      spark: d3.Selection<SVGCircleElement, unknown, null, undefined>;
      ring: d3.Selection<SVGCircleElement, unknown, null, undefined>;
      arc: d3.Selection<SVGPathElement, unknown, null, undefined>;
      held: boolean;
    };

    const lanes: Lane[] = routeLanes.map((d) => {
      const feature = {
        type: "LineString" as const,
        coordinates: d3
          .range(0, 1.001, 0.02)
          .map((t) => d3.geoInterpolate([...mapOrigin.coords], [...d.coords])(t)),
      };
      const arc = arcs
        .append("path")
        .attr("d", path(feature))
        .attr("fill", "none")
        .attr("stroke", "#111213")
        .attr("stroke-width", 1.2)
        .attr("stroke-opacity", 0.55);
      const node = arc.node();
      if (!node) throw new Error("lane arc failed to render");
      const len = node.getTotalLength();
      arc.attr("stroke-dasharray", "0 " + len);

      const [x, y] = projection([...d.coords]) as [number, number];
      const spark = pts.append("circle").attr("r", 3).attr("fill", "#111213");
      pts.append("circle").attr("cx", x).attr("cy", y).attr("r", 3.4).attr("fill", "#111213");
      const ring = pts
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 4)
        .attr("fill", "none")
        .attr("stroke", "#111213")
        .attr("stroke-width", 1);

      labels
        .append("text")
        .attr("x", x + d.dx)
        .attr("y", y + d.dy)
        .attr("text-anchor", "anchor" in d ? d.anchor : "start")
        .attr("font-size", 10)
        .attr("font-weight", 600)
        .attr("letter-spacing", "0.08em")
        .attr("fill", "#5B6066")
        .attr("font-family", "Instrument Sans, sans-serif")
        .text(d.name.toUpperCase());

      return { name: d.name, node, len, spark, ring, arc, held: false };
    });

    pts.append("circle").attr("cx", ox).attr("cy", oy).attr("r", 5.5).attr("fill", "#B4512A");
    labels
      .append("text")
      .attr("x", ox)
      .attr("y", oy + 22)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("font-weight", 700)
      .attr("letter-spacing", "0.08em")
      .attr("fill", "#111213")
      .attr("font-family", "Instrument Sans, sans-serif")
      .text(mapOrigin.name.toUpperCase());

    function hoverLane(name: string, on: boolean) {
      lanes.forEach((l) => {
        l.held = on && l.name === name;
        if (l.held) l.arc.attr("stroke-dasharray", l.len + " 0").attr("stroke-dashoffset", 0);
        l.arc
          .attr("stroke-opacity", on ? (l.name === name ? 1 : 0.12) : 0.55)
          .attr("stroke-width", on && l.name === name ? 2 : 1.2);
      });
    }

    chipsEl.innerHTML = "";
    routeLanes.forEach((d) => {
      const chip = document.createElement("div");
      chip.className = "route-chip";
      chip.innerHTML = `${d.name} <span>${d.days} days</span>`;
      chip.addEventListener("mouseenter", () => hoverLane(d.name, true));
      chip.addEventListener("mouseleave", () => hoverLane(d.name, false));
      chipsEl.appendChild(chip);
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lanes.forEach((l) => l.arc.attr("stroke-dasharray", l.len + " 0"));
      return;
    }

    // d3.timer's callback receives elapsed ms since the timer started
    // (not an absolute performance.now() timestamp), so it can be used
    // directly without subtracting a captured start time.
    const timer = d3.timer((elapsed) => {
      const el = elapsed / 1000;
      lanes.forEach((l, i) => {
        const t = (el * 0.13 + i / lanes.length) % 1;
        const pt = l.node.getPointAtLength(t * l.len);
        l.spark.attr("cx", pt.x).attr("cy", pt.y).attr("opacity", Math.sin(t * Math.PI) * 1.2);
        if (!l.held) {
          const head = t * l.len;
          const start = Math.max(0, head - l.len * 0.45);
          l.arc.attr("stroke-dasharray", head - start + " " + l.len).attr("stroke-dashoffset", -start);
        }
        const pulse = (el * 0.6 + i * 0.17) % 1;
        l.ring.attr("r", 4 + pulse * 13).attr("stroke-opacity", 0.45 * (1 - pulse));
      });
    });

    return () => {
      timer.stop();
      svg.selectAll("*").remove();
    };
  }, []);

  return (
    <div className="rounded-[var(--radius-card)] border border-[#E7E4DE] bg-surface overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="World map showing shipping routes from Lagos, Nigeria to London, Dublin, New York, Toronto, Berlin, Dubai, Guangzhou and Johannesburg"
        className="block w-full h-auto"
      />
      <div ref={chipsRef} className="flex flex-wrap gap-2 p-4 sm:p-6" />
    </div>
  );
}
