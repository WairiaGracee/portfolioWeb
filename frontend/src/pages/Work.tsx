import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Quote } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import heroBg from '../assets/hero-bg.jpg';

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  category: string;
  image: string | null;
  github_url: string | null;
  live_url: string | null;
}

interface Testimonial {
  id: number;
  author_name: string;
  author_role: string;
  quote: string;
  author_photo: string | null;
}

const CATEGORIES = ['All', 'Full-Stack', 'Open Source', 'Product'];
const API_BASE = process.env.REACT_APP_API_URL ?? '';

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [projectsRes, testimonialsRes] = await Promise.all([
          fetch(`${API_BASE}/api/projects/`),
          fetch(`${API_BASE}/api/testimonials/`),
        ]);

        if (!projectsRes.ok || !testimonialsRes.ok) {
          throw new Error('Failed to fetch');
        }

        const projectsData = await projectsRes.json();
        const testimonialsData = await testimonialsRes.json();

        setProjects(projectsData);
        setTestimonials(testimonialsData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-linen">

      {/* ════════════════════════════════════════
          HERO BAND — matches About's treatment
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
            <p className="font-mono text-xs text-cream/70 tracking-widest uppercase mb-3">Work</p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-cream leading-tight tracking-tight mb-3">
              What I've built —
            </h1>
            <p className="font-sans text-cream/80 text-base leading-relaxed max-w-lg">
              Real projects, real users. Every one of these shipped — not just demo'd.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-16">

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="font-mono text-sm text-taupe">Loading projects…</p>
          </div>
        )}

        {/* ── ERROR STATE ── */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded p-6 text-center mb-10">
            <p className="font-sans text-sm text-red-600">
              Couldn't load projects right now. Make sure the backend server is running.
            </p>
          </div>
        )}

        {/* ── CATEGORY FILTER TABS ── */}
        {!loading && !error && (
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
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && !error && projects.length === 0 && (
          <div className="border-2 border-dashed border-taupe rounded p-10 text-center mb-16">
            <p className="font-display text-base italic text-taupe mb-2">No projects yet</p>
            <p className="font-mono text-xs text-taupe tracking-wide">
              Add your first project from the Django admin panel
            </p>
          </div>
        )}

        {/* ── PROJECT CARDS ── */}
        {!loading && !error && projects.length > 0 && (
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
                    bg-nude-card border border-taupe rounded overflow-hidden
                    flex flex-col h-full
                    hover:border-olive hover:-translate-y-0.5
                    transition-all duration-200
                  ">
                    {/*
                      ── IMAGE FIX ──────────────────────────────────────────
                      Fixed aspect ratio (16:9) + object-cover + object-center
                      means the image always fills the box completely and
                      crops evenly from all sides — no more text getting cut
                      off oddly on one edge. The image is treated as a
                      background fill, not a literal full reproduction.
                      ──────────────────────────────────────────────────────
                    */}
                    {project.image && (
                      <div className="w-full aspect-[16/9] overflow-hidden bg-taupe/20">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}

                    <div className="p-8 flex flex-col flex-1">
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

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className="font-mono text-xs text-ink-soft bg-linen border border-taupe px-2 py-1 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-5">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank" rel="noopener noreferrer"
                            className="font-sans text-xs font-medium text-ink border-b border-taupe pb-0.5 hover:text-olive hover:border-olive transition-colors duration-200"
                          >
                            View code →
                          </a>
                        )}
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 font-sans text-xs font-medium text-olive border-b border-olive pb-0.5 hover:text-olive-dark transition-colors duration-200"
                          >
                            <ExternalLink size={12} /> Live site
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ── GITHUB CTA ── */}
        <FadeIn>
          <div className="bg-nude-card border border-taupe rounded p-8 flex flex-wrap gap-6 items-center justify-between mb-16">
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
              className="flex items-center gap-2 px-6 py-3 bg-olive text-cream text-sm font-semibold rounded-sm hover:bg-olive-dark transition-colors duration-200 whitespace-nowrap"
            >
              GitHub Profile <ArrowRight size={14} />
            </a>
          </div>
        </FadeIn>

        {/* ── TESTIMONIALS ── */}
        <div>
          <FadeIn>
            <p className="font-mono text-xs text-olive tracking-widest uppercase mb-8">
              What people say
            </p>
          </FadeIn>

          {!loading && testimonials.length === 0 && (
            <div className="border-2 border-dashed border-taupe rounded p-10 text-center">
              <p className="font-display text-base italic text-taupe mb-2">
                Testimonials coming soon
              </p>
              <p className="font-mono text-xs text-taupe tracking-wide">
                Add reviews from the Django admin panel
              </p>
            </div>
          )}

          {testimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <FadeIn key={t.id} delay={i * 0.1}>
                  <div className="bg-nude-card border border-taupe rounded p-7 h-full flex flex-col">
                    <Quote className="text-olive mb-4" size={24} strokeWidth={1.5} />
                    <p className="font-sans text-sm text-ink-soft leading-relaxed flex-1 mb-5 italic">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      {t.author_photo ? (
                        <img
                          src={t.author_photo}
                          alt={t.author_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-taupe flex items-center justify-center">
                          <span className="font-display text-sm font-bold text-cream">
                            {t.author_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-sans text-sm font-semibold text-ink">{t.author_name}</p>
                        <p className="font-sans text-xs text-ink-soft">{t.author_role}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
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