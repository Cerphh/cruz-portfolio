"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Flip);

const projects = [
  {
    label: "01 / Product",
    title: "HotBook - Hotel Booking System",
    summary:
      "A full-stack booking app with AI-powered nearby recommendations and reliability-focused fallbacks.",
    image: "/projects/hotbook.png",
    details: [
      "HotBook is a full-stack hotel booking application built to make travel planning feel effortless, going beyond a typical listing site to actually help guests discover what is around them. The goal was simple but ambitious: turn booking a hotel into the start of planning a trip, not just reserving a room.",
      "I built the entire booking flow using Next.js for the frontend and Firebase for real-time data management, allowing users to browse hotels, check live availability, and complete bookings through a clean, intuitive dashboard. Authentication and booking status are handled in real time through Firestore, so users always see accurate, up-to-date information.",
      "The standout feature is the AI-powered nearby recommendation system. Once a guest selects a hotel, the app suggests nearby restaurants and attractions using a multi-layered AI pipeline: a local Mistral model running through Ollama as the primary source, OpenAI as a fallback if Ollama is unavailable, and real OpenStreetMap location data as a final safeguard if both AI services fail. Each recommendation includes walking distance, estimated travel time, and an interactive map for easy navigation.",
      "This project taught me a lot about designing for reliability - making sure a feature never fully breaks, even when one part of a complex system does not respond as expected. The result is a booking experience that feels more personalized, trustworthy, and complete than a standard hotel listing platform.",
    ] as const,
    stack: "Next.js, Firebase, Tailwind CSS, Leaflet, Ollama, OpenAI API",
    highlights: [
      "Live booking status and availability synced through Firestore",
      "AI recommendation pipeline with fallback layers for reliability",
      "Nearby attractions include walking time, distance, and map context",
    ] as const,
    tags: ["Booking flow", "AI recommendations", "Maps"] as const,
    accent: "from-cyan-400/20 via-sky-500/10 to-transparent",
  },
  {
    label: "02 / Social",
    title: "Tanaw - SDG Promotion Social App",
    summary:
      "A purpose-driven social platform that makes SDG content engaging through familiar feed-based interaction.",
    image: "/projects/tanaw.png",
    details: [
      "Tanaw is a social media platform built to promote Sustainable Development Goals (SDGs) in a way that feels social and engaging, not just informational. With so much content competing for attention online, the goal was to give SDG awareness a home where users could genuinely connect with the cause through everyday interaction - posts, blogs, and community engagement - rather than passive reading.",
      "I developed the platform using Next.js and Tailwind CSS for a clean, responsive frontend, with Supabase handling backend data, authentication, and real-time updates. The interface is built around familiar social media patterns - profiles, feeds, and engagement features - so users can intuitively interact with SDG-related content the same way they would with any platform they already use daily.",
      "A key focus throughout development was accessibility and clarity: presenting the 17 SDGs in a way that feels approachable rather than academic, encouraging users to explore, post, and share without friction.",
      "This project reflects my interest in using technology for purpose-driven impact - proving that meaningful causes can have the same polish, usability, and engagement as mainstream platforms.",
    ] as const,
    stack: "Next.js, Tailwind CSS, Supabase",
    highlights: [
      "Social feed interaction patterns tuned for SDG content discovery",
      "Realtime updates powered by Supabase auth and data streams",
      "Accessible, approachable presentation of all 17 SDGs",
    ] as const,
    tags: ["Community feed", "Realtime data", "Purpose-driven UX"] as const,
    accent: "from-fuchsia-400/20 via-violet-500/10 to-transparent",
  },
  {
    label: "03 / Client",
    title: "Gute Gulenke - Health and Wellness Hub",
    summary:
      "A complete Webflow website for a German physiotherapy clinic, focused on trust and patient conversion.",
    image: "/projects/gutegelenke.png",
    details: [
      "Gutegelenke is a full website I built from scratch in Webflow for a physiotherapy clinic based in Germany. The clinic needed a professional, trustworthy online presence that would clearly communicate their services while making it easy for patients to get in touch or book appointments - all while remaining simple enough for their non-technical staff to manage going forward.",
      "I designed and built the entire site structure in Webflow, translating the clinic's branding into a clean, calming layout appropriate for a healthcare setting. The site includes integrated booking and contact forms, allowing potential patients to reach out or request appointments directly through the website, reducing friction between a visitor and an actual consultation.",
      "Working with a German-based client also meant being precise about content structure and ensuring the site felt professional and credible - qualities that matter especially in healthcare, where trust plays a major role in conversion. Throughout the project, I maintained close communication with the client, incorporating feedback and revisions to make sure the final result matched their vision while staying functional and easy to maintain long after launch.",
      "This project highlights my ability to take full ownership of a client site from concept to launch, balancing design, usability, and real business needs like appointment generation.",
    ] as const,
    stack: "Webflow, UX writing, Conversion-focused design",
    highlights: [
      "Clinic-first layout built for trust and clear service communication",
      "Integrated inquiry and booking forms to reduce patient friction",
      "Delivered with iterative client feedback for long-term maintainability",
    ] as const,
    tags: ["Healthcare UX", "Client delivery", "Booking flow"] as const,
    accent: "from-emerald-400/20 via-teal-500/10 to-transparent",
  },
];

