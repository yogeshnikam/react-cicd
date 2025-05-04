import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Preload from './components/Preload';
import './App.css';

// Lazy load components
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const NotFound = lazy(() => import('./routes/NotFound'));

// Loading component
const Loading = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

const App = () => {
  return (
    <div className="app-container">
      <Preload />
      <nav className="nav-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
      <main className="main-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;