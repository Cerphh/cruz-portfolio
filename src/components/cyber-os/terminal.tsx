"use client";

import React, { useState, useRef, useEffect } from "react";

interface TerminalProps {
  onOpenWindow?: (windowId: string) => void;
  onSelectProject?: (index: number) => void;
}

export function Terminal({ onOpenWindow, onSelectProject }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([
    "CRUZ-OS [Version 2.0.26]",
    "(c) 2026 Paul Oliver Cruz Corporation. All telemetry active.",
    "",
    "Type 'help' to initialize list of available mainframe parameters.",
    "",
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [...history, `guest@cruz-os:~$ ${trimmed}`];

    switch (command) {
      case "help":
        newHistory.push(
          "Available system parameters:",
          "  about      - Execute bio core overview",
          "  projects   - Query active product builds",
          "  skills     - Map technologist capabilities",
          "  contact    - Retrieve communication channels",
          "  clear      - Wipe console buffer",
          "  sysinfo    - Run mainframe diagnostics"
        );
        break;

      case "about":
        newHistory.push(
          "BIO DATA: Paul Oliver Cruz",
          "ROLE: Frontend Developer & Product Engineer",
          "LOC: Batangas, PH",
          "---",
          "I build high-fidelity interactive digital experiences.",
          "Focused on React, Next.js, and WebGL to deliver product value.",
          "Opening biographical module..."
        );
        if (onOpenWindow) onOpenWindow("about");
        break;

      case "projects":
        if (args[0] === "open" && args[1]) {
          const index = parseInt(args[1], 10) - 1;
          if (index >= 0 && index < 5) {
            newHistory.push(`Opening Project ${args[1]}...`);
            if (onOpenWindow) onOpenWindow("works");
            if (onSelectProject) onSelectProject(index);
          } else {
            newHistory.push("Error: Invalid project index. Choose 1 to 5.");
          }
        } else {
          newHistory.push(
            "ACTIVE PRODUCT BUILDS:",
            "  1. HotBook      - Hotel Booking System [Firebase/Next.js/AI recommendations]",
            "  2. Tanaw        - SDG Promotion Social Feed [Supabase/Next.js]",
            "  3. Gute Gelenke - Physio Clinic Conversion Site [Webflow/UX]",
            "  4. NEXUS        - Modern Business Web Agency [Next.js/GSAP]",
            "  5. Lumiere      - Salon Booking Webapp [Supabase/Next.js/Framer]",
            "",
            "Tip: Type 'projects open <index>' to inspect (e.g. 'projects open 1')"
          );
        }
        break;

      case "skills":
        newHistory.push(
          "MAIN DECK STACK MAPPING:",
          "  React/Next.js   [====================] 95%",
          "  TypeScript/JS   [==================  ] 90%",
          "  GSAP/Framer     [=================   ] 85%",
          "  Tailwind CSS    [====================] 98%",
          "  Supabase/FB     [===============     ] 75%",
          "  Three.js/WebGL  [=============       ] 65%"
        );
        break;

      case "contact":
        newHistory.push("Locating comm channels... opening comm port.");
        if (onOpenWindow) onOpenWindow("contact");
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "sysinfo":
        newHistory.push(
          "SYSTEM STATUS: ONLINE",
          `LOCAL TIME: ${new Date().toLocaleTimeString()}`,
          "CPU LOAD: 2.14% (Optimized)",
          "MEMORY METRIC: 32MB / 512MB Virtual Matrix Alloc",
          "HOSTING NODE: Vercel Production Server",
          "ENCRYPTION KEY: ACTIVE"
        );
        break;

      default:
        newHistory.push(`OS: command not found: '${command}'. Type 'help' for active commands.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/90 font-mono text-emerald-400 text-xs md:text-sm p-2 rounded border border-emerald-500/20 shadow-inner">
      <div className="flex-1 overflow-y-auto space-y-1 mb-2 pr-1 custom-scrollbar">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed min-h-[1.2rem]">
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-1 border-t border-emerald-500/20 pt-2 shrink-0">
        <span className="text-emerald-500 font-semibold select-none">guest@cruz-os:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-emerald-300 outline-none border-none font-mono caret-emerald-400"
          autoFocus
        />
      </div>
    </div>
  );
}
