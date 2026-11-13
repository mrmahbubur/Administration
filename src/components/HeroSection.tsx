import React from 'react';
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, Sparkles, Code2, Users, Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import { BLOG_METADATA, PROFILE_DATA } from '../data/blogData';

interface HeroSectionProps {
  onExploreHub: (category: string) => void;
  onOpenConsultation: () => void;
  onReadFeatured: () => void;
  onOpenCalendly: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreHub,
  onOpenConsultation,
  onReadFeatured,
  onOpenCalendly
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Editorial Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Quiet Kicker with Gravatar Verification */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3">
              <span>The M R S Multiverse</span>
              <span aria-hidden="true">·</span>
              <span>Online Entrepreneurship &amp; Digital Growth</span>
              <span aria-hidden="true">·</span>
              <a
                href={PROFILE_DATA.gravatarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Gravatar Verified ({PROFILE_DATA.username})</span>
              </a>
            </div>

            {/* Author Avatar + Name Row */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="relative w-12 h-12 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-extrabold text-lg flex items-center justify-center border border-neutral-800 dark:border-neutral-200 shrink-0">
                M
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-neutral-900 rounded-full" />
              </div>
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-white leading-tight">
                  {PROFILE_DATA.displayName} <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">(@{PROFILE_DATA.username})</span>
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {PROFILE_DATA.headline}
                </p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
              This is M R S multiverse
            </h1>

            {/* Editorial Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              Welcome! I&apos;m <strong>M R S</strong> — a passionate online entrepreneur, web manager, and digital creator. Through my various platforms, I share practical strategies to help you succeed, increase your income, and stay ahead in the digital economy.
            </p>

            {/* Iconic Quote Callout */}
            <blockquote className="mt-5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 text-sm text-neutral-700 dark:text-neutral-300 italic flex items-start gap-3">
              <span className="text-2xl leading-none text-amber-500 font-serif">“</span>
              <div>
                <p className="font-serif-content text-neutral-800 dark:text-neutral-200">
                  {BLOG_METADATA.quote}
                </p>
                <footer className="mt-1 text-xs not-italic text-neutral-500 dark:text-neutral-400 font-medium">
                  — M R S, Founder &amp; Web Manager · Certified Systems Specialist
                </footer>
              </div>
            </blockquote>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onReadFeatured}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 transition-all shadow-sm flex items-center gap-2 group"
              >
                <span>Read Portfolio Welcome</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={onOpenCalendly}
                className="px-4 py-2.5 rounded-lg text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Book Call (Calendly)</span>
              </button>

              <button
                onClick={() => onExploreHub('Student Earning')}
                className="px-4 py-2.5 rounded-lg text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Student Earning Corner</span>
              </button>
            </div>

            {/* Verified Metrics Bar */}
            <div className="mt-8 pt-6 border-t border-neutral-200/80 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">360-Hour</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Certified Systems</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Since 2018</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Tech Documentation</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Async-Ready</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Cross Time Zones</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Charity</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Poverty Relief</div>
              </div>
            </div>

          </div>

          {/* Right Pillar Cards Showcase (Unchanged Structure) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              Core Ecosystem Pillars
            </div>

            {/* Pillar 1 */}
            <div 
              onClick={() => onExploreHub('Business Hub')}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      01. Business Hub
                    </h3>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                    Actionable advice, scaling blueprints, and frameworks to turn micro-ideas into sustainable revenue.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div 
              onClick={() => onExploreHub('Money-Making')}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      02. Money-Making Platform
                    </h3>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                    Tested strategies, side gigs, and digital asset tips designed for students and working professionals.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div 
              onClick={() => onExploreHub('Tech & Tricks')}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      03. Learning &amp; Tech Tricks
                    </h3>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                    Blogspot optimization, speed boosts, SEO tactics, and digital skills to maintain a modern web presence.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 4 */}
            <div 
              onClick={() => onExploreHub('Future Tech')}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      04. Planned Projects &amp; AI Tools
                    </h3>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                    Planned tracking connectivity app to keep loved ones safe alongside AI-assisted resource tools.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
