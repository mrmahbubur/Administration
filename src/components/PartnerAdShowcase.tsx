import React, { useState } from 'react';
import { ExternalLink, Sparkles, ArrowUpRight } from 'lucide-react';
import { AD_CREATIVES, AdCreative } from '../data/adCreatives';

interface AdUnitProps {
  ad: AdCreative;
  className?: string;
  showCaption?: boolean;
  darkSurface?: boolean;
  maxImgHeightClass?: string;
  eager?: boolean;
}

const PartnerBannerImage: React.FC<{
  ad: AdCreative;
  className?: string;
  eager?: boolean;
}> = ({ ad, className = '', eager = false }) => {
  const sources = [ad.imgSrc, ad.cdnSrc, ad.localSrc];
  const [sourceIdx, setSourceIdx] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  if (allFailed) {
    return (
      <div className="w-full py-5 px-4 text-center space-y-1.5">
        <div className="text-xs font-bold text-neutral-900">
          {ad.network} — {ad.label}
        </div>
        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700">
          <span>Explore Partner Offer</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }

  return (
    <img
      src={sources[sourceIdx]}
      width={ad.width}
      height={ad.height}
      alt={ad.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => {
        if (sourceIdx < sources.length - 1) {
          setSourceIdx((prev) => prev + 1);
        } else {
          setAllFailed(true);
        }
      }}
      className={className}
    />
  );
};

export const AdUnit: React.FC<AdUnitProps> = ({
  ad,
  className = '',
  showCaption = true,
  darkSurface = false,
  maxImgHeightClass = '',
  eager = false,
}) => {
  return (
    <div
      className={`group flex flex-col rounded-xl border transition-colors overflow-hidden shadow-xs ${
        darkSurface
          ? 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700'
          : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-amber-400/70 dark:hover:border-amber-500/50'
      } ${className}`}
    >
      {showCaption && (
        <div
          className={`px-3 py-1.5 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider border-b shrink-0 ${
            darkSurface
              ? 'border-neutral-800 text-neutral-400'
              : 'border-neutral-100 dark:border-neutral-800/80 text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <span className="truncate">Partner · {ad.network}</span>
          <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 shrink-0">
            <span>{ad.label}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </div>
      )}
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href={ad.href}
        aria-label={`${ad.network} — ${ad.label}`}
        className="flex-1 flex items-center justify-center p-2.5 bg-white dark:bg-neutral-100"
      >
        <PartnerBannerImage
          ad={ad}
          eager={eager}
          className={`block max-w-full h-auto rounded-lg object-contain transition-transform duration-200 group-hover:scale-[1.01] ${maxImgHeightClass}`}
        />
      </a>
    </div>
  );
};

export const PartnerHeroSpotlight: React.FC = () => {
  return (
    <section
      aria-label="Featured Partner Promotions"
      className="py-6 sm:py-8 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <AdUnit
          ad={AD_CREATIVES.alibaba_1200x628_20off}
          maxImgHeightClass="max-h-[380px] w-auto"
          eager
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <AdUnit ad={AD_CREATIVES.aliexpress_468x90_logo} className="h-full" eager />
          <AdUnit ad={AD_CREATIVES.aliexpress_320x100_super} className="h-full" eager />
        </div>
      </div>
    </section>
  );
};

export const PartnerFeedRail: React.FC = () => {
  return (
    <aside aria-label="Partner Offers Sidebar" className="space-y-5">
      <AdUnit ad={AD_CREATIVES.alibaba_300x250_freeship} />
      <AdUnit ad={AD_CREATIVES.aliexpress_300x250_bf} />
      <div className="grid grid-cols-2 gap-3 items-stretch">
        <AdUnit ad={AD_CREATIVES.alibaba_160x600_weekly} className="h-full" />
        <AdUnit ad={AD_CREATIVES.aliexpress_160x600_bf} className="h-full" />
      </div>
    </aside>
  );
};

export const PartnerMidStrip: React.FC = () => {
  return (
    <section
      aria-label="Partner Deals Strip"
      className="py-6 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          <AdUnit ad={AD_CREATIVES.aliexpress_468x90_logo} className="h-full" />
          <AdUnit ad={AD_CREATIVES.aliexpress_320x100_super} className="h-full" />
          <AdUnit ad={AD_CREATIVES.aliexpress_234x60_logo} className="h-full" />
        </div>
      </div>
    </section>
  );
};

export const PartnerDealsShowcaseSection: React.FC = () => {
  return (
    <section
      id="partner-deals-section"
      className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Affiliate Partner Promotions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Global Marketplace &amp; Seasonal Deals
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Curated partner offers from Alibaba and AliExpress for e-commerce entrepreneurs, sourcers, and smart shoppers.
          </p>
        </div>

        {/* Featured Square & Portrait Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <AdUnit ad={AD_CREATIVES.alibaba_500x500_freeship} className="h-full" maxImgHeightClass="max-h-[420px]" />
          <AdUnit ad={AD_CREATIVES.alibaba_320x480_weekly} className="h-full" maxImgHeightClass="max-h-[420px]" />
          <AdUnit ad={AD_CREATIVES.aliexpress_320x480_bf} className="h-full" maxImgHeightClass="max-h-[420px]" />
        </div>

        {/* Skyscraper Vertical Banners Row */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
            Featured Vertical Deal Collections
          </div>
          <div className="flex flex-wrap items-stretch justify-center gap-4">
            <AdUnit ad={AD_CREATIVES.alibaba_160x600_homepage} className="w-[155px] sm:w-[175px]" />
            <AdUnit ad={AD_CREATIVES.aliexpress_120x600_bf1} className="w-[140px] sm:w-[150px]" />
            <AdUnit ad={AD_CREATIVES.aliexpress_120x600_bf2} className="w-[140px] sm:w-[150px]" />
            <AdUnit ad={AD_CREATIVES.alibaba_160x600_weekly} className="w-[155px] sm:w-[175px]" />
            <AdUnit ad={AD_CREATIVES.aliexpress_160x600_bf} className="w-[155px] sm:w-[175px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const PartnerReviewsBand: React.FC = () => {
  return (
    <section
      aria-label="Partner Offers Before Contact"
      className="py-8 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <AdUnit ad={AD_CREATIVES.alibaba_300x250_freeship} className="h-full" />
          <AdUnit ad={AD_CREATIVES.aliexpress_300x250_bf} className="h-full" />
        </div>
      </div>
    </section>
  );
};

export const ArticleInlinePartnerBanner: React.FC = () => {
  return (
    <div className="mt-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
        <AdUnit ad={AD_CREATIVES.aliexpress_468x90_logo} className="h-full" />
        <AdUnit ad={AD_CREATIVES.aliexpress_320x100_super} className="h-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        <AdUnit ad={AD_CREATIVES.alibaba_300x250_freeship} className="h-full" />
        <AdUnit ad={AD_CREATIVES.aliexpress_300x250_bf} className="h-full" />
      </div>
    </div>
  );
};

export const PartnerCompactBanner: React.FC = () => {
  return (
    <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/60">
      <AdUnit ad={AD_CREATIVES.aliexpress_320x100_super} />
    </div>
  );
};

export const FooterPartnerStrip: React.FC = () => {
  const logos = [
    AD_CREATIVES.aliexpress_234x60_logo,
    AD_CREATIVES.aliexpress_216x54_logo,
    AD_CREATIVES.aliexpress_120x30_logo,
  ];

  return (
    <div className="mt-10 pt-8 border-t border-neutral-800/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
            Official Affiliate Partners
          </span>
          <span className="text-[11px] text-neutral-500">
            Alibaba WW &amp; AliExpress WW verified partner links
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {logos.map((ad) => (
            <a
              key={ad.id}
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={ad.href}
              aria-label={`${ad.network} ${ad.width}x${ad.height}`}
              className="px-3 py-2 rounded-lg bg-white border border-neutral-700 hover:border-amber-400 transition-colors"
            >
              <PartnerBannerImage
                ad={ad}
                className="block max-w-full h-auto rounded"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
