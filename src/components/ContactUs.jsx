import React, { useState, useEffect } from 'react';


const AppStyles = () => {
  useEffect(() => {
    // This effect runs once when the component mounts.

    // 1. Add Google Fonts for the 'Inter' font family.
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    fontLink.rel = 'stylesheet';

    document.head.appendChild(fontLink);

    // 2. Apply base styles to the body for the background effect.
    document.body.style.fontFamily = "'Inter', sans-serif";
    document.body.style.backgroundColor = '#1e113a';
    document.body.style.color = '#e0e0e0';
    document.body.classList.add('grid-bg');

    // Cleanup function: This runs when the component unmounts to remove the added elements and styles.
    return () => {
      if (document.head.contains(fontLink)) {
        document.head.removeChild(fontLink);
      }
      document.body.style.fontFamily = '';
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.classList.remove('grid-bg');
    };
  }, []);

  // 3. Render a <style> tag with all the custom CSS from the HTML file.
  return (
    <style>{`
        .grid-bg {
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
            background-size: 40px 40px;
        }
        .main-container {
            background: rgba(10, 5, 25, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .form-card, .info-card {
            background-color: #2c1a4d;
            border: 1px solid #4a2f82;
        }
        .info-header {
            background-color: #5833a4;
        }
        .form-input {
            background-color: #1e113a;
            border: 1px solid #4a2f82;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .form-input:focus {
            outline: none;
            border-color: #a78bfa;
            box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.2);
        }
        .submit-btn {
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }
        .submit-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
        }
        .social-icon {
            background-color: #4a2f82;
            transition: background-color 0.3s ease, transform 0.3s ease;
        }
        .social-icon:hover {
            background-color: #6d28d9;
            transform: scale(1.1);
        }
        .map-container {
            filter: grayscale(1) invert(1) contrast(1.2);
        }
    `}</style>
  );
};


