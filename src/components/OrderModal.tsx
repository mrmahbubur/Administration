import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Send, CheckCircle2, ShieldCheck, Loader2, Mail } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Service, Project } from '../types';
import { classifyFirebaseError, db, handleFirestoreError, normalizeDisplayName, OperationType } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { PROFILE_DATA } from '../data/blogData';

interface OrderModalProps {
  item: Service | Project | null;
  type: 'service' | 'waitlist';
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ item, type, onClose }) => {
  const { user, signInWithGoogle, authLoading, authError, clearAuthError } = useAuth();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setSubmitted(false);
    setSubmitError(null);
    setDetails('');
    clearAuthError();
  }, [item?.id, type]);

  const clearErrors = () => {
    if (submitError) setSubmitError(null);
    if (authError) clearAuthError();
  };

  if (!item) return null;

  const isService = type === 'service';
  const service = item as Service;
  const project = item as Project;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!user) {
      setSubmitError('Sign in with Google to save your request online, or message M R S directly via WhatsApp or Email below.');
      return;
    }

    const typedName = name.trim();
    if (typedName.length > 0 && typedName.length < 2) {
      setSubmitError('Please enter your name (at least 2 characters).');
      return;
    }

    const cleanName = normalizeDisplayName(typedName || user.displayName, 'Visitor');
    const cleanContact = (contact || user.email || '').trim().slice(0, 120);
    const cleanMessage = (details || `${isService ? 'Service inquiry' : 'Early interest'} for ${item.title}`)
      .trim()
      .slice(0, 2000);

    if (cleanMessage.length < 5) {
      setSubmitError('Please enter at least 5 characters of details.');
      return;
    }

    setSaving(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        senderUid: user.uid,
        senderName: cleanName,
        senderEmail: cleanContact,
        serviceCategory: item.title.slice(0, 100),
        urgency: isService ? 'Service Order' : 'Project Interest',
        message: cleanMessage,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(classifyFirebaseError(error));
      try {
        handleFirestoreError(error, OperationType.CREATE, 'inquiries');
      } catch {
        // Logged via handleFirestoreError
      }
    } finally {
      setSaving(false);
    }
  };

  const generateMessageText = () => {
    if (isService) {
      return `Hello M R S, my name is ${name || 'a visitor'}. I am interested in: "${service.title}". Details: ${details || 'Please share more info.'} (Contact: ${contact})`;
    }
    return `Hello M R S, my name is ${name || 'a visitor'}. I would like to register interest in "${project.title}". (Contact: ${contact})`;
  };

  const generateWhatsAppUrl = () => {
    return `https://wa.me/8809611056361?text=${encodeURIComponent(generateMessageText())}`;
  };

  const generateMailtoUrl = () => {
    return `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
      `${isService ? 'Service Inquiry' : 'Project Interest'}: ${item.title}`
    )}&body=${encodeURIComponent(generateMessageText())}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {isService ? 'Direct Service Request' : 'Project Early Interest'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                Saved to M R S Inbox!
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto">
                Your submission for <strong>{item.title}</strong> is saved in Firestore. For instant discussion, you can also open WhatsApp or Email below.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open in WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {isService
                  ? `Reach M R S directly regarding ${service.title}.`
                  : `Register your interest in ${project.title} or reach M R S directly.`}
              </p>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearErrors();
                  }}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Email or WhatsApp Number *
                </label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  placeholder="you@example.com or phone number"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    clearErrors();
                  }}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                />
              </div>

              {isService && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Specific Requirements or Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    maxLength={2000}
                    placeholder="Share your requirements, target role, or website URL..."
                    value={details}
                    onChange={(e) => {
                      setDetails(e.target.value);
                      clearErrors();
                    }}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                  />
                </div>
              )}

              {(submitError || authError) && (
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                  {submitError || authError}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                {user ? (
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors disabled:opacity-60"
                  >
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>{saving ? 'Saving...' : 'Save to Owner Inbox'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    disabled={authLoading}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors disabled:opacity-60"
                  >
                    {authLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                    <span>Sign in to Save Online</span>
                  </button>
                )}

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={generateMailtoUrl()}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Direct communication with M R S ({PROFILE_DATA.email}).</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
