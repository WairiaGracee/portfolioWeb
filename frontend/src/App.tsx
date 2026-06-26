// React itself
import React from 'react';

// BrowserRouter wraps our app and enables URL-based navigation
// Routes is the container for all our route definitions
// Route maps a URL path to a page component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Our components and pages (we'll create these below)
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';

// The global styles + Tailwind
import './index.css';

export default function App() {
  return (
    // Router must wrap everything that uses navigation
    <Router>
      {/* Nav sits outside Routes so it shows on every page */}
      <Nav />

      {/* Routes looks at the current URL and renders the matching page */}
      <Routes>
        <Route path="/"        element={<Home />}    />
        <Route path="/about"   element={<About />}   />
        <Route path="/work"    element={<Work />}    />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
