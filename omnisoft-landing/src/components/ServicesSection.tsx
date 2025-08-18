import React from 'react';
import { Code, Database, Cloud, Smartphone, Shield, Zap } from 'lucide-react';

interface ServicesSectionProps {
  darkMode: boolean;
}

// Service data structure - easy to manage from backend
const services = [
  {
    id: 1,
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored software solutions built specifically for your business needs and requirements.',
    features: ['Full-stack development', 'API integrations', 'Custom workflows']
  },
  {
    id: 2,
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services for modern businesses.',
    features: ['Cloud migration', 'Auto-scaling', '99.9% uptime SLA']
  },
  {
    id: 3,
    icon: Database,
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights with our advanced analytics platform.',
    features: ['Real-time dashboards', 'Predictive analytics', 'Custom reporting']
  },
  {
    id: 4,
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that engage your customers.',
    features: ['iOS & Android', 'Offline capabilities', 'Push notifications']
  },
  {
    id: 5,
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and data.',
    features: ['Threat monitoring', 'Compliance audits', '24/7 support']
  },
  {
    id: 6,
    icon: Zap,
    title: 'AI Integration',
    description: 'Leverage artificial intelligence to automate processes and gain competitive advantage.',
    features: ['Machine learning', 'Natural language processing', 'Automation']
  }
];

const ServicesSection: React.FC<ServicesSectionProps> = ({ darkMode }) => {
  // Handle service card click - ready for routing integration
  const handleServiceClick = (serviceId: number) => {
    console.log('Service clicked:', serviceId);
    // TODO: Navigate to service detail page or open modal
  };

  return (
    <section className={`py-20 ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Services
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Comprehensive software solutions designed to drive your business forward. 
            From custom development to AI integration, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`group p-8 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl ${
                  darkMode
                    ? 'bg-slate-900 border-slate-700 hover:border-blue-500'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                {/* Service Icon */}
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${
                    darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                </div>

                {/* Service Content */}
                <div className="space-y-4">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                  
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {service.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          darkMode ? 'bg-blue-400' : 'bg-blue-600'
                        }`}></div>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Arrow */}
                <div className={`mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                  <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    Learn more →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className={`inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-8 rounded-2xl ${
            darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="text-center sm:text-left">
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Need a custom solution?
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Let's discuss your unique requirements and build something amazing together.
              </p>
            </div>
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;