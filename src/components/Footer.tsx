import React, { useState } from 'react';
import { ExternalLink, HeartHandshake, Mail, MessageCircle, Send, Check, Phone, Calendar, ShieldCheck } from 'lucide-react';
import { BLOG_METADATA, PROFILE_DATA } from '../data/blogData';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onSelectTab: (tab: string) => void;
  onOpenCalendly: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onSelectTab, onOpenCalendly }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Info & Author Card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-neutral-950 font-extrabold text-base flex items-center justify-center border border-neutral-700 shrink-0">
                M
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight block">
                  {PROFILE_DATA.displayName}
                </span>
                <span className="text-neutral-400 text-xs">@{PROFILE_DATA.username} · Independent Remote Operations</span>
              </div>
            </div>
            
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Certified IT support, virtual administrative operations, and web manager. Authoring tech documentation and supporting entrepreneurs since 2018.
            </p>

            <blockquote className="border-l border-neutral-700 pl-3 py-0.5 text-xs italic text-neutral-300 font-serif-content">
              “{PROFILE_DATA.quote}”
            </blockquote>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={`https://wa.me/8809611056361?text=${encodeURIComponent('Hi M R S, connecting from your portfolio.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-colors text-xs font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp ({PROFILE_DATA.phoneFormatted})</span>
              </a>

              <button
                onClick={onOpenCalendly}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-neutral-950 transition-colors text-xs font-medium"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Calendly</span>
              </button>
            </div>
          </div>

          {/* Core Capabilities */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Portal &amp; Capabilities
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  Owner Profile &amp; About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('capabilities')}
                  className="hover:text-white transition-colors text-left"
                >
                  Remote IT Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('capabilities')}
                  className="hover:text-white transition-colors text-left"
                >
                  Virtual Assistance &amp; Admin
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('capabilities')}
                  className="hover:text-white transition-colors text-left"
                >
                  Website &amp; CMS Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('reviews')}
                  className="hover:text-white transition-colors text-left text-amber-300"
                >
                  Verified Client Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Verified External Profiles */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Verified Profiles
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={PROFILE_DATA.gravatarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Gravatar Profile</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_DATA.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_DATA.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>X ({PROFILE_DATA.twitterHandle})</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_DATA.blueskyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Bluesky</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_DATA.wordpressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>WordPress Portal</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_DATA.charityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-rose-400"
                >
                  <span>M R S Charity Foundation</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">
              Stay Connected
            </h4>
            <p className="text-neutral-400 text-xs">
              Subscribe for practical tech tutorials, productivity tricks, and project updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Subscribe Free</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div>
            &copy; 2026 <strong>{PROFILE_DATA.displayName}</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-neutral-500">Phone: {PROFILE_DATA.phoneFormatted}</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-500">{PROFILE_DATA.email}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
