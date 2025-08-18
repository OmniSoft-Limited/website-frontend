import React from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  // Footer navigation data - easily manageable
  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Custom Development', href: '#development' },
        { label: 'Cloud Solutions', href: '#cloud' },
        { label: 'Data Analytics', href: '#analytics' },
        { label: 'Mobile Apps', href: '#mobile' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Our Team', href: '#team' },
        { label: 'Careers', href: '#careers' },
        { label: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'API Reference', href: '#api' },
        { label: 'Blog', href: '#blog' },
        { label: 'Support', href: '#support' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#github', label: 'GitHub' },
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' }
  ];

  return (
    <footer className={`py-16 border-t ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo */}
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full border-2 ${darkMode ? 'border-blue-400' : 'border-blue-600'} mr-3`}>
                {/* Logo placeholder */}
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                OmniSoft
              </span>
            </div>

            {/* Company Description */}
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              Empowering businesses with cutting-edge software solutions. 
              We turn complex challenges into elegant, scalable solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  hello@omnisoft.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  San Francisco, CA
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700' 
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                    title={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Navigation */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`transition-colors duration-200 hover:text-blue-600 ${
                        darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className={`p-8 rounded-2xl mb-12 ${
          darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Stay Updated
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Get the latest updates on our products and industry insights.
              </p>
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ${
          darkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2024 OmniSoft. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#privacy" 
              className={`text-sm transition-colors duration-200 hover:text-blue-600 ${
                darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500'
              }`}
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className={`text-sm transition-colors duration-200 hover:text-blue-600 ${
                darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500'
              }`}
            >
              Terms of Service
            </a>
            <a 
              href="#cookies" 
              className={`text-sm transition-colors duration-200 hover:text-blue-600 ${
                darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500'
              }`}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;