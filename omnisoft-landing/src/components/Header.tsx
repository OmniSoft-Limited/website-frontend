import React, { useState } from 'react';
import { Search, User, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation items - easy to modify for backend integration
  const navItems = [
    { label: 'Home', href: '#home', active: true },
    { label: 'Services', href: '#services', active: false },
    { label: 'Templates', href: '#templates', active: false },
    { label: 'API', href: '#api', active: false },
    { label: 'Blog', href: '#blog', active: false },
    { label: 'About', href: '#about', active: false }
  ];

  // Handle search submission - ready for backend integration
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // TODO: Integrate with backend search API
  };

  // Handle login - ready for authentication integration
  const handleLogin = () => {
    console.log('Login clicked');
    // TODO: Redirect to login page or open modal
  };

  return (
    <header className={`w-full border-b ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full border-2 ${darkMode ? 'border-blue-400' : 'border-blue-600'} mr-3`}>
              {/* Logo placeholder - replace with actual logo */}
            </div>
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              OmniSoft
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  item.active
                    ? darkMode ? 'text-blue-400' : 'text-blue-600'
                    : darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-48 px-4 py-2 pl-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </form>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border rounded-lg transition-colors duration-200 ${
                darkMode
                  ? 'border-slate-600 text-gray-300 hover:bg-slate-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? 'text-yellow-400 hover:bg-slate-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;