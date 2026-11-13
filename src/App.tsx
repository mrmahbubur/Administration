import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutOwnerSection } from './components/AboutOwnerSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { StudentEarningCalculator } from './components/StudentEarningCalculator';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { OwnerInboxModal } from './components/OwnerInboxModal';
import { BloggerCodeGeneratorModal } from './components/BloggerCodeGeneratorModal';
import { CalendlyModal } from './components/CalendlyModal';
import { OrderModal } from './components/OrderModal';
import { SearchModal } from './components/SearchModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { ARTICLES, SERVICES, BLOG_METADATA } from './data/blogData';
import { Article, Service, Project } from './types';
import { HeartHandshake, ExternalLink } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-neutral-900 p-6">
          <div className="max-w-md w-full p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm text-center space-y-3">
            <h1 className="text-lg font-bold">Something went wrong</h1>
            <p className="text-xs text-neutral-600">
              Please refresh the page to restore the portal.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('articles');
  const [inboxOpen, setInboxOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchOpen, setSearchOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [orderModalData, setOrderModalData] = useState<{ item: Service | Project | null; type: 'service' | 'waitlist' }>({
    item: null,
    type: 'service'
  });
  const [bloggerModalOpen, setBloggerModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Initialize theme and saved bookmarks
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('mrs_theme');
      if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }

      const storedSaved = localStorage.getItem('mrs_saved_articles');
      if (storedSaved) {
        setSavedIds(JSON.parse(storedSaved));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Keyboard shortcut listener for search '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleDark = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mrs_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mrs_theme', 'light');
    }
  };

  const handleToggleSave = (articleId: string) => {
    setSavedIds((prev) => {
      let updated: string[];
      if (prev.includes(articleId)) {
        updated = prev.filter((id) => id !== articleId);
      } else {
        updated = [...prev, articleId];
      }
      localStorage.setItem('mrs_saved_articles', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearSaved = () => {
    setSavedIds([]);
    localStorage.removeItem('mrs_saved_articles');
  };

  const handleShareArticle = (article: Article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(`Link copied for "${article.title}"`);
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  const categories = ['All', 'Business Hub', 'Money-Making', 'Student Earning', 'Tech & Tricks', 'Future Tech'];

  const filteredArticles = ARTICLES.filter((article) => {
    if (selectedCategory === 'All') return true;
    return article.category === selectedCategory;
  });

  const savedArticlesList = ARTICLES.filter((a) => savedIds.includes(a.id));

  const handleOpenOrder = (service: Service) => {
    setOrderModalData({ item: service, type: 'service' });
  };

  const handleJoinWaitlist = (project: Project) => {
    setOrderModalData({ item: project, type: 'waitlist' });
  };

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    if (tab === 'articles') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(`${tab}-section`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AppErrorBoundary>
      <div className={`min-h-screen flex flex-col ${isDark ? 'dark bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'} transition-colors duration-200 pb-16 lg:pb-0`}>
        
        {/* Toast Notification */}
        {shareToast && (
          <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-semibold shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2">
            <span>✓</span>
            <span>{shareToast}</span>
          </div>
        )}

        {/* Navigation Header */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          onOpenSearch={() => setSearchOpen(true)}
          savedCount={savedIds.length}
          onOpenSaved={() => setSavedDrawerOpen(true)}
          isDark={isDark}
          onToggleDark={handleToggleDark}
          onOpenConsultation={() => setOrderModalData({ item: SERVICES[3], type: 'service' })}
          onOpenCalendly={() => setCalendlyOpen(true)}
          onOpenOwnerInbox={() => setInboxOpen(true)}
        />

      <main className="flex-1">
        {/* Editorial Hero Section (Unchanged Structure, Enhanced with Gravatar) */}
        <HeroSection
          onExploreHub={(category) => {
            setSelectedCategory(category);
            setCurrentTab('articles');
            const el = document.getElementById('articles-feed');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenConsultation={() => setOrderModalData({ item: SERVICES[3], type: 'service' })}
          onReadFeatured={() => setReadingArticle(ARTICLES[0])}
          onOpenCalendly={() => setCalendlyOpen(true)}
        />

        {/* Owner Profile & Detailed About Section */}
        <AboutOwnerSection
          onOpenCalendly={() => setCalendlyOpen(true)}
          onScrollToContact={() => handleSelectTab('contact')}
        />

        {/* Interactive 7-Pillar Capabilities Matrix */}
        <CapabilitiesSection
          onSelectService={(serviceName) => {
            const matched =
              SERVICES.find((s) =>
                serviceName.toLowerCase().includes(s.id.split('-')[0])
              ) || SERVICES[0];
            setOrderModalData({
              item: {
                ...matched,
                title: serviceName,
              },
              type: 'service',
            });
          }}
        />

        {/* Interactive Filter Bar & Articles Feed */}
        <section id="articles-feed" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Curated Insights &amp; Portals
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Showing {filteredArticles.length} guides from the M R S Multiverse publication
              </p>
            </div>

            {/* Interactive Filter Buttons (Zero-pill compliant tabs) */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-200/60 dark:bg-neutral-800/80 rounded-xl overflow-x-auto text-xs font-medium">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs font-semibold'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onRead={(art) => setReadingArticle(art)}
                isSaved={savedIds.includes(article.id)}
                onToggleSave={handleToggleSave}
                onShare={handleShareArticle}
              />
            ))}
          </div>

        </section>

        {/* Student Earning Calculator Section */}
        <div id="student-section">
          <StudentEarningCalculator />
        </div>

        {/* Services & Templates Section */}
        <div id="services-section">
          <ServicesSection
            onOpenOrderModal={handleOpenOrder}
            onOpenCodeGenerator={() => setBloggerModalOpen(true)}
          />
        </div>

        {/* Future Projects & Tracking App Section */}
        <div id="projects-section">
          <ProjectsSection onJoinWaitlist={handleJoinWaitlist} />
        </div>

        {/* Verified Client Reviews & Rating Distribution (Firestore) */}
        <ReviewsSection />

        {/* Charity Foundation Highlight Section */}
        <section id="charity-section" className="py-12 sm:py-16 bg-neutral-900 text-white dark:bg-neutral-950 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4 text-rose-400" />
                <span>Our Non-Profit Movement</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                M R S Charity Foundation
              </h2>

              <p className="text-base sm:text-lg text-rose-200 font-serif-content italic">
                “Poverty Ends With Us — Humanity United Against Poverty”
              </p>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl mx-auto">
                Dedicated to supporting underprivileged individuals and student education under the M R S Charity Foundation mission.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={BLOG_METADATA.charityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <span>Visit Charity Foundation</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    const el = document.getElementById('contact-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold transition-colors"
                >
                  Partner With Us
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Support Section */}
        <div id="contact-section">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentTab('articles');
          const el = document.getElementById('articles-feed');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectTab={handleSelectTab}
        onOpenCalendly={() => setCalendlyOpen(true)}
      />

      {/* Full Article Reader Modal */}
      <ArticleReaderModal
        article={readingArticle}
        onClose={() => setReadingArticle(null)}
        isSaved={readingArticle ? savedIds.includes(readingArticle.id) : false}
        onToggleSave={handleToggleSave}
        onSelectArticle={(art) => setReadingArticle(art)}
        allArticles={ARTICLES}
      />

      {/* Calendly Booking Modal */}
      <CalendlyModal
        isOpen={calendlyOpen}
        onClose={() => setCalendlyOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={(art) => setReadingArticle(art)}
      />

      {/* Saved Articles Drawer */}
      <SavedArticlesDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={(art) => setReadingArticle(art)}
        onRemoveSaved={handleToggleSave}
        onClearAll={handleClearSaved}
      />

      {/* Order & Waitlist Modal */}
      <OrderModal
        item={orderModalData.item}
        type={orderModalData.type}
        onClose={() => setOrderModalData({ item: null, type: 'service' })}
      />

      {/* Blogger Responsive Code Snippet Modal */}
      <BloggerCodeGeneratorModal
        isOpen={bloggerModalOpen}
        onClose={() => setBloggerModalOpen(false)}
      />

      {/* Owner Inbox Modal (Admin Only) */}
      <OwnerInboxModal
        isOpen={inboxOpen}
        onClose={() => setInboxOpen(false)}
      />

      </div>
    </AppErrorBoundary>
  );
}
