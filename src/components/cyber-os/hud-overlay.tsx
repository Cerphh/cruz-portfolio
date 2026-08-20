"use client";

import { useEffect, useState } from "react";

interface HudOverlayProps {
  activeWindows: { [key: string]: boolean };
  onToggleWindow: (id: string) => void;
  focusedWindow: string | null;
}

export function HudOverlay({ activeWindows, onToggleWindow, focusedWindow }: HudOverlayProps) {
  const [time, setTime] = useState("");
  const [cpu, setCpu] = useState(1.4);
  const [ram, setRam] = useState(38);
  const [ping, setPing] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);

    const metricsTimer = setInterval(() => {
      setCpu(parseFloat((Math.random() * 3 + 1.2).toFixed(1)));
      setRam(Math.floor(Math.random() * 4 + 36));
      setPing(Math.floor(Math.random() * 10 + 18));
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(metricsTimer);
    };
  }, []);

  const menuItems = [
    { id: "about", label: "01 // BIO.SYS", desc: "Biographical Core" },
    { id: "works", label: "02 // WORK.SYS", desc: "Product Database" },
    { id: "terminal", label: "03 // TERM.EXE", desc: "Command Terminal" },
    { id: "contact", label: "04 // COMM.COM", desc: "Communication Deck" },
  ];

  return (
    <div className="flex flex-col gap-6 text-cyan-300 font-mono text-xs select-none">
      {/* Top Banner / Time */}
      <div className="border border-cyan-500/20 bg-slate-950/60 p-4 rounded-lg flex flex-col gap-2">
        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2">
          <h2 className="text-[11px] font-bold tracking-widest text-cyan-100">CRUZ_PORTAL_v2.0</h2>
          <span className="text-[8px] text-emerald-400 bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-500/20 animate-pulse font-bold">
            ONLINE
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] text-cyan-500 uppercase">LOC // BATANGAS, PH</p>
            <p className="text-[9px] text-cyan-500 uppercase">PING // {ping}ms</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold tracking-wider text-cyan-200 leading-none">{time || "00:00:00"}</p>
          </div>
        </div>
      </div>

      {/* Dock / Nav Control Panel */}
      <div className="border border-cyan-500/20 bg-slate-950/60 p-4 rounded-lg flex flex-col gap-3">
        <span className="text-[10px] text-cyan-500 uppercase tracking-widest border-b border-cyan-500/20 pb-1.5 font-bold">
          SYSTEM FILES
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2">
          {menuItems.map((item) => {
            const isOpen = activeWindows[item.id];
            const isFocused = focusedWindow === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onToggleWindow(item.id)}
                className={`flex flex-col text-left p-2 rounded.md border transition-all duration-200 ${
                  isOpen
                    ? isFocused
                      ? "bg-cyan-500/15 border-cyan-400 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                      : "bg-cyan-950/30 border-cyan-500/40 text-cyan-300"
                    : "border-slate-800 bg-slate-900/25 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-300"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold">{item.label}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isOpen ? "bg-cyan-400 animate-pulse" : "bg-slate-700"
                    }`}
                  />
                </div>
                <span className="text-[9px] text-slate-500 mt-1">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mainframe Performance HUD */}
      <div className="border border-cyan-500/20 bg-slate-950/60 p-4 rounded-lg flex flex-col gap-3">
        <span className="text-[10px] text-cyan-500 uppercase tracking-widest border-b border-cyan-500/20 pb-1.5 font-bold">
          TELEMETRY INDEX
        </span>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span>CPU LOAD</span>
              <span className="text-cyan-200">{cpu}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${Math.min(cpu * 10, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>V-RAM</span>
              <span className="text-cyan-200">{ram}MB / 512MB</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded overflow-hidden">
              <div
                className="h-full bg-teal-400 transition-all duration-300"
                style={{ width: `${(ram / 512) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Small Matrix code flow grid */}
        <div className="h-14 border border-cyan-500/10 rounded bg-slate-950/90 font-mono text-[9px] text-emerald-500/40 p-2 overflow-hidden flex flex-wrap content-start leading-tight">
          {Array.from({ length: 60 }).map((_, i) => (
            <span key={i} className={i % 7 === 0 ? "text-emerald-400/90" : ""}>
              {(i * 7 + 3) % 2}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
