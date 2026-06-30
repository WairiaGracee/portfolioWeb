import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// The four nav links — stored as data so we can loop over them
// instead of writing the same JSX four times
const NAV_LINKS = [
  { path: '/',        label: 'Home'    },
  { path: '/about',   label: 'About'   },
  { path: '/work',    label: 'Work'    },
  { path: '/contact', label: 'Contact' },
];

export default function Nav() {
  // open = whether the mobile menu drawer is showing
  const [open, setOpen] = useState(false);

  // useLocation gives us the current URL path, e.g. "/about"
  const location = useLocation();

  // Close the mobile menu whenever the page changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 px-5
      transition-all duration-300
      bg-linen/95 backdrop-blur-md border-b border-taupe`}>
      <nav className="max-w-5xl mx-auto flex items-center justify-between h-16">

        {/* Logo — clicking it always goes home */}
        <Link to="/" className="font-display text-xl font-bold text-ink no-underline">
          Grace<span className="text-olive">.</span>
        </Link>

        {/* Desktop links — hidden on mobile (hidden md:flex) */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map(({ path, label }) => {
            // Is this the page we're currently on?
            const isActive = location.pathname === path;
            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`
                    relative text-base font-robotoCondensed tracking-wide no-underline
                    transition-colors duration-200
                    ${isActive ? 'text-olive' : 'text-ink-soft hover:text-ink'}
                  `}
                >
                  {label}
                  {/* Animated underline for the active page */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-olive"
                    />
                  )}
                </Link>
              </li>
            );
          })}

          {/* CV download button */}
          <li>
            <a
              href="/grace-cv.pdf"
              download
              className="
                px-4 py-2 bg-olive text-cream text-sm font-semibold
                uppercase tracking-widest rounded-sm font-robotoCondensed
                hover:bg-olive-dark transition-colors duration-200
              "
            >
              CV
            </a>
          </li>
        </ul>

        {/* Mobile hamburger button — visible only on small screens (md:hidden) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ink p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer — slides down when open */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-linen border-t border-taupe px-5 pt-6 pb-8"
          >
            <ul className="list-none flex flex-col gap-5">
              {NAV_LINKS.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`
                      font-display text-2xl font-semibold no-underline
                      ${location.pathname === path ? 'text-olive' : 'text-ink'}
                    `}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="/grace-cv.pdf"
                  download
                  className="
                    inline-block px-5 py-3 bg-olive text-cream
                    text-sm font-semibold uppercase tracking-widest
                    rounded-sm
                  "
                >
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}