// Main Contact Us Component
export default function ContactUs() {
  const initialFormData = {
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [buttonText, setButtonText] = useState('Submit');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({
      background: 'linear-gradient(90deg, #8b5cf6, #6366f1)',
  });
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Updated form submission handler with backend instructions
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default browser form submission
    setFormError(''); // Clear previous errors

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill out all required fields.");
      return;
    }
    
    // --- BACKEND INTEGRATION STARTS HERE ---

    // 1. Update UI to show submission is in progress
    setButtonText('Sending...');
    setIsButtonDisabled(true);

    try {
      // 2. Make the API call to your backend endpoint using fetch or axios.
      //    Replace 'https://api.example.com/contact' with your actual endpoint.
      const response = await fetch('https://api.example.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // 3. Handle the response from your backend.
      if (response.ok) {
        // SUCCESS: The server responded with a 2xx status code.
        setButtonText('Message Sent! ✓');
        setButtonStyle({ background: 'linear-gradient(90deg, #10b981, #059669)' });
        setFormData(initialFormData); // Clear the form fields
      } else {
        // ERROR: The server responded with a non-2xx status code.
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        setFormError(errorData.message || 'Submission failed. Please try again.');
        setButtonText('Submission Failed!');
        setButtonStyle({ background: 'linear-gradient(90deg, #ef4444, #dc2626)' });
      }
    } catch (error) {
      // NETWORK ERROR: Failed to connect to the server.
      console.error('An error occurred:', error);
      setFormError('A network error occurred. Please check your connection.');
      setButtonText('Network Error!');
      setButtonStyle({ background: 'linear-gradient(90deg, #ef4444, #dc2626)' });
    }

    // --- BACKEND INTEGRATION ENDS HERE ---

    // 4. Revert button state after 3 seconds, regardless of outcome.
    setTimeout(() => {
        setButtonText('Submit');
        setIsButtonDisabled(false);
        setButtonStyle({ background: 'linear-gradient(90deg, #8b5cf6, #6366f1)' });
        setFormError(''); // Clear any error messages
    }, 3000);
  };

  return (
    <>
      <AppStyles />
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3">Contact us</h1>
          <p className="text-lg font-bold text-gray-300">Let's build smarter solutions together.</p>
        </div>

        {/* Main Content Container with blurred background effect */}
        <div className="main-container w-full max-w-7xl mx-auto rounded-2xl p-6 md:p-8">
          <div className="grid lg:grid-cols-12 gap-8">

            {/* Left Section - Company Info */}
            <div className="lg:col-span-4 lg:col-start-2 flex flex-col mb-8 lg:mb-0">
              <div className="text-left mb-6">
                <p className="text-base font-bold text-gray-300 text-center">Innovating Solutions, Empowering Growth.</p>
              </div>
              <div className="info-card rounded-3xl px-6 pt-6 pb-4 shadow-2xl flex-grow">
                <div className="info-header text-center py-3 rounded-lg mb-8">
                  <h2 className="text-xl font-bold text-white">Company Info</h2>
                </div>
                <div className="space-y-6 mb-6">
                  {/* Info Items */}
                  <InfoItem icon={<LocationIcon />} title="Head Office" text="123 Innovation Street, Tech City, Bangladesh" />
                  <InfoItem icon={<PhoneIcon />} title="Let's Talk" text="+880 1234 567890" />
                  <InfoItem icon={<EmailIcon />} title="Email Support" text="hello@company.com" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Stay Connected With Us</h3>
                  <div className="flex space-x-3">
                    <SocialIcon href="#" icon={<FacebookIcon />} />
                    <SocialIcon href="#" icon={<InstagramIcon />} />
                    <SocialIcon href="#" icon={<TwitterIcon />} />
                    <SocialIcon href="#" icon={<LinkedInIcon />} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="lg:col-span-6 mb-6">
              <div className="form-card rounded-3xl p-6 shadow-2xl h-full">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <InputField label="Name*" id="name" type="text" placeholder="Enter name" value={formData.name} onChange={handleInputChange} required />
                    <InputField label="Company (Optional)" id="company" type="text" placeholder="Enter Company name" value={formData.company} onChange={handleInputChange} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <InputField label="Phone*" id="phone" type="tel" placeholder="Enter Phone" value={formData.phone} onChange={handleInputChange} required />
                    <InputField label="Email*" id="email" type="email" placeholder="Enter Email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <InputField label="Subject*" id="subject" type="text" placeholder="Enter Subject" value={formData.subject} onChange={handleInputChange} required />
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message*</label>
                    <textarea id="message" name="message" placeholder="Enter Message" rows="5" required value={formData.message} onChange={handleInputChange} className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 resize-none"></textarea>
                  </div>
                  {formError && <p className="text-red-400 text-sm text-center">{formError}</p>}
                  <button type="submit" className="submit-btn w-full py-3.5 rounded-lg text-white font-semibold text-base" disabled={isButtonDisabled} style={buttonStyle}>
                    {buttonText}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-8 rounded-3xl overflow-hidden shadow-2xl border border-purple-800">
            <div className="map-container h-80 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.678639283793!2d90.39769390000001!3d23.794774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15ea1de1%3A0x97856381e88fb311!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1635959404807!5m2!1sen!2sus"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen="" loading="lazy" title="Google Maps Location of Dhaka, Bangladesh"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper components for cleaner JSX
const InputField = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-xs font-medium text-gray-300 mb-2">{label}</label>
        <input id={id} name={id} {...props} className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-500" />
    </div>
);

const InfoItem = ({ icon, title, text }) => (
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 rounded-full bg-[#1e113a] flex items-center justify-center border border-purple-700 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="text-gray-400 text-xs">{text}</p>
    </div>
  </div>
);

const SocialIcon = ({ href, icon }) => (
    <a href={href} className="social-icon w-10 h-10 rounded-full flex items-center justify-center text-white">
        {icon}
    </a>
);

// SVG Icon Components (Corrected for JSX)
const LocationIcon = () => <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const PhoneIcon = () => <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>;
const EmailIcon = () => <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>;
const FacebookIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>;
const InstagramIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 012.153 1.012A4.902 4.902 0 0121.5 6.082c.25.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.012 2.153 4.902 4.902 0 01-2.153 1.012c-.636.25-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-2.153-1.012A4.902 4.902 0 012.5 17.918c-.25-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.012-2.153A4.902 4.902 0 016.082 2.5c.636-.25 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7.042a4.958 4.958 0 100 9.916 4.958 4.958 0 000-9.916zm0 8.083a3.125 3.125 0 110-6.25 3.125 3.125 0 010 6.25zM17.89 6.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0z" clipRule="evenodd"></path></svg>;
const TwitterIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>;
const LinkedInIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.112 2.25a2.767 2.767 0 012.762 2.763v14.028a2.762 2.762 0 01-2.762 2.762H4.888a2.762 2.762 0 01-2.762-2.762V5.013a2.762 2.762 0 012.762-2.763h14.224zM8.536 18.251V9.764H5.792v8.487h2.744zm-1.372-9.764a1.562 1.562 0 10.001-3.124 1.562 1.562 0 00-.001 3.124zm5.138 9.764V12.72c0-1.432.483-2.404 1.795-2.404 1.218 0 1.565.808 1.565 2.46v5.475h2.744V12.45c0-3.13-1.795-4.575-4.14-4.575a3.593 3.593 0 00-3.32 1.838h-.056v-1.55H9.714v8.487h2.744z" clipRule="evenodd"></path></svg>;

