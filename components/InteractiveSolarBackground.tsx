"use client";

import React, { useRef, useState, MouseEvent, useMemo } from "react";

interface InteractiveSolarBackgroundProps {
  baseOpacity?: string | number;
  glowOpacity?: string | number;
}

const generateSolarPattern = () => {
  const w = 400, h = 300;
  const cellsX = 4, cellsY = 3;
  const margin = 4, gap = 4, rx = 5;
  const cellW = (w - margin * 2 - (cellsX - 1) * gap) / cellsX;
  const cellH = (h - margin * 2 - (cellsY - 1) * gap) / cellsY;

  const variants = ['var(--color-solar-cell-1)', 'var(--color-solar-cell-2)', 'var(--color-solar-cell-3)'];
  let cellsHTML = '';

  for (let r = 0; r < cellsY; r++) {
    for (let c = 0; c < cellsX; c++) {
      const cx = margin + c * (cellW + gap);
      const cy = margin + r * (cellH + gap);
      const vIndex = (r * cellsX + c) % 3;

      cellsHTML += `<rect x="${cx}" y="${cy}" width="${cellW}" height="${cellH}" rx="${rx}" ry="${rx}" fill="${variants[vIndex]}"/>`;

      [0.25, 0.5, 0.75].forEach(pct => {
        const bx = cx + cellW * pct;
        cellsHTML += `<line x1="${bx}" y1="${cy}" x2="${bx}" y2="${cy + cellH}" stroke="var(--color-solar-grid)" stroke-width="2.2" opacity="0.72"/>`;
      });
    }
  }

  const svgStr = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect width="400" height="300" fill="var(--color-solar-panel)"/>
      ${cellsHTML}
    </svg>
  `.replace(/\s+/g, ' ').replace(/> </g, '><').trim();

  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}")`;
};

export default function InteractiveSolarBackground({
  baseOpacity = "0.15",
  glowOpacity = "0.7",
}: InteractiveSolarBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [hasMounted, setHasMounted] = useState(false);

  React.useEffect(() => {
    setHasMounted(true);

    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Optional optimization: Stop tracking if totally out of bounds to save renders
      // But keeping it tracking creates that smooth entry look.
      if (x < -500 || x > rect.width + 500 || y < -500 || y > rect.height + 500) {
        setMousePosition({ x: -1000, y: -1000 });
      } else {
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);
  
  const bgImageValue = useMemo(() => {
    if (!hasMounted) return "";
    return generateSolarPattern();
  }, [hasMounted]);

  if (!hasMounted) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Dynamic Style Injection for this specific instance */}
      <style dangerouslySetInnerHTML={{__html: `
        .dynamic-solar-bg {
          background-image: ${bgImageValue};
          background-size: 400px 300px;
          background-repeat: repeat;
          will-change: transform;
        }
      `}} />

      {/* Solar Panel Dark Base Grid */}
      <div 
        className="absolute inset-0 dynamic-solar-bg pointer-events-none mix-blend-overlay"
        style={{ opacity: Number(baseOpacity) }}
      />
      
      {/* Illuminated Solar Grid (Follows Cursor) */}
      <div 
        className="absolute inset-0 dynamic-solar-bg pointer-events-none transition-opacity duration-300"
        style={{
          opacity: Number(glowOpacity),
          WebkitMaskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
        }}
      />
      
      {/* Subtle Warm Sun Glare */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300 ease-out"
        style={{
          opacity: 0.35,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,180,0,0.15) 0%, transparent 80%)`
        }}
      />
    </div>
  );
}
