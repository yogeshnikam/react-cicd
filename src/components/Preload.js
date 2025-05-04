import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Preload = () => {
  const location = useLocation();

  useEffect(() => {
    // Preload the next likely route
    if (location.pathname === '/') {
      import('../routes/About').catch(error => {
        console.error('Failed to preload About component:', error);
      });
    } else if (location.pathname === '/about') {
      import('../routes/Home').catch(error => {
        console.error('Failed to preload Home component:', error);
      });
    }
  }, [location.pathname]);

  return <div data-testid="preload" />;
};

export default Preload; 