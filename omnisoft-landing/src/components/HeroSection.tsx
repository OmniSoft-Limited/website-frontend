import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
}

// --- Add a type for your project data ---
interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

// --- Dummy data for the project showcase carousel ---
// TODO: Replace this with your actual project data
const featuredProjects: Project[] = [
  { id: 1, title: 'Project Alpha', category: 'E-commerce Platform', imageUrl: 'https://via.placeholder.com/500x350/3B82F6/FFFFFF?text=Project+Alpha' },
  { id: 2, title: 'Project Beta', category: 'FinTech Solution', imageUrl: 'https://via.placeholder.com/500x350/10B981/FFFFFF?text=Project+Beta' },
  { id: 3, title: 'Project Gamma', category: 'AI Analytics Dashboard', imageUrl: 'https://via.placeholder.com/500x350/8B5CF6/FFFFFF?text=Project+Gamma' },
];

const HeroSection: React.FC<HeroSectionProps> = ({ darkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- NEW: Logic for the custom carousel ---
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, [nextSlide]);

  const handleGetStarted = () => {
    console.log('Get Started clicked');
  };

  const handleLearnMore = () => {
    console.log('Learn More clicked');
  };

  return (
    <section className={`pt-8 pb-20 ${darkMode ? 'bg-slate-900' : 'bg-white'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content (No changes here) */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                AI-Powered Solutions
              </span>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Enterprise Software
              <span className="text-blue-600 dark:text-blue-400"> Solutions</span>
            </h1>
            <p className={`text-xl leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Streamline your business operations with our cutting-edge software solutions.
              Built for scale, designed for efficiency, powered by AI.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Enterprise Security
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Global Scale
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  AI Integration
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={handleLearnMore}
                className={`inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'text-white border border-slate-600 hover:bg-slate-800'
                    : 'text-gray-900 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* --- MODIFIED: Right Column - Custom Project Showcase Carousel --- */}
          <div className="relative">
            <div className={`relative w-full h-[350px] overflow-hidden rounded-2xl shadow-2xl ${darkMode ? 'border border-slate-700' : 'border border-gray-200'}`}>
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-gray-200">{project.category}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating AI Chatbot Button */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;