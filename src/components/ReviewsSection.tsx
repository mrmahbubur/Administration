import React, { useEffect, useMemo, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  Star,
  ShieldCheck,
  MessageSquarePlus,
  Edit3,
  Trash2,
  CheckCircle2,
  LogIn,
  LogOut,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { ReviewItem, ReviewServiceCategory } from '../types';

const SERVICE_OPTIONS: ReviewServiceCategory[] = [
  'Remote IT Support',
  'Virtual Assistance & Admin',
  'Professional CV Design',
  'Blogspot & WordPress Management',
  'Student Earning Guidance',
  'General Consultation',
];

export const ReviewsSection: React.FC = () => {
  const { user, isAdmin, authLoading, authError, signInWithGoogle, logout } = useAuth();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Filter & Sort state
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');

  // Form state
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [serviceUsed, setServiceUsed] = useState<ReviewServiceCategory>('Remote IT Support');
  const [roleOrCompany, setRoleOrCompany] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  useEffect(() => {
    const reviewsQuery = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const items: ReviewItem[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          const createdMs =
            d.createdAt instanceof Timestamp ? d.createdAt.toMillis() : Date.now();
          const updatedMs =
            d.updatedAt instanceof Timestamp ? d.updatedAt.toMillis() : createdMs;
          return {
            id: docSnap.id,
            authorUid: String(d.authorUid || ''),
            authorName: String(d.authorName || 'Verified Client'),
            roleOrCompany: String(d.roleOrCompany || ''),
            serviceUsed: (d.serviceUsed as ReviewServiceCategory) || 'General Consultation',
            rating: Number(d.rating || 5),
            title: String(d.title || ''),
            comment: String(d.comment || ''),
            createdAt: createdMs,
            updatedAt: updatedMs,
          };
        });
        setReviews(items);
        setLoadingReviews(false);
        setLoadError(null);
      },
      (error) => {
        setLoadingReviews(false);
        setLoadError('Unable to load live reviews right now.');
        try {
          handleFirestoreError(error, OperationType.LIST, 'reviews');
        } catch {
          // Logged via handleFirestoreError
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const stats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) {
      return {
        total: 0,
        average: '0.0',
        breakdown: [5, 4, 3, 2, 1].map((stars) => ({ stars, count: 0, pct: 0 })),
      };
    }
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = (sum / total).toFixed(1);
    const breakdown = [5, 4, 3, 2, 1].map((stars) => {
      const count = reviews.filter((r) => r.rating === stars).length;
      return {
        stars,
        count,
        pct: Math.round((count / total) * 100),
      };
    });
    return { total, average, breakdown };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    const list =
      serviceFilter === 'All'
        ? [...reviews]
        : reviews.filter((r) => r.serviceUsed === serviceFilter);

    if (sortBy === 'highest') {
      list.sort((a, b) => b.rating - a.rating || b.createdAt - a.createdAt);
    } else if (sortBy === 'lowest') {
      list.sort((a, b) => a.rating - b.rating || b.createdAt - a.createdAt);
    } else {
      list.sort((a, b) => b.createdAt - a.createdAt);
    }
    return list;
  }, [reviews, serviceFilter, sortBy]);

  const resetForm = () => {
    setRating(5);
    setHoverRating(0);
    setServiceUsed('Remote IT Support');
    setRoleOrCompany('');
    setTitle('');
    setComment('');
    setEditingId(null);
    setFormError(null);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!user) {
      setFormError('Please sign in with Google to submit a verified review.');
      return;
    }

    const cleanName = (user.displayName || 'Verified Client').trim().slice(0, 80);
    const cleanRole = roleOrCompany.trim().slice(0, 80);
    const cleanTitle = title.trim().slice(0, 100);
    const cleanComment = comment.trim().slice(0, 1000);

    if (cleanName.length < 2) {
      setFormError('Your account display name must be at least 2 characters.');
      return;
    }
    if (cleanTitle.length < 3) {
      setFormError('Please enter a review headline (at least 3 characters).');
      return;
    }
    if (cleanComment.length < 10) {
      setFormError('Please write at least 10 characters in your review.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        const ref = doc(db, 'reviews', editingId);
        await updateDoc(ref, {
          roleOrCompany: cleanRole,
          serviceUsed,
          rating: Math.min(5, Math.max(1, Math.round(rating))),
          title: cleanTitle,
          comment: cleanComment,
          updatedAt: serverTimestamp(),
        });
        setFormSuccess('Your review has been updated.');
      } else {
        await addDoc(collection(db, 'reviews'), {
          authorUid: user.uid,
          authorName: cleanName,
          roleOrCompany: cleanRole,
          serviceUsed,
          rating: Math.min(5, Math.max(1, Math.round(rating))),
          title: cleanTitle,
          comment: cleanComment,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setFormSuccess('Thank you! Your verified review is now published.');
      }
      resetForm();
      setTimeout(() => setFormSuccess(null), 4000);
    } catch (error) {
      setFormError('Could not save your review. Please check your permissions and try again.');
      try {
        handleFirestoreError(
          error,
          editingId ? OperationType.UPDATE : OperationType.CREATE,
          editingId ? `reviews/${editingId}` : 'reviews'
        );
      } catch {
        // Logged via handleFirestoreError
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartEdit = (rev: ReviewItem) => {
    setEditingId(rev.id);
    setRating(rev.rating);
    setServiceUsed(rev.serviceUsed);
    setRoleOrCompany(rev.roleOrCompany);
    setTitle(rev.title);
    setComment(rev.comment);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleDeleteReview = async (revId: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', revId));
      if (editingId === revId) {
        resetForm();
      }
    } catch (error) {
      setFormError('Unable to delete this review.');
      try {
        handleFirestoreError(error, OperationType.DELETE, `reviews/${revId}`);
      } catch {
        // Logged via handleFirestoreError
      }
    }
  };

  const formatDate = (ms: number) => {
    return new Date(ms).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section
      id="reviews-section"
      className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Verified Client Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Real Client Feedback &amp; Ratings
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
              Authentic, database-persisted reviews submitted by verified Google-authenticated clients and learners.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[160px]">
                  {user.displayName || user.email}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  disabled={authLoading}
                  className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={signInWithGoogle}
                disabled={authLoading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors shadow-xs"
              >
                {authLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                <span>Sign in with Google to Review</span>
              </button>
            )}
          </div>
        </div>

        {authError && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Rating Summary + Write a Review Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Rating Aggregate Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center gap-5">
                <div>
                  <div className="text-4xl font-black text-neutral-900 dark:text-white leading-none">
                    {stats.average}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= Math.round(Number(stats.average))
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-300 dark:text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {stats.total} {stats.total === 1 ? 'verified review' : 'verified reviews'}
                  </div>
                </div>

                <div className="flex-1 space-y-1.5">
                  {stats.breakdown.map((row) => (
                    <div key={row.stars} className="flex items-center gap-2 text-xs">
                      <span className="w-6 font-semibold text-neutral-600 dark:text-neutral-400">
                        {row.stars}★
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-300"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-neutral-500 dark:text-neutral-400">
                        {row.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Write / Edit Review Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <MessageSquarePlus className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{editingId ? 'Edit Your Review' : 'Leave a Real Review'}</span>
                </h3>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {!user ? (
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-center space-y-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Sign in with Google to publish a verified review. Your feedback is stored live in our database and helps future clients.
                  </p>
                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    disabled={authLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors"
                  >
                    {authLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <LogIn className="w-4 h-4" />
                    )}
                    <span>Continue with Google</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Star Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = star <= (hoverRating || rating);
                        return (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="p-1 rounded-md hover:scale-110 transition-transform"
                            aria-label={`Rate ${star} stars`}
                          >
                            <Star
                              className={`w-6 h-6 ${
                                active
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-neutral-300 dark:text-neutral-700'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                        {rating} / 5
                      </span>
                    </div>
                  </div>

                  {/* Service Category */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Service or Resource Used *
                    </label>
                    <select
                      value={serviceUsed}
                      onChange={(e) => setServiceUsed(e.target.value as ReviewServiceCategory)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Role / Company */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Your Role or Location (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength={80}
                      placeholder="e.g. Small Business Owner, Dhaka"
                      value={roleOrCompany}
                      onChange={(e) => setRoleOrCompany(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                    />
                  </div>

                  {/* Headline */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Review Headline *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={3}
                      maxLength={100}
                      placeholder="e.g. Fast turnaround and clean Blogspot setup"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Detailed Review *
                      </label>
                      <span className="text-[11px] text-neutral-400">{comment.length}/1000</span>
                    </div>
                    <textarea
                      rows={4}
                      required
                      minLength={10}
                      maxLength={1000}
                      placeholder="Share your honest experience working with M R S..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                    />
                  </div>

                  {formError && (
                    <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
                      {formError}
                    </div>
                  )}

                  {formSuccess && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{formSuccess}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors disabled:opacity-60"
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>
                      {submitting
                        ? 'Saving...'
                        : editingId
                          ? 'Update Verified Review'
                          : 'Publish Verified Review'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Filter Toolbar + Live Reviews Feed */}
          <div className="lg:col-span-7 space-y-4">
            {/* Filter & Sort Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <select
                aria-label="Filter reviews by service"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200"
              >
                <option value="All">All Services ({reviews.length})</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-500 dark:text-neutral-400">Sort:</span>
                <select
                  aria-label="Sort reviews"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'highest' | 'lowest')}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>
            </div>

            {loadError && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
                {loadError}
              </div>
            )}

            {loadingReviews ? (
              <div className="p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-500 flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                <span>Loading verified reviews...</span>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-2">
                <Star className="w-8 h-8 text-amber-400 mx-auto" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {reviews.length === 0
                    ? 'Be the First to Leave a Verified Review'
                    : 'No reviews match this service filter'}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                  {reviews.length === 0
                    ? 'Every review shown here is genuinely submitted by real visitors. Sign in with Google on the left to share your experience.'
                    : 'Try switching back to All Services to see all published feedback.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map((rev) => {
                  const canEdit = Boolean(user && user.uid === rev.authorUid);
                  const canDelete = Boolean(user && (user.uid === rev.authorUid || isAdmin));

                  return (
                    <article
                      key={rev.id}
                      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs flex items-center justify-center shrink-0">
                            {rev.authorName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-bold text-neutral-900 dark:text-white">
                                {rev.authorName}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Verified</span>
                              </span>
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">
                              {rev.roleOrCompany ? `${rev.roleOrCompany} · ` : ''}
                              {rev.serviceUsed} · {formatDate(rev.createdAt)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-neutral-300 dark:text-neutral-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                          {rev.title}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>

                      {(canEdit || canDelete) && (
                        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-3 text-xs">
                          {canEdit && (
                            <button
                              type="button"
                              onClick={() => handleStartEdit(rev)}
                              className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white font-medium"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                          )}
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDeleteReview(rev.id)}
                              className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 font-medium"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