const process = [
  {
    title: "Product-first approach",
    text: "Each project starts with clear user goals, success metrics, and a focused scope.",
  },
  {
    title: "Execution quality",
    text: "I prioritize clean implementation, maintainable structure, and performance-aware interfaces.",
  },
  {
    title: "Delivery mindset",
    text: "I iterate with feedback, balance detail with deadlines, and ship work that supports outcomes.",
  },
];

export function WorksShowcase() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const heroItems = [
        "[data-hero-badge]",
        "[data-hero-title]",
        "[data-hero-copy]",
        "[data-hero-actions]",
        "[data-hero-stats]",
      ];

      gsap.set(heroItems, { y: 24, opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to("[data-hero-badge]", { y: 0, opacity: 1, duration: 0.8 })
        .to("[data-hero-title]", { y: 0, opacity: 1, duration: 0.9 }, "-=0.45")
        .to("[data-hero-copy]", { y: 0, opacity: 1, duration: 0.8 }, "-=0.55")
        .to("[data-hero-actions]", { y: 0, opacity: 1, duration: 0.75 }, "-=0.45")
        .to("[data-hero-stats]", { y: 0, opacity: 1, duration: 0.75 }, "-=0.45");

      gsap.from("[data-project-card]", {
        scrollTrigger: {
          trigger: "[data-project-grid]",
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from("[data-process-item]", {
        scrollTrigger: {
          trigger: "[data-process-grid]",
          start: "top 80%",
        },
        y: 44,
        opacity: 0,
        stagger: 0.16,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.to("[data-floating-shape]", {
        y: -16,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const handleSpotMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = spotRef.current;

    if (!element) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    gsap.to(element, {
      x,
      y,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleSpotEnter = () => {
    const element = spotRef.current;

    if (!element) {
      return;
    }

    gsap.to(element, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleSpotLeave = () => {
    const element = spotRef.current;

    if (!element) {
      return;
    }

    gsap.to(element, { scale: 0.6, opacity: 0, duration: 0.35, ease: "power2.out" });
  };

  const handleCardMove = (event: React.PointerEvent<HTMLElement>, index: number) => {
    if (expandedIndex !== null) {
      return;
    }

    const card = cardRefs.current[index];

    if (!card) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -9;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 11;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.015,
      transformPerspective: 1200,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (index: number) => {
    if (expandedIndex !== null) {
      return;
    }

    const card = cardRefs.current[index];

    if (!card) {
      return;
    }

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleCardToggle = (index: number) => {
    const cards = cardRefs.current.filter(Boolean);
    gsap.killTweensOf(cards);
    gsap.set(cards, { clearProps: "transform" });

    const state = Flip.getState("[data-project-card]");
    const nextIndex = expandedIndex === index ? null : index;

    setExpandedIndex(nextIndex);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.75,
        ease: "power2.inOut",
        nested: true,
      });

      if (nextIndex !== null) {
        const expandedCard = cardRefs.current[nextIndex];
        const content = expandedCard?.querySelector("[data-expanded-content]");

        if (content) {
          gsap.fromTo(
            content,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.15 },
          );
        }
      }
    });
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardToggle(index);
    }
  };

  return (
    <div ref={rootRef} className="relative flex flex-1 flex-col pb-8 pt-12">
      <section
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.26),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.02))] px-6 py-8 shadow-[0_25px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-8 lg:px-10"
        onPointerMove={handleSpotMove}
        onPointerEnter={handleSpotEnter}
        onPointerLeave={handleSpotLeave}
      >
        <div
          ref={spotRef}
          className="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl opacity-0"
        />

        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-fuchsia-400/10 blur-3xl" data-floating-shape />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <div
              data-hero-badge
              className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/7 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/65"
            >
              Selected works / practical impact
            </div>

            <h1
              data-hero-title
              className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl"
            >
              Completed projects that show how I solve problems, build reliably, and ship polished products.
            </h1>

            <p
              data-hero-copy
              className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl"
            >
              These projects highlight end-to-end ownership: understanding requirements, designing clear
              user flows, implementing robust frontend systems, and delivering outcomes stakeholders value.
            </p>

            <div data-hero-actions className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
              >
                Explore projects
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
              >
                Back to home
              </a>
            </div>
          </div>

          <div
            data-hero-stats
            className="grid gap-4 rounded-[28px] border border-white/10 bg-slate-950/30 p-5 backdrop-blur-xl"
          >
            {[
              ["03", "featured concepts"],
              ["E2E", "delivery scope"],
              ["UX + FE", "core strength"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="flex items-end justify-between rounded-3xl border border-white/8 bg-white/5 px-5 py-4"
              >
                <span className="text-3xl font-semibold tracking-tight text-white">{value}</span>
                <span className="text-sm text-white/50">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" data-project-grid className="pt-10">
        <div className="flex items-end justify-between gap-6 pb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/45">Featured work</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Three shipped concepts, each expandable into a full project story.
            </h2>
          </div>
          <p className="hidden max-w-md text-sm leading-6 text-white/55 md:block">
            Click any card to expand it into a full-width detail panel with image and full context.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              ref={(element: HTMLElement | null) => {
                if (element) {
                  cardRefs.current[index] = element;
                }
              }}
              data-project-card
              role="button"
              tabIndex={0}
              aria-expanded={expandedIndex === index}
              className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/6 p-6 text-white backdrop-blur-xl transition-[border-color,background-color] duration-300 hover:border-white/20 hover:bg-white/10 ${
                expandedIndex === index ? "lg:col-span-3" : ""
              }`}
              onClick={() => handleCardToggle(index)}
              onKeyDown={(event) => handleCardKeyDown(event, index)}
              onPointerMove={(event) => handleCardMove(event, index)}
              onPointerLeave={() => handleCardLeave(index)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/40">
                  <span>{project.label}</span>
                  <span>{expandedIndex === index ? "Expanded" : "Click to expand"}</span>
                </div>

                <h3 className="mt-8 text-2xl font-semibold tracking-tight">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/68">{project.summary}</p>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 to-transparent" />

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 bg-slate-950/25 px-3 py-1 text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-8 text-sm font-medium text-cyan-100 transition-colors group-hover:text-white">
                  {expandedIndex === index
                    ? "Tap again to collapse"
                    : "Open for full featured project details"}
                </p>

                {expandedIndex === index && (
                  <div
                    data-expanded-content
                    className="mt-8 grid gap-6 rounded-[24px] border border-white/12 bg-slate-950/40 p-4 sm:p-5 lg:grid-cols-[0.95fr_1.05fr]"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-black/35">
                        <Image
                          src={project.image}
                          alt=""
                          aria-hidden="true"
                          fill
                          className="scale-110 object-cover opacity-35 blur-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/35" />
                        <div className="relative flex min-h-[300px] items-center justify-center p-3 sm:min-h-[360px]">
                          <Image
                            src={project.image}
                            alt={`${project.title} project preview`}
                            width={1200}
                            height={900}
                            className="h-auto max-h-[420px] w-full object-contain"
                          />
                        </div>
                      </div>

                      <div className="rounded-2xl border border-cyan-300/25 bg-cyan-400/10 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/80">Tech stack</p>
                        <p className="mt-2 text-sm leading-6 text-white/85">{project.stack}</p>
                      </div>

                      <div className="rounded-2xl border border-white/12 bg-slate-900/40 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/70">Project highlights</p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-white/80">
                          {project.highlights.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-[8px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-200/90" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/75">Detailed overview</p>
                      <div className="mt-4 space-y-4 text-sm leading-7 text-white/75">
                        {project.details.map((paragraph) => (
                          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section data-process-grid className="grid gap-5 border-t border-white/10 pt-10 lg:grid-cols-[0.9fr_1.1fr_1.1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">How it moves</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            The interaction layer is part of the composition.
          </h2>
        </div>

        {process.map((step) => (
          <div
            key={step.title}
            data-process-item
            className="rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl"
          >
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/65">{step.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}