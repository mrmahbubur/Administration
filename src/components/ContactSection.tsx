import React, { useEffect, useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  ShieldCheck,
  UserCheck,
  Loader2,
  Inbox
} from 'lucide-react';
import { addDoc, collection, onSnapshot, query, serverTimestamp, Timestamp, where } from 'firebase/firestore';
import { BLOG_METADATA, PROFILE_DATA, FAQS } from '../data/blogData';
import { classifyFirebaseError, db, handleFirestoreError, normalizeDisplayName, OperationType } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { InquiryItem } from '../types';

export const ContactSection: React.FC = () => {
  const { user, authReady, signInWithGoogle, authLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Remote IT Support & Troubleshooting');
  const [urgency, setUrgency] = useState('Standard');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [myInquiries, setMyInquiries] = useState<InquiryItem[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (!authReady || !user || !user.emailVerified) {
      setMyInquiries([]);
      return;
    }
    const q = query(collection(db, 'inquiries'), where('senderUid', '==', user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: InquiryItem[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            senderUid: String(d.senderUid || ''),
            senderName: String(d.senderName || ''),
            senderEmail: String(d.senderEmail || ''),
            serviceCategory: String(d.serviceCategory || ''),
            urgency: String(d.urgency || ''),
            message: String(d.message || ''),
            status: (d.status as InquiryItem['status']) || 'new',
            createdAt: d.createdAt instanceof Timestamp ? d.createdAt.toMillis() : Date.now(),
          };
        });
        items.sort((a, b) => b.createdAt - a.createdAt);
        setMyInquiries(items);
      },
      (error) => {
        setSubmitError(classifyFirebaseError(error));
        try {
          handleFirestoreError(error, OperationType.LIST, 'inquiries');
        } catch {
          // Logged via handleFirestoreError
        }
      }
    );
    return () => unsubscribe();
  }, [authReady, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!user) {
      setSubmitError('Please sign in with Google to save your inquiry to the database, or send directly via WhatsApp or Email below.');
      return;
    }

    const typedName = name.trim();
    if (typedName.length > 0 && typedName.length < 2) {
      setSubmitError('Please enter your name (at least 2 characters).');
      return;
    }

    const cleanName = normalizeDisplayName(typedName || user.displayName, 'Visitor');
    const cleanEmail = (email || user.email || '').trim().slice(0, 120);
    const cleanMessage = message.trim().slice(0, 2000);

    if (cleanMessage.length < 5) {
      setSubmitError('Please enter at least 5 characters in your message.');
      return;
    }

    setSaving(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        senderUid: user.uid,
        senderName: cleanName,
        senderEmail: cleanEmail,
        serviceCategory: serviceCategory.slice(0, 100),
        urgency: urgency.slice(0, 60),
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

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Hello M R S, my name is ${name || 'a visitor'}. Service: ${serviceCategory} (${urgency} priority). Message: ${message || 'I would like to discuss remote work/support.'} (My email: ${email})`
    );
  };

  return (
    <section id="contact-section" className="py-12 sm:py-16 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Verification */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                <UserCheck className="w-4 h-4" />
                <span>Verified Direct Channels</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Connect with {PROFILE_DATA.displayName}
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Available for independent remote contracts, IT support, virtual administrative operations, and web solutions. Direct communication with minimal back-and-forth.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              {/* WhatsApp & Direct Phone */}
              <a
                href={`https://wa.me/8809611056361?text=${encodeURIComponent('Hello M R S, I am reaching out to discuss remote work/support.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 bg-neutral-50/50 dark:bg-neutral-800/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Direct WhatsApp &amp; Mobile</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {PROFILE_DATA.phoneFormatted}
                  </div>
                </div>
              </a>

              {/* Calendly Booking */}
              <a
                href={PROFILE_DATA.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/50 bg-neutral-50/50 dark:bg-neutral-800/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Schedule Video / Audio Call</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Book on Calendly (calendly.com/mrxshahin)
                  </div>
                </div>
              </a>

              {/* Verified Gravatar Email */}
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-800/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Direct Email (Gravatar Verified)</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                    {PROFILE_DATA.email}
                  </div>
                </div>
              </a>

              {/* Gravatar Official Link */}
              <a
                href={PROFILE_DATA.gravatarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 bg-neutral-50/50 dark:bg-neutral-800/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Public Gravatar Profile</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 transition-colors">
                    gravatar.com/{PROFILE_DATA.username}
                  </div>
                </div>
              </a>
            </div>

            {/* Accordion FAQs */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-2">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3.5 text-left text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <div className="px-3.5 pb-3.5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/60 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Comprehensive Inquire / Hire Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 shadow-xs">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1">
                Hire or Inquire Online
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                Tell me about your task, project, or technical roadblock. I review every submission personally.
              </p>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Inquiry Saved to M R S Inbox!
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                    Thank you, <strong>{name || user?.displayName}</strong>! Your inquiry regarding <em>{serviceCategory}</em> has been saved in Firestore for M R S to review. You can also message directly on WhatsApp or Email below.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/8809611056361?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Forward to WhatsApp ({PROFILE_DATA.phoneFormatted})</span>
                    </a>
                    <a
                      href={`mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(`Inquiry: ${serviceCategory}`)}&body=${getWhatsAppMessage()}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 text-white text-xs font-semibold"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                      }}
                      className="px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={120}
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                        Primary Service Area *
                      </label>
                      <select
                        value={serviceCategory}
                        onChange={(e) => setServiceCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                      >
                        <option value="Remote IT Support & Troubleshooting">Remote IT Support &amp; Troubleshooting</option>
                        <option value="Virtual Assistance & Admin Operations">Virtual Assistance &amp; Admin Operations</option>
                        <option value="Website & Blogger/WordPress Management">Website &amp; Blogger / WordPress Management</option>
                        <option value="Technical Writing & Documentation">Technical Writing &amp; Documentation</option>
                        <option value="Online Research & Data Organization">Online Research &amp; Data Verification</option>
                        <option value="AI Tools & Workflow Acceleration">AI Tools &amp; Workflow Acceleration</option>
                        <option value="Professional CV Design">Advanced Professional CV Design</option>
                        <option value="Other Project Inquiry">Other Project Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                        Timeline / Urgency
                      </label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                      >
                        <option value="Immediate / Emergency">Immediate / Urgent Need</option>
                        <option value="This Week">Within This Week</option>
                        <option value="Ongoing Retainer">Ongoing Monthly Retainer</option>
                        <option value="Flexible Timeline">Flexible Timeline</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Task Description or Questions *
                    </label>
                    <textarea
                      rows={4}
                      required
                      minLength={5}
                      maxLength={2000}
                      placeholder="Please specify system details, problem symptoms, spreadsheet scope, or blog URL..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                    />
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                      {submitError}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    {user ? (
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors disabled:opacity-60"
                      >
                        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                        <span>{saving ? 'Saving to Inbox...' : 'Save Inquiry Online'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={signInWithGoogle}
                        disabled={authLoading}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors disabled:opacity-60"
                      >
                        {authLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                        <span>Sign in with Google to Save Inquiry</span>
                      </button>
                    )}

                    <a
                      href={`https://wa.me/8809611056361?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(`Inquiry: ${serviceCategory}`)}&body=${getWhatsAppMessage()}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

            {user && myInquiries.length > 0 && (
              <div className="mt-6 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  <Inbox className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Your Saved Inquiries ({myInquiries.length})</span>
                </div>
                <div className="space-y-2.5">
                  {myInquiries.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-neutral-900 dark:text-white truncate">
                          {item.serviceCategory}
                        </span>
                        <span className="uppercase tracking-wider text-[10px] font-bold text-amber-700 dark:text-amber-400 shrink-0">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-300 line-clamp-2">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
