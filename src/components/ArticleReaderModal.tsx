import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Bookmark, 
  Share2, 
  Clock, 
  MessageCircle, 
  Copy, 
  Check, 
  ChevronLeft, 
  MessageSquare, 
  Send,
  ExternalLink,
  Trash2,
  LogIn,
  Loader2
} from 'lucide-react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from 'firebase/firestore';
import { Article, CommentItem } from '../types';
import { BLOG_METADATA } from '../data/blogData';
import { db, classifyFirebaseError, handleFirestoreError, normalizeDisplayName, OperationType } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
  onSelectArticle,
  allArticles
}) => {
  const { user, isAdmin, signInWithGoogle, authLoading, authError, clearAuthError } = useAuth();
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load real comments from Firestore and reset input/scroll state when article changes
  useEffect(() => {
    setComments([]);
    setCommentText('');
    setCommentError(null);
    setCommentSuccess(false);
    setScrollProgress(0);
    clearAuthError();
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    if (!article) return;
    const q = query(
      collection(db, 'article_comments'),
      where('articleId', '==', article.id)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: CommentItem[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            articleId: String(d.articleId || article.id),
            authorUid: String(d.authorUid || ''),
            authorName: String(d.authorName || 'Reader'),
            text: String(d.text || ''),
            createdAt: d.createdAt instanceof Timestamp ? d.createdAt.toMillis() : Date.now(),
          };
        });
        items.sort((a, b) => b.createdAt - a.createdAt);
        setComments(items);
      },
      (error) => {
        setCommentError(classifyFirebaseError(error));
        try {
          handleFirestoreError(error, OperationType.LIST, 'article_comments');
        } catch {
          // Logged via handleFirestoreError
        }
      }
    );
    return () => unsubscribe();
  }, [article?.id]);

  // Track scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  const handleClose = () => {
    setCommentError(null);
    clearAuthError();
    onClose();
  };

  if (!article) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `Check out this article on MRS ADMIN: "${article.title}"`;
    window.open(`https://wa.me/8809611056361?text=${encodeURIComponent(text + ' ' + window.location.href)}`, '_blank');
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError(null);
    if (!user) {
      setCommentError('Please sign in with Google to post a comment.');
      return;
    }
    const cleanText = commentText.trim().slice(0, 800);
    if (cleanText.length < 2) {
      setCommentError('Please write at least 2 characters.');
      return;
    }

    setCommentSubmitting(true);
    try {
      await addDoc(collection(db, 'article_comments'), {
        articleId: article.id,
        authorUid: user.uid,
        authorName: normalizeDisplayName(user.displayName, 'Reader'),
        text: cleanText,
        createdAt: serverTimestamp(),
      });
      setCommentText('');
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 3000);
    } catch (error) {
      setCommentError(classifyFirebaseError(error));
      try {
        handleFirestoreError(error, OperationType.CREATE, 'article_comments');
      } catch {
        // Logged via handleFirestoreError
      }
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setCommentError(null);
    try {
      await deleteDoc(doc(db, 'article_comments', commentId));
    } catch (error) {
      setCommentError(classifyFirebaseError(error));
      try {
        handleFirestoreError(error, OperationType.DELETE, `article_comments/${commentId}`);
      } catch {
        // Logged via handleFirestoreError
      }
    }
  };

  const nextArticle = allArticles.find(a => a.id !== article.id);

  // Format content markdown into clean elements
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-4" />;
      }
      if (trimmed === '---') {
        return <hr key={idx} className="my-8 border-neutral-200 dark:border-neutral-800" />;
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-8 mb-4 tracking-tight">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mt-6 mb-2">
            {trimmed.replace('#### ', '')}
          </h4>
        );
      }
      if (trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="ml-5 list-disc text-neutral-700 dark:text-neutral-300 my-1 leading-relaxed">
            {trimmed.replace('- ', '')}
          </li>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <li key={idx} className="ml-5 list-decimal text-neutral-700 dark:text-neutral-300 my-1.5 leading-relaxed font-medium">
            {trimmed.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      return (
        <p key={idx} className="text-neutral-700 dark:text-neutral-300 my-3 leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Modal Container */}
      <div className="relative w-full h-full sm:h-[94vh] max-w-4xl bg-white dark:bg-neutral-900 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200/90 dark:border-neutral-800">
        
        {/* Scroll Progress Bar */}
        <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800">
          <div 
            className="h-full bg-amber-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Reader Top Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shrink-0">
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Hub</span>
          </button>

          {/* Reading Controls */}
          <div className="flex items-center gap-2">
            {/* Font size switcher */}
            <div className="flex items-center p-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-300">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs' : ''}`}
                title="Default text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-sm rounded ${fontSize === 'large' ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs' : ''}`}
                title="Large text size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('huge')}
                className={`px-2 py-1 text-base font-bold rounded ${fontSize === 'huge' ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs' : ''}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(article.id)}
              className={`p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                isSaved ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400'
              }`}
              title={isSaved ? 'Bookmarked' : 'Save article'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* WhatsApp Share */}
            <button
              onClick={handleShareWhatsApp}
              className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors relative"
              title="Copy article link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-8 bg-white dark:bg-neutral-900"
        >
          <div className="max-w-2xl mx-auto">
            
            {/* Unboxed Metadata (Zero-Pill Compliance) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3">
              <span className="text-amber-700 dark:text-amber-400 font-semibold">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Author Byline */}
            <div className="mt-4 pb-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold flex items-center justify-center text-sm">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {article.author.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {article.author.role}
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/8809611056361?text=${encodeURIComponent(`Hi M R S, I read your article "${article.title}" and wanted to ask...`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ask Author</span>
              </a>
            </div>

            {/* Main Content Body */}
            <div className={`font-serif-content mt-6 ${
              fontSize === 'normal' 
                ? 'text-base leading-relaxed' 
                : fontSize === 'large' 
                  ? 'text-lg leading-relaxed' 
                  : 'text-xl leading-relaxed'
            }`}>
              {renderFormattedContent(article.content)}
            </div>

            {/* Author Footer Card */}
            <div className="mt-12 p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold flex items-center justify-center text-lg">
                    M
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Written by {article.author.name}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Founder, MRS ADMIN &amp; M R S Multiverse · {BLOG_METADATA.email}
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/8809611056361?text=${encodeURIComponent(`Hello M R S, I found your article "${article.title}" very helpful!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Next Recommendation */}
            {nextArticle && (
              <div className="mt-8 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">Up Next</p>
                <div 
                  onClick={() => onSelectArticle(nextArticle)}
                  className="cursor-pointer group"
                >
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {nextArticle.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                    {nextArticle.excerpt}
                  </p>
                </div>
              </div>
            )}

            {/* Interactive Reader Comments & Discussion */}
            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Reader Discussion ({comments.length})
                  </h3>
                </div>
              </div>

              {/* Add Comment Form */}
              {!user ? (
                <div className="mb-8 space-y-3">
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Sign in with Google to leave a verified question or comment for M R S.
                    </p>
                    <button
                      type="button"
                      onClick={signInWithGoogle}
                      disabled={authLoading}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold shrink-0"
                    >
                      {authLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogIn className="w-3.5 h-3.5" />}
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                  {(commentError || authError) && (
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                      {commentError || authError}
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleAddComment} className="mb-8 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                  <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-3">
                    Commenting as <strong className="text-neutral-900 dark:text-white">{user.displayName || 'Reader'}</strong>:
                  </p>
                  <div className="flex flex-col gap-3">
                    <textarea
                      rows={3}
                      minLength={2}
                      maxLength={800}
                      placeholder="Write your question, feedback, or tip here..."
                      value={commentText}
                      onChange={(e) => {
                        setCommentText(e.target.value);
                        if (commentError) setCommentError(null);
                        if (authError) clearAuthError();
                      }}
                      required
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white"
                    />
                    {(commentError || authError) && (
                      <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                        {commentError || authError}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      {commentSuccess && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          ✓ Comment posted successfully!
                        </span>
                      )}
                      <button
                        type="submit"
                        disabled={commentSubmitting}
                        className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors disabled:opacity-60"
                      >
                        {commentSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                        <span>{commentSubmitting ? 'Posting...' : 'Post Comment'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    No comments yet on this article. Be the first to start a discussion!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="p-4 rounded-lg bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-neutral-900 dark:text-white">{c.authorName}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </span>
                          {user && (user.uid === c.authorUid || isAdmin) && (
                            <button
                              type="button"
                              onClick={() => handleDeleteComment(c.id)}
                              className="text-rose-500 hover:text-rose-700"
                              title="Delete comment"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
