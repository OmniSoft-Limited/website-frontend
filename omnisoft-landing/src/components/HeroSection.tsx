import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ darkMode }) => {
  // Project showcase data - easily manageable from backend
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Modern shopping experience with AI recommendations',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'Node.js', 'AI/ML']
    },
    {
      id: 2,
      title: 'Healthcare Dashboard',
      description: 'Real-time patient monitoring and analytics',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Vue.js', 'Python', 'IoT']
    },
    {
      id: 3,
      title: 'Financial Analytics',
      description: 'Advanced trading algorithms and risk management',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Angular', 'Java', 'Blockchain']
    },
    {
      id: 4,
      title: 'Smart City IoT',
      description: 'Connected infrastructure management system',
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React Native', 'AWS', 'IoT']
    }
  ];

  const [currentProject, setCurrentProject] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [projects.length]);

  // Manual navigation
  const goToProject = (index: number) => {
    setCurrentProject(index);
  };

  // Handle CTA button click - ready for backend integration
  const handleGetStarted = () => {
    console.log('Get Started clicked');
    // TODO: Navigate to signup or demo page
  };

  const handleLearnMore = () => {
    console.log('Learn More clicked');
    // TODO: Scroll to features or navigate to about page
  };

  return (
    <section className={`pt-4 pb-20 ${darkMode ? 'bg-slate-900' : 'bg-white'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            
            

            {/* Main Headline */}
            <h1 className={`text-4xl lg:text-4xl font-bold leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Enterprise Software
              <span className="text-blue-600 dark:text-blue-400"> Solutions</span>
            </h1>

            {/* Subheading */}
            <p className={`text-xl leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Streamline your business operations with our cutting-edge software solutions. 
              Built for scale, designed for efficiency, powered by AI.
            </p>

            {/* Feature Highlights */}
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

            {/* CTA Buttons */}
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

          {/* Right Column - Visual Content */}
          <div className="relative">
            {/* Project Showcase Carousel */}
            <div className={`rounded-2xl p-4 shadow-2xl ${
              darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="space-y-4">
                {/* Carousel Header */}
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Our Latest Projects
                  </h3>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {currentProject + 1} / {projects.length}
                  </div>
                </div>

                {/* Image Carousel */}
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentProject * 100}%)` }}
                  >
                    {projects.map((project) => (
                      <div key={project.id} className="w-full h-full flex-shrink-0 relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h4 className="font-semibold text-lg">{project.title}</h4>
                          <p className="text-sm opacity-90">{project.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-3">
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {projects[currentProject].title}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {projects[currentProject].description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {projects[currentProject].tech.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full ${
                          darkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center space-x-2 pt-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToProject(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentProject
                          ? darkMode ? 'bg-blue-400' : 'bg-blue-600'
                          : darkMode ? 'bg-slate-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Stats Grid */}
                
              </div>
            </div>

            {/* Floating AI Badge */}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;