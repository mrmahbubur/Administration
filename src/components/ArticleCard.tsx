import React from 'react';
import { Bookmark, Share2, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onRead: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
  onShare: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onRead,
  isSaved,
  onToggleSave,
  onShare
}) => {
  return (
    <article 
      onClick={() => onRead(article)}
      className="group relative flex flex-col justify-between bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-400/70 dark:hover:border-neutral-700 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
    >
      <div>
        <div className="h-1 w-full bg-gradient-to-r from-amber-500/80 via-neutral-300 dark:via-neutral-700 to-transparent" />
        <div className="p-5 sm:p-6">
          {/* Unboxed Metadata (Zero-Pill Compliance) */}
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2.5">
            <span className="text-amber-700 dark:text-amber-400 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer with Author and Actions */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center justify-center text-[10px] font-bold">
            {article.author.name.charAt(0)}
          </div>
          <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
            {article.author.name}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(article.id);
            }}
            aria-label={isSaved ? "Remove from bookmarks" : "Save article"}
            className={`p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
              isSaved ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
            }`}
            title={isSaved ? 'Bookmarked' : 'Save for later'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShare(article);
            }}
            aria-label="Share article"
            className="p-2 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Share article"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <span className="ml-1 text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
