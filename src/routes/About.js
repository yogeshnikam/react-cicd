import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>This is a React application demonstrating:</p>
            <ul>
                <li>Redux Toolkit for state management</li>
                <li>Redux Saga for side effects</li>
                <li>React Router for navigation</li>
                <li>Code splitting for performance</li>
                <li>Webpack configuration for different environments</li>
            </ul>
            <Link to="/" className="home-link">Go to Home</Link>
        </div>
    );
};

export default About; 