import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight, Tag } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    } else {
      setQuery('');
      setSelectedCategory('All');
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Business Hub', 'Money-Making', 'Student Earning', 'Tech & Tricks', 'Future Tech'];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.content.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles, guides, student tricks, or services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-center gap-1.5 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-neutral-100 dark:divide-neutral-800/80">
          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-xs sm:text-sm">
              No articles match your search &quot;{query}&quot;. Try broader terms like &quot;student&quot;, &quot;business&quot;, or &quot;blogger&quot;.
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="py-3 px-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-1">
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                  {article.excerpt}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
