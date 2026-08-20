"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CyberBackdrop } from "./cyber-backdrop";
import { WindowPanel } from "./window-panel";
import { Terminal } from "./terminal";
import { HudOverlay } from "./hud-overlay";

interface Project {
  label: string;
  title: string;
  summary: string;
  image: string;
  details: readonly string[];
  stack: string;
  highlights: readonly string[];
  tags: readonly string[];
  accent: string;
  link?: string;
}

const projects: Project[] = [
  {
    label: "01 / Music",
    title: "Reveria - Concert Archive & Memories",
    summary: "Letterboxd for live music—a private-by-default, memories-first archive featuring group memories, invite codes, and rich media sharing.",
    image: "/projects/reveria.png",
    details: [
      "Reveria serves as a 'Letterboxd for live music'—a private-by-default, memories-first concert archive designed to focus on personal nostalgia and group experiences rather than public databases.",
      "The app features group memory integration: 7-day-expiry invite links, group IDs on shows, a dedicated show invites table using 8-character codes, and Supabase Row-Level Security (RLS) rules that allow media sharing within group show logs while keeping personal ratings and notes strictly private.",
      "Built using Next.js 16 (App Router), Supabase (Postgres, Auth, Storage), Tailwind, and GSAP. It integrates the Setlist.fm and Ticketmaster Discovery APIs cached server-side (with 12-hour expiration) to split show creation into separate search and upload forms.",
      "Successfully resolved key development challenges including unconfigured image hostnames, production OAuth redirects, Vercel deployment protections blocking incognito invite link tests, and timezone-related invite expiry bugs."
    ],
    stack: "Next.js 16, Supabase, GSAP, Setlist.fm & Ticketmaster API",
    highlights: [
      "Private-by-default group memory invite mechanics & RLS security rules",
      "Robust upload guardrails (8MB photo / 25MB video limit & 75MB user quota)"
    ],
    tags: ["Music", "Next.js", "Supabase"],
    accent: "from-rose-500/20 via-pink-500/10 to-transparent",
    link: "https://reveria-xi.vercel.app",
  },
  {
    label: "02 / Product",
    title: "HotBook - Hotel Booking System",
    summary: "Full-stack booking app with AI-powered nearby recommendations and reliability-focused fallbacks.",
    image: "/projects/hotbook.png",
    details: [
      "HotBook is a full-stack hotel booking application built to make travel planning feel effortless, going beyond a typical listing site to actually help guests discover what is around them. The goal was simple but ambitious: turn booking a hotel into the start of planning a trip, not just reserving a room.",
      "I built the entire booking flow using Next.js for the frontend and Firebase for real-time data management, allowing users to browse hotels, check live availability, and complete bookings through a clean, intuitive dashboard. Authentication and booking status are handled in real time through Firestore, so users always see accurate, up-to-date information.",
      "The standout feature is the AI-powered nearby recommendation system. Once a guest selects a hotel, the app suggests nearby restaurants and attractions using a multi-layered AI pipeline: a local Mistral model running through Ollama as the primary source, OpenAI as a fallback if Ollama is unavailable, and real OpenStreetMap location data as a final safeguard if both AI services fail. Each recommendation includes walking distance, estimated travel time, and an interactive map for easy navigation.",
      "This project taught me a lot about designing for reliability - making sure a feature never fully breaks, even when one part of a complex system does not respond as expected. The result is a booking experience that feels more personalized, trustworthy, and complete than a standard hotel listing platform."
    ],
    stack: "Next.js, Firebase, Tailwind CSS, Leaflet, Ollama, OpenAI API",
    highlights: ["Firestore real-time sync", "AI recommendation pipeline with fallback layers"],
    tags: ["Booking", "AI", "Maps"],
    accent: "from-cyan-400/20 via-sky-500/10 to-transparent",
    link: "https://hotel-booking-app-pearl-gamma.vercel.app",
  },
  {
    label: "03 / Social",
    title: "Tanaw - SDG Promotion Social App",
    summary: "Purpose-driven social platform making SDG content engaging through feed-based interaction.",
    image: "/projects/tanaw.png",
    details: [
      "Tanaw is a social media platform built to promote Sustainable Development Goals (SDGs) in a way that feels social and engaging, not just informational. With so much content competing for attention online, the goal was to give SDG awareness a home where users could genuinely connect with the cause through everyday interaction - posts, blogs, and community engagement - rather than passive reading.",
      "I developed the platform using Next.js and Tailwind CSS for a clean, responsive frontend, with Supabase handling backend data, authentication, and real-time updates. The interface is built around familiar social media patterns - profiles, feeds, and engagement features - so users can intuitively interact with SDG-related content the same way they would with any platform they already use daily.",
      "A key focus throughout development was accessibility and clarity: presenting the 17 SDGs in a way that feels approachable rather than academic, encouraging users to explore, post, and share without friction.",
      "This project reflects my interest in using technology for purpose-driven impact - proving that meaningful causes can have the same polish, usability, and engagement as mainstream platforms."
    ],
    stack: "Next.js, Tailwind CSS, Supabase",
    highlights: ["Social feed discoverability patterns", "Supabase real-time updates"],
    tags: ["Community", "Supabase", "UX"],
    accent: "from-fuchsia-400/20 via-violet-500/10 to-transparent",
    link: "https://github.com/DanielleZiac/TANAW",
  },
  {
    label: "04 / Client",
    title: "Gute Gelenke - Health Hub",
    summary: "Webflow conversion-focused clinic website for a German physiotherapy center.",
    image: "/projects/gutegelenke.png",
    details: [
      "Gutegelenke is a full website I built from scratch in Webflow for a physiotherapy clinic based in Germany. The clinic needed a professional, trustworthy online presence that would clearly communicate their services while making it easy for patients to get in touch or book appointments - all while remaining simple enough for their non-technical staff to manage going forward.",
      "I designed and built the entire site structure in Webflow, translating the clinic's branding into a clean, calming layout appropriate for a healthcare setting. The site includes integrated booking and contact forms, allowing potential patients to reach out or request appointments directly through the website, reducing friction between a visitor and an actual consultation.",
      "Working with a German-based client also meant being precise about content structure and ensuring the site felt professional and credible - qualities that matter especially in healthcare, where trust plays a major role in conversion. Throughout the project, I maintained close communication with the client, incorporating feedback and revisions to make sure the final result matched their vision while staying functional and easy to maintain long after launch.",
      "This project highlights my ability to take full ownership of a client site from concept to launch, balancing design, usability, and real business needs like appointment generation."
    ],
    stack: "Webflow, UX, Localization",
    highlights: ["Medical trust layouts", "High conversion forms"],
    tags: ["Healthcare UX", "Webflow"],
    accent: "from-emerald-400/20 via-teal-500/10 to-transparent",
    link: "https://www.gutegelenke.de",
  },
  {
    label: "05 / Agency",
    title: "NEXUS - Modern Web Agency",
    summary: "Business landing page and portfolio interface for a creative web agency.",
    image: "/projects/nexus.png",
    details: [
      "NEXUS is a full-stack business landing page and portfolio website built for a modern creative web development agency, designed to highlight their services, portfolio, and technical expertise to incoming leads.",
      "I led the design and development of the entire site from scratch using Next.js, Tailwind CSS, and GSAP. The architecture is component-based, allowing for fast load times, modular scalability, and high performance on both mobile and desktop views.",
      "I integrated a dynamic project showcase featuring fluid hover states, interactive card animations, and smooth GSAP-driven transitions. A contact form connected to automated email notifications ensures the agency can instantly capture and log prospective customer inquiries.",
      "The final product acts as the primary acquisition channel for the agency, pairing a high-end visual aesthetic with fast performance scores, proving that a creative design can be matched with a highly optimized codebase."
    ],
    stack: "Next.js, Tailwind CSS, GSAP",
    highlights: ["Smooth hover states", "Modern grid transitions"],
    tags: ["Business", "Interactions"],
    accent: "from-blue-400/20 via-indigo-500/10 to-transparent",
    link: "https://nexuscreatives.dev",
  },
  {
    label: "06 / Service",
    title: "Lumiere - Hair Salon Booking",
    summary: "Salon scheduling platform with user booking flow and staff admin dashboard.",
    image: "/projects/lumiere.png",
    details: [
      "Lumiere is a full-stack booking website and administrative scheduling dashboard built for a hair salon, designed to streamline appointment management for both clients and salon staff.",
      "I developed the application using Next.js for the frontend, Tailwind CSS, and Supabase for the backend. Supabase handles database storage, real-time booking streams, secure authentication, and rate limiting to prevent spam bookings.",
      "The booking system features a dynamic calendar slot allocation algorithm, showing clients available time slots in real time. It also features a secure administrative dashboard where salon staff can view calendars, manage bookings, allocate styling staff, and view client histories.",
      "Building this platform taught me how to manage state synchronizations in real time, build dynamic calendars, and handle edge-cases like overlapping appointments or double-booking, resulting in a robust, professional booking experience."
    ],
    stack: "Next.js, Supabase, Framer Motion",
    highlights: ["Dynamic calendar slot allocation", "Secure admin management interface"],
    tags: ["Dashboard", "Scheduling"],
    accent: "from-amber-400/20 via-orange-500/10 to-transparent",
    link: "https://booking-system-template-kohl.vercel.app",
  },
];

