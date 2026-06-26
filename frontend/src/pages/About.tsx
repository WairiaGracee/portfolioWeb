import React from 'react';
import { Download } from 'lucide-react';
import FadeIn from '../components/FadeIn';

// ── UPDATE THESE with your real details ──────────────────────────────────────
const BIO_PARAGRAPHS = [
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
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Django', 'Django REST Framework', 'Node.js', 'PostgreSQL', 'Supabase'],
  },
  {
    category: 'Tools',
    items: ['Git & GitHub', 'Docker', 'Figma', 'VS Code', 'Postman'],
  },
];

const TIMELINE = [
  { year: '2024–now',  role: 'Freelance Full-Stack Developer', place: 'Remote'              },
  { year: '2022–2024', role: 'Junior Software Engineer',       place: 'Tech Startup, Nairobi' },
  { year: '2021',      role: 'BSc Computer Science',           place: 'University of Nairobi' },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <main className="min-h-screen bg-linen pt-16">
      <div className="max-w-5xl mx-auto px-5 py-16">

        {/* ── PAGE HEADER ── */}
        <FadeIn>
          <p className="font-mono text-xs text-olive tracking-widest uppercase mb-3">
            About
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-ink leading-tight mb-12 tracking-tight">
            Why trust me with<br />
            <em className="text-olive not-italic">your product?</em>
          </h1>
        </FadeIn>

        {/* ── PHOTO + BIO ── */}
        {/* On mobile: stacks vertically. On md screens: side by side */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">

          {/* Photo */}
          <FadeIn direction="left" className="md:w-64 shrink-0">
            <div className="relative">
              {/*
                ── HOW TO ADD YOUR PHOTO ──────────────────────────────────────
                1. Put your photo in frontend/public/ e.g. "grace-photo.jpg"
                2. Replace the placeholder div below with:

                <img
                  src="/grace-photo.jpg"
                  alt="Grace Wanjiru"
                  className="w-full rounded aspect-[4/5] object-cover"
                />

                ──────────────────────────────────────────────────────────────
              */}
              <div className="
                w-full aspect-[4/5] bg-nude-card border border-taupe rounded
                flex flex-col items-center justify-center gap-3
              ">
                <div className="
                  w-20 h-20 rounded-full bg-taupe
                  flex items-center justify-center
                ">
                  <span className="font-display text-3xl font-bold text-cream">G</span>
                </div>
                <p className="font-mono text-xs text-taupe">add your photo</p>
              </div>

              {/* Decorative olive square behind the photo */}
              <div className="
                absolute -bottom-2 -right-2 w-10 h-10
                bg-olive rounded-sm -z-10
              " />
            </div>
          </FadeIn>

          {/* Bio text */}
          <FadeIn delay={0.15} className="flex-1">
            <div className="flex flex-col gap-5">
              {BIO_PARAGRAPHS.map((para, i) => (
                <p key={i} className="font-sans text-ink-soft leading-relaxed text-base">
                  {para}
                </p>
              ))}

              {/* Action links */}
              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="/grace-cv.pdf"
                  download
                  className="
                    flex items-center gap-2 px-5 py-2.5
                    bg-olive text-cream text-sm font-semibold rounded-sm
                    hover:bg-olive-dark transition-colors duration-200
                  "
                >
                  <Download size={14} /> Download CV
                </a>
                <a
                  href="https://github.com/gracewanjiru"
                  target="_blank" rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 px-5 py-2.5
                    border border-taupe text-ink text-sm font-medium rounded-sm
                    hover:border-olive transition-colors duration-200
                  "
                >
                  GitHub →
                </a>
                <a
                  href="https://linkedin.com/in/gracewanjiru"
                  target="_blank" rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 px-5 py-2.5
                    border border-taupe text-ink text-sm font-medium rounded-sm
                    hover:border-olive transition-colors duration-200
                  "
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── SKILLS ── */}
        <div className="border-t border-taupe pt-12 mb-12">
          <FadeIn>
            <p className="font-mono text-xs text-olive tracking-widest uppercase mb-8">
              Skills
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SKILLS.map(({ category, items }, ci) => (
              <FadeIn key={category} delay={ci * 0.1}>
                <div className="bg-nude-card border border-taupe rounded p-6">
                  <p className="font-display text-base font-semibold text-olive mb-4">
                    {category}
                  </p>
                  <ul className="flex flex-col gap-2 list-none">
                    {items.map(item => (
                      <li
                        key={item}
                        className="flex items-center gap-2 font-sans text-sm text-ink-soft"
                      >
                        {/* Olive dot bullet */}
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

        {/* ── EXPERIENCE TIMELINE ── */}
        <div className="border-t border-taupe pt-12">
          <FadeIn>
            <p className="font-mono text-xs text-olive tracking-widest uppercase mb-8">
              Experience
            </p>
          </FadeIn>
          <div className="flex flex-col">
            {TIMELINE.map(({ year, role, place }, i) => (
              <FadeIn key={year} delay={i * 0.1}>
                {/* Each timeline row: dot + line on left, content on right */}
                <div className="grid grid-cols-[auto_1fr] gap-6 pb-8">
                  {/* Dot + vertical line */}
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-olive mt-1 shrink-0" />
                    {/* Only draw the line if it's not the last item */}
                    {i < TIMELINE.length - 1 && (
                      <div className="flex-1 w-px bg-taupe mt-1.5" />
                    )}
                  </div>
                  {/* Content */}
                  <div>
                    <p className="font-mono text-xs text-taupe tracking-wide mb-1">{year}</p>
                    <p className="font-sans text-base font-semibold text-ink mb-0.5">{role}</p>
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
          © 2025 Grace Wanjiru · React + TypeScript + Django
        </p>
      </footer>
    </main>
  );
}