import React, { useState, useEffect } from 'react';
import { Briefcase, Zap, BarChart2, CheckCircle, AlertTriangle, Cpu, Check } from 'lucide-react';

// SECTION: TypeScript Interfaces
interface FormData {
  userName: string;
  companyName: string;
  softwareType: string;
  industryDomain: string;
  targetMarket: string;
  adminDashboard: string;
  contentManagement: string;
  authentication: string;
  usersFrom: number;
  usersTo: number;
  extraFeatures: string[];
  thirdPartyServices: string[];
  dataMigration: string;
  uiUxDesign: string;
  performance: string;
  security: string;
  availability: string;
  timeline: number;
  currency: string;
}

// SECTION: Main Component
export default function PricePredictor() {
  // --- STATE MANAGEMENT ---
  const initialFormData: FormData = {
    userName: '',
    companyName: '',
    softwareType: 'Web', industryDomain: 'Ecommerce', targetMarket: 'Local',
    adminDashboard: 'None', contentManagement: 'None', authentication: 'None',
    usersFrom: 1, usersTo: 10, extraFeatures: [], thirdPartyServices: [],
    dataMigration: 'No', uiUxDesign: 'Basic', performance: 'Basic',
    security: 'None', availability: 'Normal', timeline: 1, currency: 'USD',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [prediction, setPrediction] = useState<{ value: number; currency: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'initial' | 'loading' | 'result' | 'error'>('initial');

  // --- FORM HANDLERS ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumberInput = e.target.type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumberInput ? Number(value) : value }));
  };
  
  const handleMultiSelectChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field] as string[];
      const newValues = currentValues.includes(value) ? currentValues.filter(item => item !== value) : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };
  
  // --- BACKEND INTEGRATION ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setView('loading');

    // INSTRUCTION: Replace this with your actual ML model's API endpoint.
    const API_ENDPOINT = 'https://api.your-backend.com/predict'; 

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      const mockApiResponse = {
          predictedPrice: Math.floor(Math.random() * (25000 - 5000 + 1)) + 5000,
          currency: formData.currency,
      };
      
      const result = mockApiResponse;
      setPrediction({ value: result.predictedPrice, currency: result.currency });
      setView('result');

    } catch (err: any) {
      setError(err.message || 'A network error occurred.');
      setView('error');
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX RENDER ---
  return (
    <>
      <PredictorStyles />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        
        <div className="text-center mb-10 z-10">
          <h1 className="animated-title text-5xl md:text-6xl font-extrabold mb-4">AI Price Predictor</h1>
          <p className="text-xl font-medium text-gray-300">Fill out the form to estimate your project cost.</p>
        </div>

        <div className="main-container w-full max-w-7xl mx-auto rounded-2xl p-6 md:p-10 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
            
            {/* --- LEFT COLUMN (FORM) --- */}
            <div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
                <LabeledTextInput label="Your Name" name="userName" value={formData.userName} onChange={handleInputChange} placeholder="Jane Doe" />
                <LabeledTextInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Acme Inc." />
                <SelectInput label="Software Type" name="softwareType" value={formData.softwareType} onChange={handleInputChange} options={['Web', 'Mobile', 'Desktop', 'Web & Mobile']} />
                <SelectInput label="Industry Domain" name="industryDomain" value={formData.industryDomain} onChange={handleInputChange} options={['Ecommerce', 'Healthcare', 'Finance', 'Education', 'Entertainment']} />
                <SelectInput label="Target Market" name="targetMarket" value={formData.targetMarket} onChange={handleInputChange} options={['Local', 'National', 'Global']} />
                <SelectInput label="Admin Dashboard" name="adminDashboard" value={formData.adminDashboard} onChange={handleInputChange} options={['None', 'Basic', 'Advanced']} />
                <SelectInput label="Content Management" name="contentManagement" value={formData.contentManagement} onChange={handleInputChange} options={['None', 'Basic CMS', 'Headless CMS']} />
                <SelectInput label="Authentication" name="authentication" value={formData.authentication} onChange={handleInputChange} options={['None', 'Email & Password', 'Social Logins', '2FA']} />
                
                <div className="sm:col-span-2">
                  <label className="block text-base font-medium text-gray-300 mb-2">Number of Users (From / To)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput type="number" name="usersFrom" value={String(formData.usersFrom)} onChange={handleInputChange} placeholder="From" />
                    <TextInput type="number" name="usersTo" value={String(formData.usersTo)} onChange={handleInputChange} placeholder="To" />
                  </div>
                </div>

                <MultiSelectInput label="Extra Features" options={['Search & Filter', 'AI/ML Module', 'Reporting & Analysis', 'File Handling']} selectedOptions={formData.extraFeatures} onChange={(v) => handleMultiSelectChange('extraFeatures', v)} />
                <MultiSelectInput label="Third-party Services" options={['Analytics', 'Payment Gateway', 'Map', 'Mail']} selectedOptions={formData.thirdPartyServices} onChange={(v) => handleMultiSelectChange('thirdPartyServices', v)} />
                
                <SelectInput label="UI/UX Design" name="uiUxDesign" value={formData.uiUxDesign} onChange={handleInputChange} options={['Basic', 'Standard', 'Premium']} />
                <SelectInput label="Data Migration" name="dataMigration" value={formData.dataMigration} onChange={handleInputChange} options={['No', 'Basic', 'Complex']} />
                
                <NumberInput label="Timeline (months)" name="timeline" value={formData.timeline} onChange={handleInputChange} min={1} />
                <SelectInput label="Currency" name="currency" value={formData.currency} onChange={handleInputChange} options={['USD', 'EUR', 'BDT', 'INR']} />
                
                <div className="sm:col-span-2 mt-4">
                  <button type="submit" className="predict-btn w-full py-4 rounded-lg text-white font-semibold text-xl" disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : 'Predict Price'}
                  </button>
                </div>
              </form>
            </div>

            {/* --- RIGHT COLUMN (DYNAMIC VIEW) --- */}
            <div className="left-panel flex flex-col justify-center items-center text-center p-8 h-full min-h-[400px] lg:min-h-0 order-first lg:order-last mb-8 lg:mb-0">
               {view === 'initial' && <InitialInstructions />}
               {view === 'loading' && <LoadingState />}
               {view === 'error' && <ErrorState message={error || 'An unknown error occurred.'} onReset={() => setView('initial')} />}
               {view === 'result' && prediction && <PredictionResult result={prediction} onReset={() => setView('initial')} />}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}


