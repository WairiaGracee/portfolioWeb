import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import FadeIn from '../components/FadeIn';

// The shape of our form data — TypeScript makes sure we never typo a field name
interface FormData {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

// Reusable labelled input — keeps the JSX below clean
function Field({
  label, name, type = 'text', value, onChange, placeholder, multiline = false,
}: {
  label: string;
  name: keyof FormData;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  const sharedClass = `
    w-full px-4 py-3 bg-linen border border-taupe rounded-sm
    font-sans text-sm text-ink placeholder:text-taupe
    focus:outline-none focus:border-olive
    transition-colors duration-200
  `;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label className="font-mono text-xs text-olive tracking-widest uppercase">
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name} required value={value} onChange={onChange}
          placeholder={placeholder} rows={6}
          className={`${sharedClass} resize-y min-h-[120px]`}
        />
      ) : (
        <input
          name={name} type={type} required
          value={value} onChange={onChange}
          placeholder={placeholder}
          className={sharedClass}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', subject: '', message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  // Generic change handler — works for any field
  // e.target.name matches the `name` prop on each input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stop the browser from reloading the page
    setStatus('sending');

    try {
      // POST to Django's /api/contact/ endpoint
      // We send JSON and expect JSON back
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      // Network error (backend not running, etc.)
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-linen pt-16">
      <div className="max-w-5xl mx-auto px-5 py-16">

        {/* ── HEADER ── */}
        <FadeIn>
          <p className="font-mono text-xs text-olive tracking-widest uppercase mb-3">
            Contact
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-ink leading-tight mb-4 tracking-tight">
            Let's talk about<br />
            <em className="text-olive not-italic">your project.</em>
          </h1>
          <p className="font-sans text-ink-soft text-base leading-relaxed max-w-lg mb-12">
            Available for freelance projects and full-time roles.
            I reply within 24 hours.
          </p>
        </FadeIn>

        {/* ── GRID: form left, sidebar right ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10">

          {/* ── FORM ── */}
          <FadeIn>
            <div className="bg-nude-card border border-taupe rounded p-8">
              <AnimatePresence mode="wait">

                {/* Success state */}
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-12 gap-4 text-center"
                  >
                    <CheckCircle size={48} className="text-olive" strokeWidth={1.5} />
                    <h2 className="font-display text-2xl font-semibold text-ink">
                      Message sent!
                    </h2>
                    <p className="font-sans text-sm text-ink-soft max-w-xs">
                      Thanks for reaching out. I'll reply within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="
                        mt-2 px-5 py-2.5 bg-olive text-cream
                        text-sm font-semibold rounded-sm
                        hover:bg-olive-dark transition-colors duration-200
                      "
                    >
                      Send another
                    </button>
                  </motion.div>

                ) : (
                  /* Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    {/* Name + Email side by side on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Name"  name="name"  value={form.name}  onChange={handleChange} placeholder="Your name" />
                      <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                    </div>
                    <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" />
                    <Field label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." multiline />

                    {/* Error message */}
                    {status === 'error' && (
                      <div className="
                        flex items-center gap-2 px-4 py-3
                        bg-red-50 border border-red-200 rounded-sm
                        text-red-600 text-sm font-sans
                      ">
                        <AlertCircle size={14} />
                        Something went wrong. Please try again or email me directly.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className={`
                        self-start flex items-center gap-2
                        px-6 py-3 text-sm font-semibold rounded-sm
                        transition-colors duration-200
                        ${status === 'sending'
                          ? 'bg-taupe text-cream cursor-not-allowed'
                          : 'bg-olive text-cream hover:bg-olive-dark cursor-pointer'
                        }
                      `}
                    >
                      {status === 'sending'
                        ? 'Sending…'
                        : <><Send size={14} /> Send message</>
                      }
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>

          {/* ── SIDEBAR ── */}
          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-5">

              {/* Direct email */}
              <div className="bg-nude-card border border-taupe rounded p-6">
                <p className="font-mono text-xs text-olive tracking-widest uppercase mb-5">
                  Direct
                </p>
                {/* UPDATE: replace with your real email */}
                <a href="mailto:grace@example.com" className="flex items-center gap-3 no-underline">
                  <div className="w-9 h-9 bg-olive rounded-sm flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-cream" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-ink-soft mb-0.5">Email</p>
                    <p className="font-sans text-sm font-medium text-ink">grace@example.com</p>
                  </div>
                </a>
              </div>

              {/* Social links */}
              <div className="bg-nude-card border border-taupe rounded p-6">
                <p className="font-mono text-xs text-olive tracking-widest uppercase mb-5">
                  Find me
                </p>
                <div className="flex flex-col gap-4">
                  {/* UPDATE: replace with your real handles */}
                  {[
                    { label: 'GitHub',   handle: '@gracewanjiru', url: 'https://github.com/gracewanjiru'          },
                    { label: 'LinkedIn', handle: 'Grace Wanjiru', url: 'https://linkedin.com/in/gracewanjiru'     },
                  ].map(({ label, handle, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 no-underline"
                    >
                      <div className="w-9 h-9 border border-taupe rounded-sm flex items-center justify-center text-ink-soft text-xs font-mono shrink-0">
                        {label.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-sans text-xs text-ink-soft mb-0.5">{label}</p>
                        <p className="font-sans text-sm font-medium text-ink">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div className="bg-olive rounded p-6">
                <div className="flex items-center gap-2 mb-3">
                  {/* Pulsing green dot = available */}
                  <div className="w-2 h-2 rounded-full bg-green-300 shadow-[0_0_0_3px_rgba(134,239,172,0.3)]" />
                  <p className="font-mono text-xs text-cream/70 tracking-widest uppercase">
                    Available for work
                  </p>
                </div>
                <p className="font-sans text-sm text-cream/90 leading-relaxed">
                  Open to freelance projects and full-time roles starting immediately.
                </p>
              </div>

            </div>
          </FadeIn>
        </div>
      </div>

      <footer className="border-t border-taupe py-6 text-center">
        <p className="font-mono text-xs text-taupe tracking-wider">
          © 2026 Grace Jane Wairia · React + TypeScript + Django
        </p>
      </footer>
    </main>
  );
}