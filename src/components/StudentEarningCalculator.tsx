import React, { useState } from 'react';
import {
  Compass,
  Clock,
  Laptop,
  Smartphone,
  MessageCircle,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';

export const StudentEarningCalculator: React.FC = () => {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [device, setDevice] = useState<'laptop' | 'phone' | 'both'>('laptop');
  const [selectedSkill, setSelectedSkill] = useState<string>('writing');
  const [copiedPlan, setCopiedPlan] = useState(false);

  const skillsConfig: Record<
    string,
    { label: string; tools: string; bestFor: string; roadmap: string[] }
  > = {
    writing: {
      label: 'Content, Proofreading & Notes',
      tools: 'Google Docs, LibreOffice, or built-in text editors (Free)',
      bestFor: 'Students strong in grammar, clear note-taking, and summarization',
      roadmap: [
        'Organize clean, readable study notes or writing samples to demonstrate quality',
        'Practice proofreading articles and cleaning up transcripts manually for accuracy',
        'Offer structured formatting, summarizing, and proofreading to peers or small blogs',
      ],
    },
    graphics: {
      label: 'Thumbnails & Social Media Graphics',
      tools: 'Canva (Free tier) or Figma (Free tier)',
      bestFor: 'Students with visual layout sense using free browser or mobile tools',
      roadmap: [
        'Create 3–5 clean sample thumbnails or social post graphics as a starter portfolio',
        'Focus on readable typography, clear contrast, and consistent dimensions',
        'Share sample work with local businesses or content creators needing regular visuals',
      ],
    },
    data: {
      label: 'Data Entry & Spreadsheet Organization',
      tools: 'Google Sheets or Microsoft Excel',
      bestFor: 'Detail-oriented students comfortable organizing lists, tables, and forms',
      roadmap: [
        'Practice core spreadsheet skills: sorting, filtering, data cleanup, and basic formulas',
        'Build a clean sample sheet showing before-and-after organization',
        'Offer catalog updates, contact list cleanup, or form-entry support to small teams',
      ],
    },
    web: {
      label: 'Blogspot & Simple Web Setup',
      tools: 'Blogger (Free), HTML/CSS, Search Console',
      bestFor: 'Students interested in web layouts, SEO basics, and Blogger themes',
      roadmap: [
        'Learn Blogger Theme XML structure, navigation links, and mobile (?m=1) testing',
        'Practice fixing common mobile viewport and layout issues on a free test blog',
        'Help beginners set up clean, fast-loading blogs without cluttered scripts',
      ],
    },
    tutoring: {
      label: 'Peer & School Tutoring',
      tools: 'Google Meet / Zoom (Free tier) and shared PDF worksheets',
      bestFor: 'Students strong in Math, Science, English, or introductory computing',
      roadmap: [
        'Pick 1–2 specific subjects where you consistently perform well',
        'Prepare concise topic outlines and practice exercises',
        'Offer scheduled weekly study sessions around your own exam calendar',
      ],
    },
  };

  const currentSkill = skillsConfig[selectedSkill];
  const monthlyHours = hoursPerWeek * 4;
  const dailyAverage = (hoursPerWeek / 7).toFixed(1);
  const deviceLabel =
    device === 'laptop' ? 'Laptop / PC' : device === 'phone' ? 'Smartphone Only' : 'Laptop & Phone';

  const handleCopyRoadmap = () => {
    const text = `Student Skill Plan (${currentSkill.label}):\nCommitment: ${hoursPerWeek} hrs/week (${monthlyHours} hrs/month) · Device: ${deviceLabel}\nFree Tools: ${currentSkill.tools}\n\nStarter Steps:\n1. ${currentSkill.roadmap[0]}\n2. ${currentSkill.roadmap[1]}\n3. ${currentSkill.roadmap[2]}\n\nShared via MRS ADMIN (M R S Multiverse)`;
    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi M R S! I am a student planning around ${hoursPerWeek} hrs/week for "${currentSkill.label}" (${deviceLabel}). Could you share practical guidance on getting started without upfront costs?`
  );

  return (
    <section className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>Supporting Students &amp; Aspiring Earners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Student Skill &amp; Study-Balance Planner
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            Plan realistic spare hours around classes and explore zero-upfront-cost digital skills without exaggerated promises or pay-to-work traps.
          </p>
        </div>

        {/* Planner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Box */}
          <div className="lg:col-span-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
            {/* Skill Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                1. Choose a Zero-Capital Skill Track
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(skillsConfig).map(([key, config]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSkill(key)}
                    className={`px-3 py-2.5 rounded-lg text-left text-xs font-semibold border transition-all ${
                      selectedSkill === key
                        ? 'border-neutral-950 dark:border-white bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  2. Study-Safe Spare Hours / Week
                </label>
                <span className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{hoursPerWeek} hrs / week</span>
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="25"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>4 hrs (Light)</span>
                <span>12 hrs (Balanced)</span>
                <span>25 hrs (Intensive)</span>
              </div>
            </div>

            {/* Device Available */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                3. Equipment You Have
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDevice('laptop')}
                  className={`p-2.5 rounded-lg text-xs font-medium border flex flex-col items-center gap-1 transition-all ${
                    device === 'laptop'
                      ? 'border-neutral-950 dark:border-white bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-white'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Laptop className="w-4 h-4" />
                  <span>Laptop/PC</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDevice('phone')}
                  className={`p-2.5 rounded-lg text-xs font-medium border flex flex-col items-center gap-1 transition-all ${
                    device === 'phone'
                      ? 'border-neutral-950 dark:border-white bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-white'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Phone Only</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDevice('both')}
                  className={`p-2.5 rounded-lg text-xs font-medium border flex flex-col items-center gap-1 transition-all ${
                    device === 'both'
                      ? 'border-neutral-950 dark:border-white bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-white'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <div className="flex gap-1">
                    <Laptop className="w-3.5 h-3.5" />
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                  <span>Both</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results & Roadmap Card */}
          <div className="lg:col-span-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
            <div>
              {/* Real Time Commitment Summary */}
              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-amber-300">
                    Your Monthly Practice &amp; Work Budget
                  </span>
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
                    {monthlyHours} hrs
                  </span>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">
                    / month (~{dailyAverage} hrs/day) · {deviceLabel}
                  </span>
                </div>
                <p className="mt-2 text-xs text-neutral-700 dark:text-neutral-300">
                  <strong>Best Fit:</strong> {currentSkill.bestFor}
                </p>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                  <strong>Free Tools:</strong> {currentSkill.tools}
                </p>
              </div>

              {/* Action Steps */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  Practical 3-Step Starter Roadmap
                </h3>
                <div className="space-y-3">
                  {currentSkill.roadmap.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-2 text-xs text-emerald-900 dark:text-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Actual income depends on skill quality and client demand. Never pay any registration fee or security deposit for online tasks.
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/8809611056361?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask M R S for Guidance</span>
              </a>

              <button
                type="button"
                onClick={handleCopyRoadmap}
                className="px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                {copiedPlan ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedPlan ? 'Copied' : 'Copy Plan'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
