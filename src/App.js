import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import NotFound from './routes/NotFound';
import './App.css';

const App = () => {
    return (
        <div className="app-container">
            <nav className="nav-container">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
            </nav>
            
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;