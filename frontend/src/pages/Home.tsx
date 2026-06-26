import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import FadeIn from '../components/FadeIn';

// ── DATA ──────────────────────────────────────────────────────────────────────
// Keeping data at the top makes it easy to update without hunting through JSX

const SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Django',
  'PostgreSQL', 'REST APIs', 'Git', 'Tailwind CSS',
];

const STATS = [
  { value: '3+',  label: 'Years building'   },
  { value: '12',  label: 'Projects shipped' },
  { value: '5',   label: 'Happy clients'    },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function Home() {
  // Split the name into individual characters so we can animate each one
  const nameChars = 'Grace Wanjiru'.split('');

  return (
    // min-h-screen = at least full viewport height
    // bg-linen = our custom off-white background
    <main className="min-h-screen bg-linen">

      {/* ── HERO ── */}
      <section className="
        min-h-screen flex flex-col justify-center
        max-w-5xl mx-auto px-5 pt-24 pb-12
      ">
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs text-olive tracking-widest uppercase mb-5"
        >
          Full-Stack Developer · Nairobi, Kenya
        </motion.p>

        {/* Animated name — each letter fades + slides up with a stagger */}
        <h1 className="
          font-display font-bold text-ink leading-none mb-1
          text-5xl sm:text-7xl lg:text-8xl tracking-tight
        ">
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              // Each letter starts invisible and 20px below
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // Each letter starts 40ms after the previous one (stagger)
              transition={{ delay: 0.4 + i * 0.04, duration: 0.4 }}
              // inline-block needed so y transform works on individual letters
              className={char === ' ' ? 'inline' : 'inline-block'}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* The signature underline — the one bold visual moment */}
        <div className="overflow-hidden h-1 mb-10">
          <motion.div
            className="h-0.5 bg-olive origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.7, ease: 'easeOut' }}
          />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="
            font-sans text-ink-soft leading-relaxed mb-10
            text-base sm:text-lg max-w-xl
          "
        >
          I build digital products that are fast, accessible, and actually work.
          From idea to deployed — I handle the full stack.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          {/* Primary CTA */}
          <Link
            to="/work"
            className="
              flex items-center gap-2 px-6 py-3
              bg-olive text-cream text-sm font-semibold rounded-sm
              hover:bg-olive-dark transition-colors duration-200
            "
          >
            See my work <ArrowRight size={16} />
          </Link>

          {/* Secondary CTA */}
          <a
            href="/grace-cv.pdf"
            download
            className="
              flex items-center gap-2 px-6 py-3
              border border-taupe text-ink text-sm font-medium rounded-sm
              hover:border-olive transition-colors duration-200
            "
          >
            <Download size={16} /> Download CV
          </a>
        </motion.div>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="
            grid grid-cols-3 gap-6
            border-t border-taupe pt-8 max-w-xs
          ">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-bold text-olive leading-none mb-1">
                  {value}
                </p>
                <p className="font-sans text-xs text-ink-soft">{label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── SKILLS STRIP ── */}
      <section className="bg-nude-card border-y border-taupe py-12 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="font-mono text-xs text-olive tracking-widest uppercase mb-6">
              What I work with
            </p>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill, i) => (
              <FadeIn key={skill} delay={i * 0.06}>
                <span className="
                  px-3 py-2 font-mono text-xs text-ink-soft
                  border border-taupe rounded-sm bg-linen
                ">
                  {skill}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 flex flex-wrap gap-6 items-center justify-between">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink">
            Let's build something<br />
            <em className="text-olive not-italic">worth using.</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="
                flex items-center gap-2 px-6 py-3
                bg-olive text-cream text-sm font-semibold rounded-sm
                hover:bg-olive-dark transition-colors duration-200
              "
            >
              <Mail size={16} /> Get in touch
            </Link>
            <a
              href="https://github.com/gracewanjiru"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 px-6 py-3
                border border-taupe text-ink text-sm font-medium rounded-sm
                hover:border-olive transition-colors duration-200
              "
            >
              GitHub →
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-taupe py-6 text-center">
        <p className="font-mono text-xs text-taupe tracking-wider">
          © 2025 Grace Wanjiru · React + TypeScript + Django
        </p>
      </footer>
    </main>
  );
}