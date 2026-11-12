import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveSaved,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-xl flex flex-col justify-between">
          
          {/* Header */}
          <div>
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Saved Reading List ({savedArticles.length})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)] space-y-4">
              {savedArticles.length === 0 ? (
                <div className="py-16 text-center text-neutral-400">
                  <Bookmark className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 mb-2" />
                  <p className="text-sm font-medium">Your reading list is empty</p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Click the bookmark icon on any article to save it for offline or later reading.
                  </p>
                </div>
              ) : (
                savedArticles.map((article) => (
                  <div
                    key={article.id}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors flex items-start justify-between gap-3 group"
                  >
                    <div 
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="cursor-pointer flex-1 min-w-0"
                    >
                      <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                        {article.category}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 mt-0.5">
                        {article.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {article.readTime}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveSaved(article.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          {savedArticles.length > 0 && (
            <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/60">
              <button
                onClick={onClearAll}
                className="text-xs text-rose-600 hover:underline font-medium"
              >
                Clear all saved
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950"
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
