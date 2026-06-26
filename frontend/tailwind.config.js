/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind which files to scan for class names
  // If a class isn't used in these files, Tailwind won't include it
  content: ["./src/**/*.{ts,tsx}"],

  theme: {
    extend: {
      // These are Grace's custom colours — we give them names
      // so we can write bg-linen, text-olive, etc. anywhere
      colors: {
        linen:     "#F5F0E8",   // warm off-white background
        "nude-card": "#EDE6D6", // slightly darker for cards
        taupe:     "#C4B99A",   // borders and dividers
        olive:     "#6B7C5C",   // primary green accent
        "olive-dark": "#4A5740",// hover state for olive
        ink:       "#2C2A26",   // near-black for headings
        "ink-soft":"#5A5650",   // softer for body text
        cream:     "#FDFCF9",   // pure off-white
      },
      fontFamily: {
        // Display = big headings (Playfair — elegant serif)
        display: ["'Playfair Display'", "serif"],
        // Body = paragraphs and UI (Inter — clean sans-serif)
        sans: ["'Inter'", "sans-serif"],
        // Mono = code tags, labels (DM Mono — technical feel)
        mono: ["'DM Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

