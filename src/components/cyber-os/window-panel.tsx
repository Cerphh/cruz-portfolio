"use client";

import React, { useRef, useState, useEffect } from "react";

interface WindowPanelProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: string | number; height: string | number };
  zIndex: number;
  onFocus: () => void;
  children: React.ReactNode;
}

export function WindowPanel({
  title,
  isOpen,
  onClose,
  onMinimize,
  defaultPosition = { x: 50, y: 80 },
  defaultSize = { width: 500, height: 400 },
  zIndex,
  onFocus,
  children,
}: WindowPanelProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizedPos, setPreMaximizedPos] = useState(defaultPosition);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  
  // Track size customized by user resize actions. If null, falls back to responsive defaultSize prop.
  const [customSize, setCustomSize] = useState<{ width: number; height: number } | null>(null);

  const windowRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const [prevDefaultPos, setPrevDefaultPos] = useState(defaultPosition);
  if (defaultPosition.x !== prevDefaultPos.x || defaultPosition.y !== prevDefaultPos.y) {
    setPrevDefaultPos(defaultPosition);
    setPosition(defaultPosition);
  }

  useEffect(() => {
    if (!isOpen || isMaximized) return;

    const handlePointerMove = (e: PointerEvent) => {
      const parent = windowRef.current?.parentElement;
      const maxW = parent ? parent.clientWidth : window.innerWidth;
      const maxH = parent ? parent.clientHeight : window.innerHeight;

      if (isDragging.current) {
        const newX = e.clientX - dragStart.current.x;
        const newY = e.clientY - dragStart.current.y;

        const boundMaxX = maxW - 100;
        const boundMaxY = maxH - 40;

        setPosition({
          x: Math.max(0, Math.min(newX, boundMaxX)),
          y: Math.max(0, Math.min(newY, boundMaxY)),
        });
      } else if (isResizing.current) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;

        const newW = resizeStart.current.w + deltaX;
        const newH = resizeStart.current.h + deltaY;

        setCustomSize({
          width: Math.max(320, Math.min(newW, maxW - position.x - 8)),
          height: Math.max(220, Math.min(newH, maxH - position.y - 8)),
        });
      }
    };

    const handlePointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        setDragging(false);
      }
      if (isResizing.current) {
        isResizing.current = false;
        setResizing(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isOpen, isMaximized, position.x, position.y]);

  if (!isOpen) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMaximized) return;
    onFocus();
    
    const target = e.target as HTMLElement;
    if (target.closest(".window-btn")) return;

    isDragging.current = true;
    setDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleResizeDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onFocus();

    // Determine current sizing context to anchor delta adjustments
    let startW = 500;
    let startH = 400;
    if (customSize) {
      startW = customSize.width;
      startH = customSize.height;
    } else if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      startW = rect.width;
      startH = rect.height;
    }

    isResizing.current = true;
    setResizing(true);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: startW,
      h: startH,
    };
  };

  const toggleMaximize = () => {
    onFocus();
    if (isMaximized) {
      setPosition(preMaximizedPos);
      setIsMaximized(false);
    } else {
      setPreMaximizedPos(position);
      setIsMaximized(true);
    }
  };

  // Determine active widths/heights
  const activeWidth = isMaximized 
    ? "100%" 
    : (customSize ? customSize.width : defaultSize.width);
    
  const activeHeight = isMaximized 
    ? "100%" 
    : (customSize ? customSize.height : defaultSize.height);

  return (
    <div
      ref={windowRef}
      onPointerDown={onFocus}
      style={{
        zIndex,
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: activeWidth,
        height: activeHeight,
        position: "absolute",
      }}
      className={`flex flex-col rounded-lg border bg-slate-950/75 backdrop-blur-md overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.15)] ${
        dragging || resizing ? "transition-none border-cyan-400" : "transition-colors duration-300 ease-out border-cyan-500/25 hover:border-cyan-400/40"
      } ${isMaximized ? "border-cyan-500/50" : ""}`}
    >
      {/* Title Bar / Drag Handle */}
      <div
        onPointerDown={handlePointerDown}
        className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-cyan-950/75 to-slate-900/75 border-b border-cyan-500/20 select-none cursor-move shrink-0"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider text-cyan-200 uppercase">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="window-btn h-4 w-4 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400 font-mono transition-colors"
              title="Minimize"
            >
              _
            </button>
          )}
          <button
            onClick={toggleMaximize}
            className="window-btn h-4 w-4 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400 font-mono transition-colors"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? "❐" : "⛶"}
          </button>
          <button
            onClick={onClose}
            className="window-btn h-4 w-4 rounded bg-rose-950 hover:bg-rose-900 border border-rose-500/30 flex items-center justify-center text-[10px] text-rose-300 font-mono transition-colors"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Cyber Panel Grid Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]" />

      {/* Window Body */}
      <div className="flex-1 overflow-auto p-4 md:p-6 text-slate-200 font-mono text-sm relative">
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          onPointerDown={handleResizeDown}
          className="absolute bottom-0 right-0 h-4.5 w-4.5 cursor-se-resize flex items-end justify-end p-0.5 z-50 select-none group"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            className="text-cyan-500/40 group-hover:text-cyan-400 transition-colors"
          >
            <path
              d="M10 0 L0 10 M10 4 L4 10 M10 8 L8 10"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
