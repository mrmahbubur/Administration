import React, { useState } from 'react';
import {
  Menu,
  X,
  Search,
  Bookmark,
  Moon,
  Sun,
  MessageCircle,
  ExternalLink,
  BookOpen,
  Briefcase,
  Layers,
  HeartHandshake,
  Send,
  Compass,
  Calendar,
  UserCheck,
  Star,
  LogIn,
  LogOut,
  Inbox,
} from 'lucide-react';
import { BLOG_METADATA, PROFILE_DATA } from '../data/blogData';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  savedCount: number;
  onOpenSaved: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenConsultation: () => void;
  onOpenCalendly: () => void;
  onOpenOwnerInbox: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  savedCount,
  onOpenSaved,
  isDark,
  onToggleDark,
  onOpenConsultation,
  onOpenCalendly,
  onOpenOwnerInbox,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, authLoading, signInWithGoogle, logout } = useAuth();

  const navItems = [
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'about', label: 'Owner & About', icon: UserCheck },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'student', label: 'Student Guide', icon: Compass },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'charity', label: 'Charity', icon: HeartHandshake },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/8809611056361?text=${encodeURIComponent('Hello M R S, I am visiting the MRS ADMIN portal and would like to connect!')}`;

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-neutral-900/90 border-b border-neutral-200/80 dark:border-neutral-800 transition-colors">
        {/* Top Announcement Bar */}
        <div className="bg-neutral-950 text-neutral-300 text-xs py-1.5 px-4 text-center border-b border-neutral-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="hidden sm:inline text-neutral-400">
              Welcome to the official <strong>M R S Multiverse</strong> portal
            </span>
            <div className="mx-auto sm:mx-0 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-medium text-amber-300">
                Remote IT Support · Virtual Assistance · Student Guides &amp; Web Management
              </span>
            </div>
            <a 
              href={BLOG_METADATA.charityUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <span>M R S Charity Foundation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo with Gravatar Avatar */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleNavClick('articles')}
                className="text-left group flex items-center gap-3 focus:outline-none"
              >
                <div className="relative w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-extrabold text-base flex items-center justify-center border border-neutral-800 dark:border-neutral-200 shrink-0 transition-transform group-hover:scale-105">
                  M
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-white">
                      MRS ADMIN
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 px-1.5 py-0.5 rounded">
                      MULTIVERSE
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 hidden sm:block">
                    Online Business · Side Gigs · Tech Tricks
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-2.5 py-2 text-xs xl:text-sm font-medium rounded-md transition-colors relative whitespace-nowrap ${
                      isActive
                        ? 'text-neutral-950 dark:text-white font-semibold'
                        : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-neutral-950 dark:bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2">
              {/* Calendly Booking Button */}
              <button
                onClick={onOpenCalendly}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors"
                title="Book 1-on-1 meeting on Calendly"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Calendly</span>
              </button>

              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Search articles"
                className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Search articles & guides (Press / to search)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Saved Articles */}
              <button
                onClick={onOpenSaved}
                aria-label="View saved articles"
                className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors relative"
                title="Saved reading list"
              >
                <Bookmark className="w-5 h-5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-bold flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onToggleDark}
                aria-label="Toggle dark mode"
                className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Owner Inbox (Admin Only) */}
              {isAdmin && (
                <button
                  onClick={onOpenOwnerInbox}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-colors"
                  title="Open Owner Inquiries Inbox"
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Inbox</span>
                </button>
              )}

              {/* Google Auth Button (Desktop) */}
              {!authLoading && (
                user ? (
                  <button
                    onClick={logout}
                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium transition-colors"
                    title={`Signed in as ${user.displayName || user.email}. Click to sign out.`}
                  >
                    <span className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-[10px] font-bold flex items-center justify-center">
                      {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                    <LogOut className="w-3.5 h-3.5 text-neutral-500" />
                  </button>
                ) : (
                  <button
                    onClick={signInWithGoogle}
                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors"
                    title="Sign in with Google to leave reviews or comments"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                )
              )}

              {/* WhatsApp Quick Action (Desktop) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden xl:inline">WhatsApp M R S</span>
                <span className="xl:hidden">WhatsApp</span>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-neutral-900 shadow-xl p-6 flex flex-col justify-between overflow-y-auto border-l border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-extrabold text-sm flex items-center justify-center border border-neutral-800 dark:border-neutral-200 shrink-0">
                    M
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 dark:text-white block">MRS ADMIN</span>
                    <span className="text-[11px] text-neutral-500">@{PROFILE_DATA.username}</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="mt-6 flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-3 w-full px-3.5 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-white font-semibold'
                          : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-neutral-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCalendly();
                  }}
                  className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-left text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>Book on Calendly</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-left text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <Search className="w-4 h-4 text-neutral-400" />
                  <span>Search Articles &amp; Hubs</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSaved();
                  }}
                  className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-left text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <span className="flex items-center gap-3">
                    <Bookmark className="w-4 h-4 text-neutral-400" />
                    <span>Saved Reading List</span>
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {savedCount}
                  </span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenOwnerInbox();
                    }}
                    className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-left text-sm font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30"
                  >
                    <Inbox className="w-4 h-4" />
                    <span>Owner Inquiries Inbox</span>
                  </button>
                )}

                {!authLoading && (
                  user ? (
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-left text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <span className="flex items-center gap-3 truncate">
                        <LogOut className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span className="truncate">Sign Out ({user.displayName || 'Account'})</span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        signInWithGoogle();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-left text-sm font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Sign In with Google</span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Author Card & Direct Action */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="mb-4">
                <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Creator &amp; Manager</p>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white mt-0.5">
                  {PROFILE_DATA.displayName}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{PROFILE_DATA.phoneFormatted}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{PROFILE_DATA.email}</p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 py-1.5 px-3">
        <div className="grid grid-cols-5 gap-1 text-center">
          <button
            onClick={() => onSelectTab('articles')}
            className={`flex flex-col items-center justify-center py-1 rounded-md text-[11px] ${
              currentTab === 'articles' ? 'text-neutral-950 dark:text-white font-semibold' : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span>Articles</span>
          </button>

          <button
            onClick={() => onSelectTab('about')}
            className={`flex flex-col items-center justify-center py-1 rounded-md text-[11px] ${
              currentTab === 'about' ? 'text-neutral-950 dark:text-white font-semibold' : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <UserCheck className="w-4 h-4 mb-0.5" />
            <span>Owner</span>
          </button>

          <button
            onClick={() => onSelectTab('services')}
            className={`flex flex-col items-center justify-center py-1 rounded-md text-[11px] ${
              currentTab === 'services' ? 'text-neutral-950 dark:text-white font-semibold' : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <Briefcase className="w-4 h-4 mb-0.5" />
            <span>Services</span>
          </button>

          <button
            onClick={() => onSelectTab('reviews')}
            className={`flex flex-col items-center justify-center py-1 rounded-md text-[11px] ${
              currentTab === 'reviews' ? 'text-neutral-950 dark:text-white font-semibold' : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <Star className="w-4 h-4 mb-0.5" />
            <span>Reviews</span>
          </button>

          <button
            onClick={() => onSelectTab('contact')}
            className={`flex flex-col items-center justify-center py-1 rounded-md text-[11px] ${
              currentTab === 'contact' ? 'text-neutral-950 dark:text-white font-semibold' : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <Send className="w-4 h-4 mb-0.5" />
            <span>Contact</span>
          </button>
        </div>
      </div>
    </>
  );
};