// SECTION: Left Panel Components
const InitialInstructions = () => (
  <div className="animate-fade-in space-y-6">
    <Briefcase className="mx-auto h-16 w-16 text-violet-400" strokeWidth={1.5} />
    <h2 className="text-4xl font-bold text-white">Project Cost Estimator</h2>
    <p className="text-lg text-gray-300 max-w-md">
      Provide details about your project in the form on the left. Our AI model will analyze your requirements to generate a cost estimation.
    </p>
    <ul className="text-left space-y-3 text-gray-400 inline-block">
        <li className="flex items-center gap-3"><Zap size={20} className="text-violet-400" /> Comprehensive Feature Analysis</li>
        <li className="flex items-center gap-3"><BarChart2 size={20} className="text-violet-400" /> Data-Driven Predictions</li>
        <li className="flex items-center gap-3"><CheckCircle size={20} className="text-violet-400" /> Instant & Transparent Results</li>
    </ul>
  </div>
);

const LoadingState = () => (
  <div className="animate-fade-in space-y-6">
    <Cpu className="mx-auto h-16 w-16 text-violet-400 animate-pulse" strokeWidth={1.5} />
    <h2 className="text-4xl font-bold text-white">Calculating...</h2>
    <p className="text-lg text-gray-300">Our AI is processing your project specifications.</p>
  </div>
);

const ErrorState = ({ message, onReset }: { message: string, onReset: () => void }) => (
  <div className="animate-fade-in space-y-6">
    <AlertTriangle className="mx-auto h-16 w-16 text-red-400" strokeWidth={1.5} />
    <h2 className="text-4xl font-bold text-white">An Error Occurred</h2>
    <p className="text-lg text-red-300">{message}</p>
    <button onClick={onReset} className="reset-btn mt-4">Try Again</button>
  </div>
);

const PredictionResult = ({ result, onReset }: { result: { value: number; currency: string }, onReset: () => void }) => {
    const [displayValue, setDisplayValue] = useState(0);
    useEffect(() => {
        let start = 0; const end = result.value; if (start === end) return;
        const duration = 1500; const increment = end / (duration / 10);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) { start = end; clearInterval(timer); }
            setDisplayValue(Math.ceil(start));
        }, 10);
        return () => clearInterval(timer);
    }, [result.value]);

    return (
        <div className="animate-result-pop-in space-y-4 w-full">
            <p className="text-2xl text-gray-300">Estimated Project Cost</p>
            <div className="price-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white my-4">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: result.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(displayValue)}
            </div>
            <p className="text-base text-gray-400 max-w-sm mx-auto">This is an AI-generated estimate. Actual costs may vary.</p>
            <button onClick={onReset} className="reset-btn mt-6">Calculate Another</button>
        </div>
    );
};


