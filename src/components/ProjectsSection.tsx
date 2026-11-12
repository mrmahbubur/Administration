import React, { useState } from 'react';
import { Layers, ExternalLink, ArrowRight, Check, MapPin, Bell, Shield, Sparkles, HeartHandshake } from 'lucide-react';
import { PROJECTS } from '../data/blogData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onJoinWaitlist: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onJoinWaitlist }) => {
  return (
    <section id="projects-section" className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>M R S Innovation &amp; Social Impact</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Innovative Projects Coming Soon
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            Exciting developments are on the horizon! We are actively developing next-generation safety tools, AI resources, and social impact platforms.
          </p>
        </div>

        {/* Highlight Banner: Tracking App */}
        <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-800 border border-neutral-800 dark:border-neutral-700 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Flagship Engineering Project</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Loved Ones Live Tracking App
              </h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                Keep your family and loved ones safe and connected with discrete real-time GPS tracking, arrival/departure geofence alerts, and immediate panic alerts without intrusive ad trackers.
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Private E2E Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Geofence Arrival Alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Low Battery GPS Sync</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onJoinWaitlist(PROJECTS[0])}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors shadow-sm"
              >
                <span>Join Beta Testing Waitlist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.slice(1).map((project) => {
            const isCharity = project.id === 'charity-foundation';

            return (
              <div
                key={project.id}
                className="flex flex-col justify-between p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
              >
                <div>
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-[10px]">
                      {project.status}
                    </span>
                    {isCharity && (
                      <HeartHandshake className="w-4 h-4 text-rose-500" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
                    {project.subtitle}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-5 space-y-2">
                    {project.keyFeatures.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  {project.externalUrl ? (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors"
                    >
                      <span>{project.ctaText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onJoinWaitlist(project)}
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors"
                    >
                      <span>{project.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
