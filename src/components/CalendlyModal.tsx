import React from 'react';
import { X, Calendar, ExternalLink, ShieldCheck, MessageCircle } from 'lucide-react';
import { PROFILE_DATA } from '../data/blogData';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const meetingTopics = [
    {
      title: 'Remote IT Support & Diagnostics',
      desc: 'Windows PC or Android troubleshooting, software setup, and technical support.',
    },
    {
      title: 'Virtual Assistance & Operations Scope',
      desc: 'Discussion of administrative workflows, spreadsheet organization, or ongoing inbox support.',
    },
    {
      title: 'Blogspot / WordPress Website Management',
      desc: 'Reviewing mobile layout issues, custom Blogspot templates, content updates, or SEO.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Book a Session with {PROFILE_DATA.displayName}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                calendly.com/mrxshahin · Direct 1-on-1 Consultation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Choose an open time slot directly on Calendly, or message on WhatsApp for quick inquiries.
          </p>

          <div className="space-y-3">
            {meetingTopics.map((m, idx) => (
              <a
                key={idx}
                href={PROFILE_DATA.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-800/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {m.title}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {m.desc}
                </p>
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <a
              href={PROFILE_DATA.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors"
            >
              <span>Open Calendly Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={`https://wa.me/8809611056361?text=${encodeURIComponent(
                'Hi M R S, I would like to schedule a quick meeting with you.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Now</span>
            </a>
          </div>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Live availability and durations shown on calendly.com/mrxshahin</span>
          </div>
        </div>
      </div>
    </div>
  );
};
