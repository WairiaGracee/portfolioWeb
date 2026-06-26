import React, { useRef } from 'react';
// motion = animatable version of HTML elements
// useInView = fires when an element enters the screen
import { motion, useInView } from 'framer-motion';

// TypeScript interface = a contract that says:
// "anyone using FadeIn must pass these props"
interface FadeInProps {
  children: React.ReactNode; // whatever you nest inside <FadeIn>
  delay?: number;            // optional: wait X seconds before animating
  direction?: 'up' | 'left' | 'none'; // optional: which way to slide in
  className?: string;        // optional: extra Tailwind classes
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: FadeInProps) {
  // useRef gives us a handle to the actual DOM element
  const ref = useRef(null);

  // isInView becomes true when the element scrolls into view
  // once: true = only animate once, not every time you scroll past
  // margin: '-60px' = trigger slightly before it's fully visible
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      // Start hidden and offset
      initial={{
        opacity: 0,
        y: direction === 'up' ? 24 : 0,
        x: direction === 'left' ? -24 : 0,
      }}
      // Animate to visible when in view
      animate={isInView
        ? { opacity: 1, y: 0, x: 0 }
        : { opacity: 0, y: direction === 'up' ? 24 : 0, x: direction === 'left' ? -24 : 0 }
      }
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}