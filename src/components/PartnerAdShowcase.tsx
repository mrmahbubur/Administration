import React, { useState } from 'react';
import { ExternalLink, Sparkles, ArrowUpRight } from 'lucide-react';
import { AD_CREATIVES, AdCreative } from '../data/adCreatives';

interface AdUnitProps {
  ad: AdCreative;
  className?: string;
  showCaption?: boolean;
  darkSurface?: boolean;
  maxImgHeightClass?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({
  ad,
  className = '',
  showCaption = true,
  darkSurface = false,
  maxImgHeightClass = '',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group rounded-xl border transition-colors overflow-hidden ${
        darkSurface
          ? 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700'
          : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-amber-400/60 dark:hover:border-amber-500/40'
      } ${className}`}
    >
      {showCaption && (
        <div
          className={`px-3 py-1.5 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider border-b ${
            darkSurface
              ? 'border-neutral-800 text-neutral-400'
              : 'border-neutral-100 dark:border-neutral-800/80 text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <span className="truncate">Sponsored · {ad.network}</span>
          <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 shrink-0">
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
        className="flex items-center justify-center p-2.5 bg-neutral-50/70 dark:bg-neutral-950/60"
      >
        {imgError ? (
          <div className="w-full py-5 px-4 text-center space-y-1.5">
            <div className="text-xs font-bold text-neutral-900 dark:text-white">
              {ad.network} — {ad.label}
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
              <span>Explore Partner Offer</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ) : (
          <img
            src={ad.imgSrc}
            width={ad.width}
            height={ad.height}
            alt={ad.alt}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className={`block max-w-full h-auto rounded-lg object-contain transition-transform duration-200 group-hover:scale-[1.01] ${maxImgHeightClass}`}
          />
        )}
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
          maxImgHeightClass="max-h-[380px] w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <AdUnit ad={AD_CREATIVES.aliexpress_468x90_logo} />
          <AdUnit ad={AD_CREATIVES.aliexpress_320x100_super} />
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
      <div className="grid grid-cols-2 gap-3">
        <AdUnit ad={AD_CREATIVES.alibaba_160x600_weekly} />
        <AdUnit ad={AD_CREATIVES.aliexpress_160x600_bf} />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <AdUnit ad={AD_CREATIVES.aliexpress_468x90_logo} />
          <AdUnit ad={AD_CREATIVES.aliexpress_320x100_super} />
          <AdUnit ad={AD_CREATIVES.aliexpress_234x60_logo} />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <AdUnit ad={AD_CREATIVES.alibaba_500x500_freeship} />
          <AdUnit ad={AD_CREATIVES.alibaba_320x480_weekly} />
          <AdUnit ad={AD_CREATIVES.aliexpress_320x480_bf} />
        </div>

        {/* Skyscraper Vertical Banners Row */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
            Featured Vertical Deal Collections
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-start justify-items-center">
            <AdUnit ad={AD_CREATIVES.alibaba_160x600_homepage} className="w-full max-w-[180px]" />
            <AdUnit ad={AD_CREATIVES.aliexpress_120x600_bf1} className="w-full max-w-[150px]" />
            <AdUnit ad={AD_CREATIVES.aliexpress_120x600_bf2} className="w-full max-w-[150px]" />
            <AdUnit ad={AD_CREATIVES.alibaba_160x600_weekly} className="w-full max-w-[180px]" />
            <AdUnit ad={AD_CREATIVES.aliexpress_160x600_bf} className="w-full max-w-[180px] col-span-2 sm:col-span-1" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <AdUnit ad={AD_CREATIVES.alibaba_300x250_freeship} />
          <AdUnit ad={AD_CREATIVES.aliexpress_300x250_bf} />
        </div>
      </div>
    </section>
  );
};

export const ArticleInlinePartnerBanner: React.FC = () => {
  return (
    <div className="mt-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
        <AdUnit ad={AD_CREATIVES.aliexpress_468x90_logo} />
        <AdUnit ad={AD_CREATIVES.aliexpress_320x100_super} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdUnit ad={AD_CREATIVES.alibaba_300x250_freeship} />
        <AdUnit ad={AD_CREATIVES.aliexpress_300x250_bf} />
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
          <a
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={AD_CREATIVES.aliexpress_234x60_logo.href}
            aria-label="AliExpress WW 234x60"
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors"
          >
            <img
              src={AD_CREATIVES.aliexpress_234x60_logo.imgSrc}
              width={AD_CREATIVES.aliexpress_234x60_logo.width}
              height={AD_CREATIVES.aliexpress_234x60_logo.height}
              alt={AD_CREATIVES.aliexpress_234x60_logo.alt}
              loading="lazy"
              decoding="async"
              className="block max-w-full h-auto rounded"
            />
          </a>
          <a
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={AD_CREATIVES.aliexpress_216x54_logo.href}
            aria-label="AliExpress WW 216x54"
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors"
          >
            <img
              src={AD_CREATIVES.aliexpress_216x54_logo.imgSrc}
              width={AD_CREATIVES.aliexpress_216x54_logo.width}
              height={AD_CREATIVES.aliexpress_216x54_logo.height}
              alt={AD_CREATIVES.aliexpress_216x54_logo.alt}
              loading="lazy"
              decoding="async"
              className="block max-w-full h-auto rounded"
            />
          </a>
          <a
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={AD_CREATIVES.aliexpress_120x30_logo.href}
            aria-label="AliExpress WW 120x30"
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors"
          >
            <img
              src={AD_CREATIVES.aliexpress_120x30_logo.imgSrc}
              width={AD_CREATIVES.aliexpress_120x30_logo.width}
              height={AD_CREATIVES.aliexpress_120x30_logo.height}
              alt={AD_CREATIVES.aliexpress_120x30_logo.alt}
              loading="lazy"
              decoding="async"
              className="block max-w-full h-auto rounded"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
