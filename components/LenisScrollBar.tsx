"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { onScrollProgress, scrollTo } from "./lenis-bus";

const W = 14;
const P = 3;
const THUMB_W = W - P * 2;

export default function LenisScrollBar() {
  const [gutterVisible, setGutterVisible] = useState(false);
  const [ratio, setRatio] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const dragState = useRef({ startY: 0, startProgress: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const [thumbH, setThumbH] = useState(100);

  // Compute thumb height
  const measure = useCallback(() => {
    if (typeof window === "undefined") return;
    const vh = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    
    let h = vh * (vh / docH);
    h = Math.max(30, Math.min(200, h));
    
    // if docH <= vh, we don't need scrollbar
    if (docH <= vh) {
      h = 0; 
    }
    
    setThumbH(h);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    // Observe DOM changes for dynamically added elements (like pinned sections) causing height changes
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [measure]);

  // Sync scroll from bus + DOM fallback via rAF
  useEffect(() => {
    const unsub = onScrollProgress((scroll, limit) => {
      if (limit > 0) {
        setRatio(scroll / limit);
      }
    });

    let rafId: number;
    const updateDOMFallback = () => {
      const vh = window.innerHeight;
      const sh = document.documentElement.scrollHeight;
      const maxScroll = sh - vh;
      if (maxScroll > 0) {
        setRatio(window.scrollY / maxScroll);
      }
      rafId = requestAnimationFrame(updateDOMFallback);
    };
    rafId = requestAnimationFrame(updateDOMFallback);

    return () => {
      unsub();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Drag logic
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setGutterVisible(true);
    dragState.current = {
      startY: e.clientY,
      startProgress: ratio,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const vh = window.innerHeight;
      const maxTrack = vh - thumbH;
      if (maxTrack <= 0) return;

      const deltaY = e.clientY - dragState.current.startY;
      const deltaRatio = deltaY / maxTrack;
      let newRatio = dragState.current.startProgress + deltaRatio;
      newRatio = Math.max(0, Math.min(1, newRatio));

      const sh = document.documentElement.scrollHeight;
      const maxScroll = sh - vh;

      scrollTo(newRatio * maxScroll, true);
      setRatio(newRatio);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      // Wait for next events to decide if we should hide gutter
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, ratio, thumbH]);

  const handlePointerEnter = () => setGutterVisible(true);
  const handlePointerLeave = () => {
    if (!isDragging) setGutterVisible(false);
  };

  const onTrackClick = (e: React.MouseEvent) => {
    if (e.target !== wrapperRef.current && (e.target as HTMLElement).className !== "gutter") return;
    const vh = window.innerHeight;
    const clickY = e.clientY;
    const maxTrack = vh - thumbH;
    let newRatio = (clickY - thumbH / 2) / maxTrack;
    newRatio = Math.max(0, Math.min(1, newRatio));

    const sh = document.documentElement.scrollHeight;
    const maxScroll = sh - vh;
    scrollTo(newRatio * maxScroll, false);
  };

  if (thumbH === 0) return null;

  const maxThumbTop = typeof window !== "undefined" ? window.innerHeight - thumbH : 0;
  const thumbTop = Math.max(0, Math.min(maxThumbTop, ratio * maxThumbTop));

  return (
    <div
      ref={wrapperRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onMouseDown={onTrackClick}
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: `${W}px`,
        height: "100lvh",
        zIndex: 999999,
        pointerEvents: "auto",
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {/* Gutter */}
      <div
        className="gutter"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 255, 255, 0.05)",
          borderLeft: "1px solid rgba(217, 217, 217, 0.1)",
          opacity: gutterVisible || isDragging ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      
      {/* Thumb Hitbox */}
      <div
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          width: `${W}px`,
          top: `${thumbTop}px`,
          height: `${thumbH}px`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {/* Visible Thumb */}
        <div
          style={{
            position: "absolute",
            left: `${P}px`,
            width: `${THUMB_W}px`,
            height: "100%",
            background: "#1a1a1a",
            borderRadius: "999px",
            border: "1px solid rgba(255,77,0, 0.3)"
          }}
        />
      </div>
    </div>
  );
}