interface CyberDesktopProps {
  defaultActiveWorks?: boolean;
}

export function CyberDesktop({ defaultActiveWorks = false }: CyberDesktopProps) {
  const [isBooted, setIsBooted] = useState(false);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<string | null>(
    defaultActiveWorks ? "works" : "about"
  );
  const [activeWindows, setActiveWindows] = useState<{ [key: string]: boolean }>({
    about: !defaultActiveWorks,
    works: defaultActiveWorks,
    terminal: true,
    contact: false,
  });

  // Initialize with large defaults so first render is never tiny
  const defaultPos = { x: 12, y: 12 };
  const defaultFullSize = { width: "calc(100% - 24px)", height: "calc(100% - 24px)" };

  const [windowPositions] = useState<{ [key: string]: { x: number; y: number } }>({
    about: defaultPos,
    works: defaultPos,
    contact: defaultPos,
  });
  const [windowSizes] = useState<{ [key: string]: { width: string | number; height: string | number } }>({
    about: defaultFullSize,
    works: defaultFullSize,
    terminal: { width: "calc(100% - 24px)", height: 320 },
    contact: defaultFullSize,
  });
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);

  // Z-Index stack
  const [zIndices, setZIndices] = useState<{ [key: string]: number }>({
    about: 10,
    works: 5,
    terminal: 8,
    contact: 3,
  });

  const bringToFront = (windowId: string) => {
    setFocusedWindow(windowId);
    setZIndices((prev) => {
      const maxZ = Math.max(...Object.values(prev)) + 1;
      return { ...prev, [windowId]: maxZ };
    });
  };

  const toggleWindow = (windowId: string) => {
    setActiveWindows((prev) => {
      const isOpen = !prev[windowId];
      if (isOpen) {
        setTimeout(() => bringToFront(windowId), 50);
      }
      return { ...prev, [windowId]: isOpen };
    });
  };

  const openWindow = (windowId: string) => {
    setActiveWindows((prev) => ({ ...prev, [windowId]: true }));
    setTimeout(() => bringToFront(windowId), 50);
  };

  // Diagnostic system boot simulation
  useEffect(() => {
    const bootSequences = [
      "CRUZ SYSTEM DIAGNOSTICS INIT...",
      "LOADING KERNEL MODULES [OK]",
      "LOCATING PHYSICAL TARGET: BATANGAS PH [OK]",
      "ESTABLISHING HOST CONNECTION (VERCEL EDGE NETWORK)",
      "INJECTING GRAPHICS BUFFER (WEBGL BACKDROP ENABLED)",
      "CONSTRUCTING HOLOGRAM ENGINE GRID",
      "MOUNTING BIO DATA CORE // ABOUT.SYS",
      "PARSING SOURCE CODE DATABASE // WORKS.SYS",
      "CRUZ-OS 2.0 SUCCESSFULLY BOOTED.",
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < bootSequences.length) {
        setBootLog((prev) => [...prev, bootSequences[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooted(true), 600);
      }
    }, 180);

    return () => clearInterval(interval);
  }, []);

  if (!isBooted) {
    return (
      <main className="min-h-screen bg-[#040610] text-[#00ffcc] font-mono flex flex-col items-center justify-center p-6 text-sm">
        <div className="max-w-md w-full border border-[#00ffcc]/30 bg-black/75 p-6 rounded-lg shadow-[0_0_30px_rgba(0,255,204,0.15)] flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#00ffcc]/20 pb-3">
            <span className="animate-pulse">▶ TESTING HARDWARE...</span>
            <span>BATANGAS, PH</span>
          </div>
          <div className="space-y-1.5 h-64 overflow-y-auto custom-scrollbar leading-relaxed">
            {bootLog.map((line, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-[#00ffcc]/50">[{idx}]</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-[#00ffcc]/10 h-1.5 rounded overflow-hidden">
            <div
              className="bg-[#00ffcc] h-full transition-all duration-300 ease-out"
              style={{ width: `${(bootLog.length / 9) * 100}%` }}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-[#060816] text-[#e2e8f0] overflow-hidden select-none">
      <CyberBackdrop />

      {/* Cyber OS Top Status Bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] h-11 bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/25 flex items-center justify-between px-6 font-mono text-xs text-cyan-400">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-widest text-cyan-200">CRUZ-OS 2.0</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="hidden sm:inline text-cyan-500">SYS_LINK // STABLE</span>
        </div>
        <div className="flex items-center gap-4 text-cyan-300/80">
          <span className="hidden md:inline">SYSTEM TEMP: NORMAL</span>
          <span className="text-cyan-200">LATENCY: 24ms</span>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="pt-11 min-h-screen w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] relative">
        {/* Left Side Telemetry Dashboard */}
        <aside className="border-r border-cyan-500/15 p-6 bg-slate-950/40 relative z-[90] lg:h-[calc(100vh-44px)] lg:overflow-y-auto">
          <HudOverlay
            activeWindows={activeWindows}
            onToggleWindow={toggleWindow}
            focusedWindow={focusedWindow}
          />
        </aside>        {/* Right workspace container split into Upper (Desktop) and Lower (Terminal Panel) */}
        <div className="flex flex-col h-[calc(100vh-44px)] relative overflow-hidden">
          
          {/* Upper Desktop area for floating draggable windows */}
          <div className="flex-1 relative overflow-hidden">
            
            {/* WINDOW 1: BIOGRAPHY MODULE (ABOUT) */}
            <WindowPanel
              title="Bio Core // ABOUT.SYS"
              isOpen={activeWindows.about}
              onClose={() => toggleWindow("about")}
              zIndex={zIndices.about}
              onFocus={() => bringToFront("about")}
              defaultPosition={windowPositions.about}
              defaultSize={windowSizes.about}
            >
              <div className="grid gap-6 md:grid-cols-[240px_1fr] items-start">
                <div className="relative mx-auto overflow-hidden rounded-xl border border-cyan-400/30 p-1.5 bg-cyan-950/20 max-w-[240px]">
                  <Image
                    src="/paul.png"
                    alt="Paul Oliver E. Cruz Portrait"
                    width={230}
                    height={290}
                    className="rounded-lg object-cover grayscale brightness-95 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-cyan-300 border border-cyan-500/20 whitespace-nowrap">
                    PAUL OLIVER E. CRUZ
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-300">SYSTEM PROFILE</h3>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Web Developer // Front-end Developer</p>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                    I construct robust, accessible web applications by combining clean system architecture with fluid visual interactions. I focus on end-to-end development, pixel-accurate UI layouts, and user-centric features.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 pt-2 font-mono text-xs border-t border-cyan-500/10">
                    <div className="space-y-2">
                      <h4 className="text-cyan-400 font-bold tracking-wider uppercase text-[10px]">EXPERIENCE</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-cyan-100 font-semibold">
                            <span>CAIST // FRONT-END DEVEL.</span>
                            <span className="text-[10px] text-slate-500">2025</span>
                          </div>
                          <p className="text-slate-400 text-[10px] mt-0.5">Implemented pixel-accurate interfaces using Laravel, Livewire, and Filament in an AI research center environment.</p>
                        </div>
                        <div>
                          <div className="flex justify-between text-cyan-100 font-semibold">
                            <span>FREELANCE // WEBFLOW</span>
                            <span className="text-[10px] text-slate-500">2026-PRES</span>
                          </div>
                          <p className="text-slate-400 text-[10px] mt-0.5">Designed and built responsive, client-ready websites, managing communications and revisions end-to-end.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-cyan-400 font-bold tracking-wider uppercase text-[10px]">EDUCATION</h4>
                      <div>
                        <div className="flex justify-between text-cyan-100 font-semibold">
                          <span>BATANGAS STATE UNIV.</span>
                          <span className="text-[10px] text-slate-500">2022-2026</span>
                        </div>
                        <p className="text-cyan-300 text-[10px]">BS Computer Science</p>
                        <p className="text-slate-400 text-[10px] mt-1 font-sans">Thesis: Benchmarked prompt optimization frameworks for enhancing LLM mathematical problem-solving performance.</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-cyan-500/10 pt-3 font-mono text-xs">
                    <h4 className="text-cyan-400 font-bold tracking-wider uppercase text-[10px] mb-2">COURSES & CREDENTIALS</h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-slate-400">
                      <div>
                        <div className="flex justify-between text-cyan-100 font-semibold">
                          <span>AWS ACADEMY // ML FOUNDATIONS</span>
                          <span className="text-[10px] text-slate-500">2025</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">Machine Learning Foundations Training</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-cyan-100 font-semibold">
                          <span>CISCO ACADEMY // CCNAv7</span>
                          <span className="text-[10px] text-slate-500">2024</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">Introduction to Networks (CCNAv7)</p>
                      </div>
                      <div className="sm:col-span-2 border-t border-cyan-500/5 pt-2">
                        <div className="flex justify-between text-cyan-100 font-semibold">
                          <span>SIMPLILEARN // WEB DEVELOPMENT</span>
                          <span className="text-[10px] text-slate-500">2026</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">Completed Webflow Course, Build Website With AI, and Learn WordPress certifications.</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-cyan-500/10 pt-3">
                    <h4 className="text-cyan-400 font-bold tracking-wider uppercase text-[10px] font-mono mb-2">TECHNICAL INDEX</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["HTML", "CSS", "JavaScript", "Python", "PHP", "React", "Next.js", "Laravel", "Tailwind", "Supabase", "Firebase", "Webflow", "Git", "Vercel"].map((tag) => (
                        <span key={tag} className="border border-cyan-500/15 bg-cyan-950/20 px-2 py-0.5 rounded text-[10px] text-cyan-300 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </WindowPanel>

            {/* WINDOW 2: PROJECT DATABASE MODULE (WORKS) */}
            <WindowPanel
              title="Projects DB // WORKS.SYS"
              isOpen={activeWindows.works}
              onClose={() => toggleWindow("works")}
              zIndex={zIndices.works}
              onFocus={() => bringToFront("works")}
              defaultPosition={windowPositions.works}
              defaultSize={windowSizes.works}
            >
              <div className="flex flex-col gap-4 h-full">
                {/* Project Index list at the top (larger horizontal tabs) */}
                <div className="flex gap-2.5 pb-3 overflow-x-auto shrink-0 border-b border-cyan-500/10 custom-scrollbar">
                  {projects.map((proj, idx) => (
                    <button
                      key={proj.title}
                      onClick={() => setSelectedProjectIndex(idx)}
                      className={`text-left px-4 py-3 rounded-lg border font-mono text-sm transition-all shrink-0 min-w-[170px] cursor-pointer hover:bg-cyan-500/5 ${
                        selectedProjectIndex === idx
                          ? "bg-cyan-500/15 border-cyan-400 text-cyan-100 shadow-[0_0_8px_rgba(34,211,238,0.15)]"
                          : "border-cyan-500/5 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:border-cyan-500/20"
                      }`}
                    >
                      <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider mb-0.5">{proj.label.split(" / ")[0]}</div>
                      <div className="font-semibold truncate text-xs md:text-sm">{proj.title.split(" - ")[0]}</div>
                    </button>
                  ))}
                </div>

                {/* Selected project details (Full Width Split Layout matching image.png) */}
                <div className="flex-1 overflow-y-auto pr-1 mt-2">
                  {(() => {
                    const p = projects[selectedProjectIndex];
                    return (
                      <div className="grid gap-6 md:grid-cols-[1.1fr_1.2fr] items-start">
                        
                        {/* Left Column: Image, Tech Stack, Highlights */}
                        <div className="space-y-4">
                          {/* Image preview (large aspect frame) */}
                          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-cyan-500/30 bg-slate-950 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.5)] shrink-0">
                            {/* Mock App Header */}
                            <div className="flex items-center justify-between px-2.5 py-1 bg-slate-900 border-b border-cyan-500/10 select-none text-[8px] font-mono text-cyan-500/60 shrink-0">
                              <span>PREVIEW_FRAME // LIVE_RENDER</span>
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            </div>
                            {/* Image body */}
                            <div className="relative flex-1 bg-slate-900 overflow-hidden">
                              <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                className="object-contain opacity-90 hover:opacity-100 transition-opacity p-1"
                                priority
                              />
                            </div>
                          </div>

                          {/* Tech Stack card */}
                          <div className="border border-cyan-500/20 rounded-lg p-4 bg-cyan-950/10 space-y-2 text-xs">
                            <h5 className="font-semibold text-cyan-400 uppercase tracking-widest text-[9px] border-b border-cyan-500/10 pb-1">
                              TECH STACK
                            </h5>
                            <p className="text-slate-300 font-mono leading-relaxed">{p.stack}</p>
                          </div>

                          {/* Project Highlights card */}
                          <div className="border border-cyan-500/20 rounded-lg p-4 bg-cyan-950/10 space-y-2 text-xs">
                            <h5 className="font-semibold text-teal-400 uppercase tracking-widest text-[9px] border-b border-cyan-500/10 pb-1">
                              PROJECT HIGHLIGHTS
                            </h5>
                            <ul className="list-disc pl-4 space-y-1.5 text-slate-300 leading-relaxed">
                              {p.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Right Column: Detailed Overview Text */}
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-cyan-500/10 pb-2.5">
                            <div className="space-y-1">
                              <h4 className="text-base font-bold text-cyan-300">{p.title}</h4>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] text-teal-400">{p.stack.split(",").slice(0, 3).join(",")}...</span>
                                {p.link && (
                                  <a
                                    href={p.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[9px] text-cyan-400 hover:text-cyan-200 border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded font-mono transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    LAUNCH_SYS ↗
                                  </a>
                                )}
                              </div>
                            </div>
                            <span className="text-[10px] uppercase bg-cyan-950 px-2 py-0.5 border border-cyan-500/20 text-cyan-300 shrink-0">
                              {p.label.split(" / ")[1]}
                            </span>
                          </div>
                          
                          <div className="border-b border-cyan-500/10 pb-1.5">
                            <h5 className="font-bold text-cyan-200 uppercase tracking-widest text-[10px]">
                              DETAILED OVERVIEW
                            </h5>
                          </div>

                          <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                            <p className="font-semibold text-cyan-100/90 font-mono text-xs">{p.summary}</p>
                            {p.details.map((par, i) => (
                              <p key={i}>{par}</p>
                            ))}
                          </div>
                        </div>

                      </div>
                    );
                  })()}
                </div>
              </div>
            </WindowPanel>

            {/* WINDOW 4: COMMUNICATIONS DECK (CONTACT) */}
            <WindowPanel
              title="Comm Deck // COMM.COM"
              isOpen={activeWindows.contact}
              onClose={() => toggleWindow("contact")}
              zIndex={zIndices.contact}
              onFocus={() => bringToFront("contact")}
              defaultPosition={windowPositions.contact}
              defaultSize={windowSizes.contact}
            >
              <div className="space-y-4 font-mono text-xs md:text-sm">
                <h3 className="text-base font-bold text-cyan-300">INBOUND COMM PORTS</h3>
                <p className="text-slate-400">Connect to Paul Oliver E. Cruz&apos;s Batangas PH server node via channels below:</p>
                
                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href="mailto:cruzpauloliver@gmail.com"
                    className="flex flex-col p-3 rounded-lg border border-cyan-500/10 hover:border-cyan-400/40 bg-cyan-950/20 transition-all hover:translate-y-[-2px]"
                  >
                    <span className="text-[10px] text-cyan-500">MAIL.GMAIL</span>
                    <span className="font-semibold text-cyan-300 truncate">cruzpauloliver@gmail.com</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/paulolivercruz"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col p-3 rounded-lg border border-cyan-500/10 hover:border-cyan-400/40 bg-cyan-950/20 transition-all hover:translate-y-[-2px]"
                  >
                    <span className="text-[10px] text-cyan-500">LINK.LINKEDIN</span>
                    <span className="font-semibold text-cyan-300 truncate">linkedin.com/in/paulolivercruz</span>
                  </a>
                  <a
                    href="https://github.com/cerphh"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col p-3 rounded-lg border border-cyan-500/10 hover:border-cyan-400/40 bg-cyan-950/20 transition-all hover:translate-y-[-2px]"
                  >
                    <span className="text-[10px] text-cyan-500">NET.GITHUB</span>
                    <span className="font-semibold text-cyan-300 truncate">github.com/cerphh</span>
                  </a>
                  <div className="flex flex-col p-3 rounded-lg border border-cyan-500/10 bg-cyan-950/10">
                    <span className="text-[10px] text-cyan-500">PH.TEL</span>
                    <span className="font-semibold text-slate-300 truncate">(+63) 992 629 6059</span>
                  </div>
                </div>

                <div className="border border-cyan-500/10 bg-cyan-950/10 rounded-lg p-3 text-xs text-cyan-400 flex items-center justify-between">
                  <span>AVAILABILITY:Selective freelance & remote junior frontend roles</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-2" />
                </div>
              </div>
            </WindowPanel>

          </div>

          {/* LOWER ANCHORED TERMINAL PANE (VS Code Style) */}
          {activeWindows.terminal && (
            <div className="h-60 border-t border-cyan-500/25 bg-black/90 flex flex-col z-[80] shrink-0 font-mono text-xs">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900 border-b border-cyan-500/10 text-cyan-400 select-none">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>TERMINAL // TERM.EXE</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleWindow("terminal")}
                    className="h-4 w-4 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-cyan-400 border border-slate-700 flex items-center justify-center cursor-pointer font-bold"
                    title="Minimize Panel"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="flex-1 overflow-hidden p-2">
                <Terminal
                  onOpenWindow={openWindow}
                  onSelectProject={(idx) => setSelectedProjectIndex(idx)}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
