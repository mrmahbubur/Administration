import React from 'react';
import { Briefcase, Check, MessageCircle, ArrowRight, FileText, Layout, Wrench, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/blogData';
import { Service } from '../types';

interface ServicesSectionProps {
  onOpenOrderModal: (service: Service) => void;
  onOpenCodeGenerator: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenOrderModal,
  onOpenCodeGenerator
}) => {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'cv-design':
        return FileText;
      case 'blogspot-templates':
        return Layout;
      case 'custom-templates':
        return Wrench;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="services-section" className="py-12 sm:py-16 bg-white dark:bg-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
              <Briefcase className="w-4 h-4" />
              <span>Specialized Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Special Services Available Now
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
              Exclusive services to help you elevate your online presence and professional image — order easily and directly through WhatsApp.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service) => {
            const Icon = getServiceIcon(service.id);
            const waUrl = `https://wa.me/?text=${encodeURIComponent(service.whatsappPreset)}`;

            return (
              <div
                key={service.id}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-neutral-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mt-1">
                    {service.tagline}
                  </p>

                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6 space-y-2.5">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing / Terms */}
                  <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">Rate: </span>
                    <span>{service.pricingHint}</span>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="mt-8 flex items-center gap-3">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onOpenOrderModal(service)}
                    className="px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors"
                  >
                    Inquire Online
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
