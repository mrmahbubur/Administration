import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, FIREBASE_PROJECT_ID, googleProvider } from '../firebase';

interface AuthContextValue {
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  authLoading: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const ADMIN_EMAILS = ['mr216873@gmail.com', 'mrshahinunofficial@gmail.com'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to complete Google sign-in.';
      if (message.includes('popup-closed-by-user')) {
        return null;
      }
      if (message.includes('unauthorized-domain')) {
        const host = typeof window !== 'undefined' ? window.location.hostname : 'this domain';
        setAuthError(
          `Sign-in blocked: add "${host}" in Firebase Console (project ${FIREBASE_PROJECT_ID}) → Authentication → Settings → Authorized domains.`
        );
      } else if (message.includes('popup-blocked')) {
        setAuthError('Browser blocked the Google sign-in popup. Please enable popups for this site and retry.');
      } else if (message.includes('network-request-failed')) {
        setAuthError('Network error while connecting to Google Auth. Check your connection and try again.');
      } else {
        setAuthError('Sign-in could not be completed. Please allow popups and try again.');
      }
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signOut(auth);
    } catch {
      setAuthError('Unable to sign out right now.');
    } finally {
      setAuthLoading(false);
    }
  };

  const isAdmin = Boolean(
    user?.emailVerified && user.email && ADMIN_EMAILS.includes(user.email.toLowerCase())
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        isAdmin,
        authLoading,
        authError,
        signInWithGoogle,
        logout,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
