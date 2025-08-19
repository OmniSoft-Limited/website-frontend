import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import FloatingAIChatbot from './components/FloatingAIChatbot';
import Footer from './components/Footer';

function App() {
  // Dark mode state management - could be connected to user preferences in backend
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Toggle dark mode and persist to localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Apply dark mode class to document root for global styling
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-slate-900' : 'bg-white'
    }`}>
      {/* Header - Fixed navigation with search and login */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Content */}
      <main>
        {/* Hero Section - Main value proposition and CTA */}
        <HeroSection darkMode={darkMode} />
        
        {/* Services Section - Our offerings and capabilities */}
        <ServicesSection darkMode={darkMode} />
        
        {/* Additional sections can be added here:
            - Features/Benefits section
            - Testimonials/Social proof
            - Case studies
            - Pricing plans
            - FAQ section
        */}
      </main>

      {/* Footer - Links, contact info, newsletter */}
      <Footer darkMode={darkMode} />
      
      {/* Floating AI Chatbot - Available on all pages */}
      <FloatingAIChatbot darkMode={darkMode} />
    </div>
  );
}

export default App;