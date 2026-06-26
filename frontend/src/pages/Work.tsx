import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';

// ── UPDATE THESE with your real projects ──────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'AgriLink Platform',
    tagline: 'Connecting Kenyan farmers to buyers directly.',
    description:
      'A marketplace web app for smallholder farmers to list produce, receive orders, and process payments — cutting out middlemen. React, Django REST, PostgreSQL, M-Pesa integration.',
    tags: ['React', 'Django', 'PostgreSQL', 'M-Pesa'],
    category: 'Full-Stack',
    github: 'https://github.com/gracewanjiru/agrilink',
    live: 'https://agrilink.example.com',
  },
  {
    id: 2,
    title: 'HealthTrack Dashboard',
    tagline: 'Patient data management for a local clinic.',
    description:
      'Internal dashboard for a Nairobi clinic — patient visits, lab results, appointments. Role-based access, PDF export, real-time updates.',
    tags: ['TypeScript', 'React', 'Django', 'Supabase'],
    category: 'Full-Stack',
    github: 'https://github.com/gracewanjiru/healthtrack',
    live: null,
  },
  {
    id: 3,
    title: 'Savanna UI Kit',
    tagline: 'A React component library with African design cues.',
    description:
      'Open-source component library — forms, tables, modals — styled with a warm, nature-inspired palette. Typed, tested, published on npm.',
    tags: ['React', 'TypeScript', 'Storybook', 'npm'],
    category: 'Open Source',
    github: 'https://github.com/gracewanjiru/savanna-ui',
    live: 'https://savanna-ui.example.com',
  },
  {
    id: 4,
    title: 'Jua Rent Tracker',
    tagline: 'Simple rent management for small landlords.',
    description:
      'Track tenants, payments, and send WhatsApp reminders automatically. Built in a 48-hour hackathon — won 2nd place.',
    tags: ['Next.js', 'Supabase', 'WhatsApp API'],
    category: 'Product',
    github: 'https://github.com/gracewanjiru/jua-rent',
    live: 'https://jua-rent.example.com',
  },
];

const CATEGORIES = ['All', 'Full-Stack', 'Open Source', 'Product'];
// ─────────────────────────────────────────────────────────────────────────────

export default function Work() {
  // activeCategory controls which filter tab is selected
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter the projects array based on what tab is active
  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-linen pt-16">
      <div className="max-w-5xl mx-auto px-5 py-16">

        {/* ── HEADER ── */}
        <FadeIn>
          <p className="font-mono text-xs text-olive tracking-widest uppercase mb-3">Work</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-ink leading-tight mb-4 tracking-tight">
            What I've built —
          </h1>
          <p className="font-sans text-ink-soft text-base leading-relaxed max-w-lg mb-10">
            Real projects, real users. Every one of these shipped — not just demo'd.
          </p>
        </FadeIn>

        {/* ── CATEGORY FILTER TABS ── */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-sm border
                  transition-all duration-200 cursor-pointer
                  ${activeCategory === cat
                    ? 'bg-olive text-cream border-olive'
                    : 'bg-transparent text-ink-soft border-taupe hover:border-olive'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* ── PROJECT CARDS ── */}
        {/* AnimatePresence allows exit animations when cards are removed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="
                  bg-nude-card border border-taupe rounded p-8
                  flex flex-col h-full
                  hover:border-olive hover:-translate-y-0.5
                  transition-all duration-200
                ">
                  {/* Category badge */}
                  <span className="
                    self-start font-mono text-xs text-olive
                    border border-olive px-2 py-0.5 rounded-sm
                    uppercase tracking-widest mb-5
                  ">
                    {project.category}
                  </span>

                  <h2 className="font-display text-xl font-bold text-ink mb-1 leading-snug">
                    {project.title}
                  </h2>
                  <p className="font-sans text-sm font-semibold text-olive mb-3">
                    {project.tagline}
                  </p>
                  <p className="font-sans text-sm text-ink-soft leading-relaxed flex-1 mb-6">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="
                          font-mono text-xs text-ink-soft
                          bg-linen border border-taupe
                          px-2 py-1 rounded-sm
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-5">
                    <a
                      href={project.github}
                      target="_blank" rel="noopener noreferrer"
                      className="
                        font-sans text-xs font-medium text-ink
                        border-b border-taupe pb-0.5
                        hover:text-olive hover:border-olive
                        transition-colors duration-200
                      "
                    >
                      View code →
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank" rel="noopener noreferrer"
                        className="
                          flex items-center gap-1
                          font-sans text-xs font-medium text-olive
                          border-b border-olive pb-0.5
                          hover:text-olive-dark
                          transition-colors duration-200
                        "
                      >
                        <ExternalLink size={12} /> Live site
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── GITHUB CTA ── */}
        <FadeIn>
          <div className="
            bg-nude-card border border-taupe rounded p-8
            flex flex-wrap gap-6 items-center justify-between
          ">
            <div>
              <p className="font-display text-xl font-semibold text-ink mb-1">
                See everything on GitHub
              </p>
              <p className="font-sans text-sm text-ink-soft">
                Open source work, experiments, and contributions.
              </p>
            </div>
            <a
              href="https://github.com/gracewanjiru"
              target="_blank" rel="noopener noreferrer"
              className="
                flex items-center gap-2 px-6 py-3
                bg-olive text-cream text-sm font-semibold rounded-sm
                hover:bg-olive-dark transition-colors duration-200
                whitespace-nowrap
              "
            >
              GitHub Profile <ArrowRight size={14} />
            </a>
          </div>
        </FadeIn>

        {/* ── TESTIMONIALS PLACEHOLDER ── */}
        <FadeIn delay={0.1}>
          <div className="mt-12 border-2 border-dashed border-taupe rounded p-10 text-center">
            <p className="font-display text-base italic text-taupe mb-2">
              "Testimonials coming soon"
            </p>
            <p className="font-mono text-xs text-taupe tracking-wide">
              Client & collaborator reviews will live here
            </p>
          </div>
        </FadeIn>
      </div>

      <footer className="border-t border-taupe py-6 text-center">
        <p className="font-mono text-xs text-taupe tracking-wider">
          © 2025 Grace Wanjiru · React + TypeScript + Django
        </p>
      </footer>
    </main>
  );
}