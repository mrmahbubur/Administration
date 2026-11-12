import React, { useState } from 'react';
import { 
  Monitor, 
  CheckSquare, 
  Globe, 
  FileText, 
  Search, 
  Sparkles, 
  Share2, 
  Check, 
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { PROFESSIONAL_CAPABILITIES, PROFILE_DATA } from '../data/blogData';

interface CapabilitiesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>(PROFESSIONAL_CAPABILITIES[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return Monitor;
      case 'CheckSquare':
        return CheckSquare;
      case 'Globe':
        return Globe;
      case 'FileText':
        return FileText;
      case 'Search':
        return Search;
      case 'Sparkles':
        return Sparkles;
      case 'Share2':
        return Share2;
      default:
        return Briefcase;
    }
  };

  const currentCapability = PROFESSIONAL_CAPABILITIES.find(c => c.id === activeTab) || PROFESSIONAL_CAPABILITIES[0];
  const CurrentIcon = getIcon(currentCapability.icon);

  return (
    <section id="capabilities-section" className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900/40 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Comprehensive Skill Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            What I Can Do For You
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            Certified technical problem-solving, virtual assistance, and digital documentation delivered with accuracy, reliability, and minimal back-and-forth.
          </p>
        </div>

        {/* Interactive Segmented Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {PROFESSIONAL_CAPABILITIES.map((cap) => {
            const Icon = getIcon(cap.icon);
            const isActive = activeTab === cap.id;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveTab(cap.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  isActive
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 border-neutral-950 dark:border-white shadow-xs'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cap.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Capability Details Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Detail */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-center shrink-0">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {currentCapability.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                    {currentCapability.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {currentCapability.summary}
              </p>

              {/* Verified Tasks Checklist */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  Key Deliverables &amp; Support Areas:
                </h4>
                <div className="space-y-2.5">
                  {currentCapability.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action & Why Work With Me */}
            <div className="lg:col-span-5 bg-neutral-50/70 dark:bg-neutral-800/40 p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 flex flex-col justify-between h-full space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  Why Clients Rely On M R S
                </h4>
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {PROFILE_DATA.whyWorkWithMe.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
                <button
                  onClick={() => onSelectService(currentCapability.title)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>Request {currentCapability.title.split('&')[0]} Support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/8809611056361?text=${encodeURIComponent(`Hi M R S, I am interested in hiring you for ${currentCapability.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Discuss</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
