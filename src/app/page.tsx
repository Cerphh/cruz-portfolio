import Link from "next/link";
import Image from "next/image";

import { ThreeBackdrop } from "@/components/three-backdrop";

const highlights = [
  "Frontend engineering",
  "Product-focused execution",
  "Scalable, maintainable UI",
];

const featuredWork = [
  {
    title: "HotBook - Hotel Booking System",
    description:
      "Full-stack hotel booking app with AI-powered nearby recommendations and reliability-focused fallback logic.",
    href: "/works#projects",
  },
  {
    title: "Tanaw - SDG Promotion Social App",
    description:
      "Purpose-driven social platform that makes SDG content engaging through familiar community feed interaction.",
    href: "/works#projects",
  },
  {
    title: "Gute Gulenke - Health and Wellness Hub",
    description:
      "Professional physiotherapy clinic website focused on trust, service clarity, and patient conversion.",
    href: "/works#projects",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ThreeBackdrop />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-12 pt-6 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 text-sm text-white/70">
          <div>
            <p className="text-base font-semibold tracking-[0.3em] text-white/90 uppercase">
              Paul Oliver Cruz
            </p>
            <p className="mt-1 text-white/50">Web Developer / Front-end Developer</p>
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <Link href="/works" className="transition-colors hover:text-white">
              Work
            </Link>
            <a href="#about" className="transition-colors hover:text-white">
              About
            </a>
            <a href="#contact" className="transition-colors hover:text-white">
              Contact
            </a>
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/75 shadow-[0_0_40px_rgba(99,102,241,0.12)] backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
              Available for selective freelance and product work
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              Frontend developer building production-ready products with clear UX and measurable impact.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              I am Paul Oliver Cruz. I build reliable web applications from concept to launch, combining
              clean interface design, thoughtful architecture, and practical delivery that supports real
              business goals.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
              >
                Start a project
              </a>
              <a
                href="/works"
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
              >
                Open selected works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-xl"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="relative z-10">
            <div className="rounded-[32px] border border-white/12 bg-white/8 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                  <span>Profile card</span>
                  <span>2026</span>
                </div>

                <div className="relative mt-6">
                  <div className="pointer-events-none absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />

                  <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-slate-950/30 p-3 shadow-[0_24px_80px_rgba(10,18,50,0.45)]">
                    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
                      <Image
                        src="/paul.png"
                        alt="Portrait of Paul Oliver Cruz"
                        width={640}
                        height={800}
                        priority
                        className="h-[390px] w-full object-cover object-top sm:h-[430px]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                      <div className="absolute left-1/2 bottom-4 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/25 bg-black/40 px-5 py-2 text-xs uppercase tracking-[0.26em] text-white/90 backdrop-blur-md">
                        Paul Oliver Cruz
                      </div>
                    </div>
                  </div>

                  <div className="relative mx-auto mt-4 w-[88%] rounded-[22px] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.2),rgba(15,23,42,0.55))] px-5 py-4 text-center shadow-[0_12px_40px_rgba(34,211,238,0.2)] backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.26em] text-cyan-100/80">Frontend / Web developer</p>
                    <p className="mt-3 text-sm leading-6 text-white/80">
                      Building interactive digital interfaces with motion, depth, and strong visual
                      hierarchy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section id="work" className="relative z-10 border-t border-white/10 py-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/45">Selected Works</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                A quick preview of real projects. Open any card for the full featured project details.
              </h2>
            </div>
            <p className="hidden max-w-md text-sm leading-6 text-white/55 md:block">
              Each card links to the selected works page where you can view full details, visuals, and
              implementation context.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {featuredWork.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
                  <span>0{index + 1}</span>
                  <span>Featured Project</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.description}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
                <p className="mt-5 text-sm font-medium text-cyan-200 transition-colors group-hover:text-white">
                  Open full project details
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section id="about" className="relative z-10 grid gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/45">About</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Designed to feel sharp, modern, and memorable.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
            I focus on projects that require both strong implementation and product awareness: systems that
            are understandable for users, maintainable for teams, and aligned with outcomes such as booking
            completion, engagement, and conversion.
          </p>
        </section>

        <section
          id="contact"
          className="relative z-10 mb-3 rounded-[32px] border border-white/10 bg-white/7 px-6 py-8 backdrop-blur-2xl sm:px-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/45">Contact</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Let us build something meaningful.
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-white/70 sm:text-base">
                <li>
                  LinkedIn: <a href="https://linkedin.com/in/paulolivercruz" className="text-cyan-200 hover:text-white">linkedin.com/in/paulolivercruz</a>
                </li>
                <li>
                  GitHub: <a href="https://github.com/cerphh" className="text-cyan-200 hover:text-white">github.com/cerphh</a>
                </li>
                <li>
                  Gmail: <a href="mailto:cruzpauloliver@gmail.com" className="text-cyan-200 hover:text-white">cruzpauloliver@gmail.com</a>
                </li>
                <li>
                  Phone: <a href="tel:+639926296059" className="text-cyan-200 hover:text-white">(+63) 992 629 6059</a>
                </li>
                <li>Location: Batangas PH</li>
              </ul>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-4 self-start">
              <div className="rounded-xl border border-white/12 bg-white/8 px-5 py-3 text-sm font-semibold leading-6 text-white/85 backdrop-blur-xl">
                Open for internships, junior frontend roles, and freelance collaborations.
              </div>

              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/80">Availability</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-slate-950/35 px-3 py-1 text-xs text-white/80">
                    Remote-ready
                  </span>
                  <span className="rounded-full border border-white/15 bg-slate-950/35 px-3 py-1 text-xs text-white/80">
                    Batangas, PH
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  Available for interviews and project discussions on anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-10 mt-4 border-t border-white/10 py-8">
          <div className="flex flex-col gap-5 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold tracking-[0.22em] text-white/85 uppercase">Paul Oliver Cruz</p>
              <p className="mt-2 max-w-lg leading-6 text-white/55">
                Frontend developer focused on shipping reliable, user-centered products for real teams and
                real users.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://linkedin.com/paulolivercruz" className="transition-colors hover:text-white">
                LinkedIn
              </a>
              <a href="https://github.com/cerphh" className="transition-colors hover:text-white">
                GitHub
              </a>
              <a href="mailto:cruzpauloliver@gmail.com" className="transition-colors hover:text-white">
                Email
              </a>
              <Link href="/works" className="transition-colors hover:text-white">
                Works
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
