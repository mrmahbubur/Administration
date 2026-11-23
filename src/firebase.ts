import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

export const FIREBASE_PROJECT_ID = firebaseConfig.projectId;
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function classifyFirebaseError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  const lower = raw.toLowerCase();

  if (lower.includes('free daily read units per project')) {
    return `Firestore daily free-tier read quota reached. Upgrade or inspect usage at: https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/databases/${firebaseConfig.firestoreDatabaseId}/data?openUpgradeDialog=true`;
  }
  if (lower.includes('quota exceeded') || lower.includes('resource-exhausted')) {
    return 'Firestore daily quota exceeded. Free-tier quota resets the next day.';
  }
  if (lower.includes('permission-denied') || lower.includes('missing or insufficient permissions')) {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      return 'Your signed-in account email is not verified. Please use a verified Google account.';
    }
    return 'Request rejected by security rules. Please verify you are signed in and all fields meet required lengths.';
  }
  if (lower.includes('failed-precondition') && lower.includes('index')) {
    return 'A Firestore index is required for this query. Check the browser console for the direct index creation link.';
  }
  if (lower.includes('the client is offline') || lower.includes('unavailable')) {
    return 'Unable to reach Firestore right now. Please check your internet connection and retry.';
  }
  if (lower.includes('unauthorized-domain')) {
    return `This domain (${typeof window !== 'undefined' ? window.location.hostname : 'current host'}) is not yet added in Firebase Console (project ${firebaseConfig.projectId}) → Authentication → Settings → Authorized domains.`;
  }
  return 'A database error occurred. Please check your input or contact M R S directly.';
}

export function normalizeDisplayName(rawName: string | null | undefined, fallback = 'Verified User'): string {
  const cleaned = (rawName || '').trim().slice(0, 80);
  return cleaned.length >= 2 ? cleaned : fallback;
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

void testConnection();
