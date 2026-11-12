import React, { useState } from 'react';
import { Calculator, CheckCircle2, DollarSign, Clock, Laptop, Smartphone, ArrowRight, MessageCircle, Copy, Check } from 'lucide-react';

export const StudentEarningCalculator: React.FC = () => {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [device, setDevice] = useState<'laptop' | 'phone' | 'both'>('laptop');
  const [selectedSkill, setSelectedSkill] = useState<string>('writing');
  const [copiedPlan, setCopiedPlan] = useState(false);

  const skillsConfig: Record<string, { label: string; ratePerHour: number; roadmap: string[]; bestFor: string }> = {
    writing: {
      label: 'Content, Proofreading & Notes',
      ratePerHour: 12,
      bestFor: 'Students good at grammar, article summarization, or study guides',
      roadmap: [
        'Organize high-scoring lecture notes into tidy PDF study packages',
        'Use AI tools to draft transcripts, then manually polish grammar & punctuation',
        'Offer 500-word blog post proofreading on peer boards or freelance forums'
      ]
    },
    graphics: {
      label: 'Thumbnails & Social Media Graphics',
      ratePerHour: 15,
      bestFor: 'Students with visual eye using free tools like Canva or Figma',
      roadmap: [
        'Assemble a mini-portfolio of 5 sample YouTube thumbnails',
        'Pitch small creators with a free test thumbnail to demonstrate quality',
        'Secure 2 recurring clients at $40/month retainer for weekly carousel posts'
      ]
    },
    data: {
      label: 'Data Entry & Spreadsheet Organization',
      ratePerHour: 10,
      bestFor: 'Detail-oriented students with basic Google Sheets / Excel skills',
      roadmap: [
        'Master essential Google Sheets formulas (VLOOKUP, SUMIFS, Pivot Tables)',
        'Offer local retailers or online shops catalog data entry and inventory cleanup',
        'Clean up mailing lists and contact databases for small business owners'
      ]
    },
    web: {
      label: 'Blogspot & Simple Web Setup',
      ratePerHour: 18,
      bestFor: 'Students interested in web design, SEO, and Blogger theme setup',
      roadmap: [
        'Learn Blogger XML basics and mobile responsiveness tweaks',
        'Offer $25 complete blog setups (theme installation, menu links, SEO tags)',
        'Upgrade to custom CSS adjustments and AdSense placement assistance'
      ]
    },
    tutoring: {
      label: 'Peer & School Tutoring',
      ratePerHour: 16,
      bestFor: 'Students strong in Math, Science, English, or Coding',
      roadmap: [
        'Identify 1-2 core subjects where you achieved top grades',
        'Offer weekly 1-hour Zoom/Google Meet review sessions for high schoolers',
        'Provide custom practice questions and mock exam walkthroughs'
      ]
    }
  };

  const currentSkill = skillsConfig[selectedSkill];
  const monthlyHours = hoursPerWeek * 4;
  const deviceMultiplier = device === 'phone' ? 0.8 : device === 'both' ? 1.1 : 1.0;
  const projectedMonthly = Math.round(monthlyHours * currentSkill.ratePerHour * deviceMultiplier);

  const handleCopyRoadmap = () => {
    const text = `Student Earning Roadmap (${currentSkill.label}):\nProjected: $${projectedMonthly}/month (${hoursPerWeek} hrs/week)\n\nSteps:\n1. ${currentSkill.roadmap[0]}\n2. ${currentSkill.roadmap[1]}\n3. ${currentSkill.roadmap[2]}\n\nCurated by MRS ADMIN (M R S Multiverse)`;
    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi M R S! I used your Student Earning Calculator for "${currentSkill.label}" with ${hoursPerWeek} hrs/week. Could you give me advice on getting started?`
  );

  return (
    <section className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
            <Calculator className="w-4 h-4" />
            <span>Supporting Students &amp; Aspiring Earners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Student Income Estimator &amp; Practical Earning Tricks
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            One of our core initiatives: easy-to-implement methods tailored for students to earn extra income with zero upfront investment.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Box */}
          <div className="lg:col-span-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
            
            {/* Skill Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                1. Select Your Primary Interest / Skill
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
                  2. Study Spare Hours / Week
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
                <span>4 hrs (Casual)</span>
                <span>12 hrs (Balanced)</span>
                <span>25 hrs (Maximum)</span>
              </div>
            </div>

            {/* Device Available */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                3. Primary Equipment You Have
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
              {/* Projected Revenue Header */}
              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-amber-300">
                    Estimated Monthly Earning
                  </span>
                  <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
                    ${projectedMonthly}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    / month (~${Math.round(projectedMonthly / (monthlyHours || 1))}/hr)
                  </span>
                </div>
                <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                  Based on realistic market rates for beginner-intermediate tasks. Zero upfront deposit required.
                </p>
              </div>

              {/* Action Steps */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  Your 3-Step Starter Roadmap
                </h3>
                <div className="space-y-3">
                  {currentSkill.roadmap.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                      <div className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/8809611056361?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss with M R S on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyRoadmap}
                className="px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                {copiedPlan ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPlan ? 'Copied' : 'Copy Plan'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
