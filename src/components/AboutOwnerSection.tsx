import React from 'react';
import {
  UserCheck,
  ShieldCheck,
  Award,
  Globe,
  Clock,
  Languages,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  CheckCircle2,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { PROFILE_DATA } from '../data/blogData';

interface AboutOwnerSectionProps {
  onOpenCalendly: () => void;
  onScrollToContact: () => void;
}

export const AboutOwnerSection: React.FC<AboutOwnerSectionProps> = ({
  onOpenCalendly,
  onScrollToContact,
}) => {
  const whatsappUrl = `https://wa.me/8809611056361?text=${encodeURIComponent(
    'Hello M R S, I reviewed your owner profile and would like to discuss a project.'
  )}`;

  const socialProfiles = [
    { label: 'Gravatar', href: PROFILE_DATA.gravatarUrl },
    { label: 'LinkedIn', href: PROFILE_DATA.linkedinUrl },
    { label: `X (${PROFILE_DATA.twitterHandle})`, href: PROFILE_DATA.twitterUrl },
    { label: 'Bluesky', href: PROFILE_DATA.blueskyUrl },
    { label: 'WordPress', href: PROFILE_DATA.wordpressUrl },
    { label: 'Charity Foundation', href: PROFILE_DATA.charityUrl },
  ];

  return (
    <section
      id="about-section"
      className="py-12 sm:py-16 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
            <UserCheck className="w-4 h-4" />
            <span>Owner Information &amp; About</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            {PROFILE_DATA.aboutTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            Verified operator profile, certifications, work standards, and direct owner contact channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Owner Identity & Contact Card */}
          <div className="lg:col-span-5 bg-neutral-50/80 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-7 space-y-6">
            {/* Identity Header */}
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-extrabold text-2xl flex items-center justify-center shrink-0 border border-neutral-800 dark:border-neutral-200">
                M
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-950" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">
                    {PROFILE_DATA.displayName}
                  </h3>
                  <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    @{PROFILE_DATA.username}
                  </span>
                </div>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
                  {PROFILE_DATA.role}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{PROFILE_DATA.availability}</span>
                </div>
              </div>
            </div>

            {/* Structured Owner Specs */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-white block">
                    Certification
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    360-Hour Computer Systems Course · Active Since {PROFILE_DATA.experienceSince}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-white block">
                    Time Zone &amp; Coverage
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {PROFILE_DATA.timezone}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Languages className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-white block">
                    Languages
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {PROFILE_DATA.languages.join(' · ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Owner Contact Channels */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2.5 text-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Direct Owner Contact
              </div>

              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors"
              >
                <span className="flex items-center gap-2 font-medium text-neutral-800 dark:text-neutral-200 truncate">
                  <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span className="truncate">{PROFILE_DATA.email}</span>
                </span>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 shrink-0 ml-2">
                  Email
                </span>
              </a>

              <a
                href={`tel:${PROFILE_DATA.phone}`}
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors"
              >
                <span className="flex items-center gap-2 font-medium text-neutral-800 dark:text-neutral-200">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{PROFILE_DATA.phoneFormatted}</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0 ml-2">
                  WhatsApp / Call
                </span>
              </a>
            </div>

            {/* Verified Profiles Links */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified External Profiles</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {socialProfiles.map((profile) => (
                  <a
                    key={profile.label}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
                  >
                    <span>{profile.label}</span>
                    <ExternalLink className="w-3 h-3 text-neutral-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Owner</span>
              </a>
              <button
                type="button"
                onClick={onOpenCalendly}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors"
              >
                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Book Meeting</span>
              </button>
            </div>
          </div>

          {/* Right Column: Detailed About Story, Credentials & Core Values */}
          <div className="lg:col-span-7 space-y-6">
            {/* About Narrative */}
            <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Background &amp; Mission</span>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif-content">
                {PROFILE_DATA.aboutParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Credentials Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROFILE_DATA.credentials.map((cred, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {cred.label}
                  </div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                    {cred.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Operating Values */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Operating Principles &amp; Why Clients Choose M R S</span>
                </div>
                <button
                  type="button"
                  onClick={onScrollToContact}
                  className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                >
                  Inquire Directly →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROFILE_DATA.coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-800"
                  >
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {val.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                      {val.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
