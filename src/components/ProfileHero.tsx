import React from 'react';
import { 
  Calendar, 
  MessageCircle, 
  Mail, 
  Phone, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Globe,
  Sparkles
} from 'lucide-react';
import { PROFILE_DATA } from '../data/blogData';

interface ProfileHeroProps {
  onOpenCalendly: () => void;
  onOpenHireModal: () => void;
  onExploreCapabilities: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  onOpenCalendly,
  onOpenHireModal,
  onExploreCapabilities
}) => {
  const whatsappUrl = `https://wa.me/8809611056361?text=${encodeURIComponent('Hello M R S, I saw your professional Gravatar profile and would like to discuss remote work / IT support.')}`;

  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 pt-8 sm:pt-12 pb-12 sm:pb-16 transition-colors">
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Avatar & Quick Trust Badges */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative group">
              {/* Monogram Emblem */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 shadow-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center text-4xl sm:text-5xl font-extrabold tracking-tight">
                MRS
              </div>

              {/* Verified Gravatar Pill */}
              <a
                href={PROFILE_DATA.gravatarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 lg:left-4 lg:translate-x-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-[11px] font-semibold shadow-md hover:scale-105 transition-transform"
                title="View verified Gravatar profile"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                <span>Gravatar Verified</span>
              </a>
            </div>

            {/* Availability Status */}
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Remote Work &amp; IT Support</span>
            </div>

            {/* Direct Contact Links */}
            <div className="mt-4 flex flex-col gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <a
                href={`tel:${PROFILE_DATA.phone}`}
                className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-2 transition-colors justify-center lg:justify-start"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-medium">{PROFILE_DATA.phoneFormatted}</span>
              </a>
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-2 transition-colors justify-center lg:justify-start"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-medium truncate">{PROFILE_DATA.email}</span>
              </a>
            </div>

            {/* Verified Social Handles */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <a
                href={PROFILE_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={PROFILE_DATA.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                X {PROFILE_DATA.twitterHandle}
              </a>
              <a
                href={PROFILE_DATA.blueskyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                Bluesky
              </a>
              <a
                href={PROFILE_DATA.wordpressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                WordPress
              </a>
            </div>

          </div>

          {/* Right Column: Full Professional Presentation */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            {/* Identity Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
              <span>Professional Portfolio &amp; Services</span>
              <span aria-hidden="true">·</span>
              <span>mrxshahin</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              {PROFILE_DATA.displayName}
            </h1>

            <p className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200 mt-2">
              {PROFILE_DATA.headline}
            </p>

            {/* Sub-headline description */}
            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {PROFILE_DATA.subHeadline}
            </p>

            {/* Quote Callout */}
            <blockquote className="mt-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 italic flex items-start gap-3">
              <span className="text-2xl leading-none text-amber-500 font-serif">“</span>
              <div>
                <p className="font-serif-content text-neutral-800 dark:text-neutral-200">
                  {PROFILE_DATA.quote}
                </p>
                <footer className="mt-1 text-xs not-italic text-neutral-500 dark:text-neutral-400 font-medium">
                  — Dedicated to accuracy, asynchronous agility &amp; independent problem-solving.
                </footer>
              </div>
            </blockquote>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenCalendly}
                className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 transition-all shadow-sm flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-400 dark:text-amber-600" />
                <span>Schedule Call (Calendly)</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {PROFILE_DATA.phoneFormatted}</span>
              </a>

              <button
                onClick={onOpenHireModal}
                className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                Hire / Inquire Online
              </button>
            </div>

            {/* Verified Background Metrics Bar */}
            <div className="mt-8 pt-6 border-t border-neutral-200/80 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              {PROFILE_DATA.credentials.map((cred, idx) => (
                <div key={idx}>
                  <div className="text-xs uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400">
                    {cred.label}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white mt-0.5 leading-snug">
                    {cred.value}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