// SECTION: Form Helper Components
const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 text-lg" />;
const LabeledTextInput = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div>
        <label htmlFor={props.name} className="block text-base font-medium text-gray-300 mb-2">{label}</label>
        <input {...props} className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 text-lg" />
    </div>
);
const NumberInput = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div>
        <label htmlFor={props.name} className="block text-base font-medium text-gray-300 mb-2">{label}</label>
        <input type="number" {...props} className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 text-lg" />
    </div>
);
const SelectInput = ({ label, options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, options: string[] }) => (
  <div>
    <label htmlFor={props.name} className="block text-base font-medium text-gray-300 mb-2">{label}</label>
    <select {...props} className="form-input w-full px-4 py-3 rounded-lg text-white text-lg">
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const CheckboxIndicator = ({ isSelected }: { isSelected: boolean }) => (
    <div className={`w-5 h-5 flex-shrink-0 rounded flex items-center justify-center border-2 transition-colors ${isSelected ? 'bg-violet-500 border-violet-400' : 'border-gray-500'}`}>
        {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
    </div>
);

const MultiSelectInput = ({ label, options, selectedOptions, onChange }: { label: string, options: string[], selectedOptions: string[], onChange: (value: string) => void }) => (
  <div className="sm:col-span-2">
    <label className="block text-base font-medium text-gray-300 mb-2">{label}</label>
    <div className="multi-select-box p-2 rounded-lg h-32 overflow-y-auto space-y-1">
      {options.map(opt => {
        const isSelected = selectedOptions.includes(opt);
        return (
          <div key={opt} onClick={() => onChange(opt)} className={`flex items-center gap-3 cursor-pointer p-2.5 rounded-md text-base transition-colors ${isSelected ? 'bg-violet-600 font-semibold' : ''} text-white hover:bg-violet-900/50`}>
            <CheckboxIndicator isSelected={isSelected} />
            <span>{opt}</span>
          </div>
        );
      })}
    </div>
  </div>
);


// SECTION: Styling Component
const PredictorStyles = () => {
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    document.body.style.fontFamily = "'Inter', sans-serif";
    document.body.style.backgroundColor = '#1e113a';
    document.body.classList.add('grid-bg');
    return () => {
      if (document.head.contains(fontLink)) document.head.removeChild(fontLink);
      document.body.classList.remove('grid-bg');
    };
  }, []);

  return (
    <style>{`
      @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      @keyframes pop-in { 0% { opacity: 0; transform: scale(0.8) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
      @keyframes shimmer { 0% { background-position: -500% 0; } 100% { background-position: 500% 0; } }
      .animate-fade-in { animation: fade-in 0.6s ease-in-out forwards; }
      .animate-result-pop-in { animation: pop-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .animated-title { background: linear-gradient(90deg, #a78bfa, #ffffff, #a78bfa); background-size: 200% auto; color: #fff; background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 10s linear infinite; }
      .grid-bg { background-color: #1e113a; background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 40px 40px; }
      .main-container { background: rgba(13, 5, 31, 0.4); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.1); }
      .left-panel { background: rgba(13, 5, 31, 0.6); border-radius: 1rem; border: 1px solid rgba(255, 255, 255, 0.1); }
      .price-display { text-shadow: 0 0 15px rgba(167, 139, 250, 0.6), 0 0 30px rgba(167, 139, 250, 0.4); }
      .form-input, .multi-select-box { background-color: #1e113a; border: 1px solid #4a2f82; transition: border-color 0.3s ease, box-shadow 0.3s ease; }
      select.form-input { appearance: none; background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"); background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 2.5rem; }
      .form-input:focus, .multi-select-box:focus-within { outline: none; border-color: #a78bfa; box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.3); }
      option { background: #1e113a; color: #e0e0e0; }
      .predict-btn { background: linear-gradient(90deg, #8b5cf6, #6366f1); transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4); }
      .predict-btn:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 30px rgba(139, 92, 246, 0.5); }
      .predict-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      .reset-btn { background-color: rgba(30, 17, 58, 0.8); border: 1px solid #4a2f82; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; color: white; transition: all 0.3s ease; }
      .reset-btn:hover { background-color: #4a2f82; border-color: #a78bfa; }
    `}</style>
  );
};




