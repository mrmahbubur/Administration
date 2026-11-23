import React, { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { X, Inbox, CheckCircle2, Archive, Trash2, Loader2, Mail, AlertCircle } from 'lucide-react';
import { classifyFirebaseError, db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { InquiryItem } from '../types';

interface OwnerInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerInboxModal: React.FC<OwnerInboxModalProps> = ({ isOpen, onClose }) => {
  const { isAdmin, clearAuthError } = useAuth();
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [inboxError, setInboxError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setInboxError(null);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isAdmin) return;
    setLoading(true);
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
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
        setInquiries(items);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setInboxError(classifyFirebaseError(error));
        try {
          handleFirestoreError(error, OperationType.LIST, 'inquiries');
        } catch {
          // Logged via handleFirestoreError
        }
      }
    );
    return () => unsubscribe();
  }, [isOpen, isAdmin]);

  const handleClose = () => {
    setInboxError(null);
    clearAuthError();
    onClose();
  };

  if (!isOpen || !isAdmin) return null;

  const handleStatusChange = async (id: string, status: 'reviewed' | 'archived') => {
    setInboxError(null);
    try {
      await updateDoc(doc(db, 'inquiries', id), { status });
    } catch (error) {
      setInboxError(classifyFirebaseError(error));
      try {
        handleFirestoreError(error, OperationType.UPDATE, `inquiries/${id}`);
      } catch {
        // Logged via handleFirestoreError
      }
    }
  };

  const handleDelete = async (id: string) => {
    setInboxError(null);
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (error) {
      setInboxError(classifyFirebaseError(error));
      try {
        handleFirestoreError(error, OperationType.DELETE, `inquiries/${id}`);
      } catch {
        // Logged via handleFirestoreError
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[88vh]">
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Owner Inquiry Inbox ({inquiries.length})
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Real-time service inquiries and waitlist submissions stored in Firestore
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {inboxError && (
            <div role="alert" className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{inboxError}</span>
            </div>
          )}
          {loading ? (
            <div className="py-12 text-center text-xs text-neutral-500 flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
              <span>Loading inquiries...</span>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500">
              No inquiries recorded yet.
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">
                      {inq.senderName}
                    </span>
                    <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
                      {inq.senderEmail}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      inq.status === 'new'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : inq.status === 'reviewed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>

                <div className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {inq.serviceCategory} · {inq.urgency}
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {inq.message}
                </p>

                <div className="pt-2 border-t border-neutral-200/70 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-neutral-400">
                    {new Date(inq.createdAt).toLocaleString()}
                  </span>

                  <div className="flex items-center gap-3">
                    {inq.senderEmail && inq.senderEmail.includes('@') && (
                      <a
                        href={`mailto:${inq.senderEmail}?subject=${encodeURIComponent(`Re: ${inq.serviceCategory}`)}`}
                        className="inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:underline font-medium"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply Email</span>
                      </a>
                    )}
                    {inq.status === 'new' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(inq.id, 'reviewed')}
                        className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Reviewed</span>
                      </button>
                    )}
                    {inq.status !== 'archived' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(inq.id, 'archived')}
                        className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        <span>Archive</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id)}
                      className="inline-flex items-center gap-1 text-rose-600 font-medium hover:underline"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
