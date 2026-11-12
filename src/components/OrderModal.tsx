import React, { useState } from 'react';
import { X, MessageCircle, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Service, Project } from '../types';
import { BLOG_METADATA } from '../data/blogData';

interface OrderModalProps {
  item: Service | Project | null;
  type: 'service' | 'waitlist';
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ item, type, onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!item) return null;

  const isService = type === 'service';
  const service = item as Service;
  const project = item as Project;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    let msg = '';
    if (isService) {
      msg = `Hello M R S, my name is ${name || 'a visitor'}. I am interested in: "${service.title}". Details: ${details || 'Please share more info.'} (Contact: ${contact})`;
    } else {
      msg = `Hello M R S, my name is ${name || 'a visitor'}. I would like to join the early waitlist for "${project.title}". (Contact: ${contact})`;
    }
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {isService ? 'Direct Service Request' : 'Beta Access Waitlist'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                {isService ? 'Inquiry Recorded!' : 'You Are On The Waitlist!'}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto">
                {isService
                  ? 'Thank you! M R S will review your request and get back to you promptly. For immediate response, launch WhatsApp below.'
                  : 'We will notify you as soon as the closed beta for testing is released.'}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open in WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {isService
                  ? `Reach M R S directly regarding ${service.title}. We offer flexible turnarounds and tailored deliverables.`
                  : `Be among the first to test ${project.title}. Leave your contact details below.`}
              </p>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Ahmed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Email or WhatsApp Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +8801700000000 or email@domain.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                />
              </div>

              {isService && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Specific Requirements or Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your field, target roles, or blog URL..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                  />
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp</span>
                </a>
              </div>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Your details remain private and are only used by M R S.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
