import React from 'react';
import { Download } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import heroBg from '../assets/hero-bg.jpg';
import photo from '../assets/shikoimage.jpeg'

// ─────────────────────────────────────────────────────────────────────────────
// PERSONALISE: replace all values below with your real details
// ─────────────────────────────────────────────────────────────────────────────
const BIO = [
  `I'm Grace — a full-stack developer based in Nairobi with a track record of
   shipping products people actually use. I work across the whole stack, from
   designing system architecture to writing clean, tested code to deploying on
   production infrastructure.`,
  `I care deeply about performance, accessibility, and maintainability. When I
   take on a project, I treat it like it's my own.`,
];

const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Django', 'Django REST Framework', 'Node.js', 'PostgreSQL', 'Supabase'],
  },
  {
    category: 'Tools',
    items: ['Git & GitHub', 'Docker', 'VS Code', 'Postman'],
  },
];

const TIMELINE = [
  { year: '2025–now',  role: 'Freelance Full-Stack Developer', place: 'Remote'                       },
  { year: '2023–2025', role: 'Software Developer Attachment',  place: 'Smart Applications International Ltd' },
  { year: '2019–2023', role: 'BSc Computer Science',           place: 'Dedan Kimathi University of Technology' },
];

// PERSONALISE: what you're currently exploring or building on the side
const CURRENTLY_LEARNING = [
  {
    title: 'AI Fundamentals through IBM SkillsBuild',
    note: 'Explored the fundamentals of artificial intelligence, machine learning concepts, and responsible AI practices.',
  },
  {
    title: 'Exploring system design fundamentals',
    note: 'Reading and practicing how to structure backends that scale beyond a single project.',
  },
  {
    title: 'Refining motion & micro-interactions',
    note: 'Studying how the best products use animation to guide attention, not just decorate.',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <main className="min-h-screen bg-linen">

      {/* ════════════════════════════════════════
          HERO BAND — shorter version of Home's hero,
          same image + gradient for visual consistency
      ════════════════════════════════════════ */}
      <section
        className="relative pt-32 pb-16 px-5"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(245, 240, 232, 0.15) 0%,
              rgba(107, 124, 92, 0.45) 50%,
              rgba(74, 87, 64, 0.85) 100%
            ),
            url(${heroBg})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="font-mono text-xs text-cream/70 tracking-widest uppercase mb-3">
              About
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-cream leading-tight tracking-tight">
              Why trust me with<br />
              <em className="text-[#E8E2D0] not-italic">your product?</em>
            </h1>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-16">

        {/* ════════════ PHOTO + BIO ════════════ */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">

          {/* Photo column */}
          <FadeIn direction="left" className="md:w-64 shrink-0">
            <div className="relative">

                <img
                  src={photo}
                  alt="Grace Wanjiru"
                  className="w-full rounded aspect-[4/5] object-cover block"
                />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-olive rounded-sm -z-10" />
            </div>
          </FadeIn>

          {/* Bio text column */}
          <FadeIn delay={0.15} className="flex-1">
            <div className="flex flex-col gap-5">
              {BIO.map((para, i) => (
                <p key={i} className="font-sans text-ink-soft leading-relaxed text-base">{para}</p>
              ))}

              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="/grace-cv.pdf"
                  download
                  className="flex items-center gap-2 px-5 py-2.5 bg-olive text-cream text-sm font-semibold rounded-sm hover:bg-olive-dark transition-colors duration-200"
                >
                  <Download size={14} /> Download CV
                </a>
                <a
                  href="https://github.com/gracewanjiru"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-taupe text-ink text-sm font-medium rounded-sm hover:border-olive transition-colors duration-200"
                >
                  GitHub →
                </a>
                <a
                  href="https://linkedin.com/in/gracewanjiru"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-taupe text-ink text-sm font-medium rounded-sm hover:border-olive transition-colors duration-200"
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ════════════ SKILLS ════════════ */}
        <div className="border-t border-taupe pt-12 mb-16">
          <FadeIn>
            <p className="font-mono text-xs text-olive tracking-widest uppercase mb-8">Skills</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
            {SKILLS.map(({ category, items }, ci) => (
              <FadeIn key={category} delay={ci * 0.1} className="h-full">
                <div className="
                  h-full bg-nude-card border border-taupe rounded p-6
                  transition-transform duration-300
                  hover:scale-105
                  cursor-pointer
                ">
                  <p className="font-display text-base font-semibold text-olive mb-4">{category}</p>
                  <ul className="flex flex-col gap-2 list-none m-0 p-0">
                    {items.map(item => (
                      <li key={item} className="flex items-center gap-2 font-sans text-sm text-ink-soft">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ════════════ CURRENTLY LEARNING — fills the gap below skills ════════════ */}
        <div className="border-t border-taupe pt-12 mb-16">
          <FadeIn>
            <p className="font-mono text-xs text-olive tracking-widest uppercase mb-2">
              Right now
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink mb-8">
              What I'm currently learning
            </h2>
          </FadeIn>
          <div className="flex flex-col gap-4">
            {CURRENTLY_LEARNING.map(({ title, note }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="
                  flex gap-4 bg-nude-card border border-taupe rounded p-5
                  transition-colors duration-200 hover:border-olive
                ">
                  {/* Number marker instead of a bullet — feels more like a running log */}
                  <span className="font-mono text-xs text-olive shrink-0 pt-0.5">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink mb-1">{title}</p>
                    <p className="font-sans text-sm text-ink-soft leading-relaxed">{note}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ════════════ EXPERIENCE TIMELINE ════════════ */}
        <div className="border-t border-taupe pt-12">
          <FadeIn>
            <p className="font-mono text-xs text-olive tracking-widest uppercase mb-8">Experience</p>
          </FadeIn>
          <div className="flex flex-col">
            {TIMELINE.map(({ year, role, place }, i) => (
              <FadeIn key={year} delay={i * 0.1}>
                <div className="group grid grid-cols-[auto_1fr] gap-6 pb-10">
                  <div className="flex flex-col items-center">
                    <div className="
                      w-3 h-3 rounded-full mt-1.5 shrink-0
                      border-2 border-olive bg-linen
                      transition-colors duration-300
                      group-hover:bg-olive
                    " />
                    {i < TIMELINE.length - 1 && (
                      <div className="flex-1 w-px bg-taupe mt-2" />
                    )}
                  </div>
                  <div className="
                    pb-2 -mt-1 px-5 py-4 rounded-sm
                    border border-transparent
                    transition-all duration-300
                    group-hover:bg-nude-card group-hover:border-taupe group-hover:-translate-y-0.5
                  ">
                    <p className="font-mono text-xs text-olive tracking-widest uppercase mb-1.5">{year}</p>
                    <p className="font-display text-lg font-semibold text-ink mb-1">{role}</p>
                    <p className="font-sans text-sm text-ink-soft">{place}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-taupe py-6 text-center">
        <p className="font-mono text-xs text-taupe tracking-wider">
          © 2026 Grace Wanjiru · React + TypeScript + Django
        </p>
      </footer>
    </main>
  );
}