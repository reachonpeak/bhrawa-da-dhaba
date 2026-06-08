import "server-only";
import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Firebase Admin SDK singleton. Mirrors the factory pattern in
 * `src/lib/square-orders.ts`: reads credentials from the environment and
 * returns null when unconfigured so callers can degrade gracefully.
 *
 * Service-account credentials are SERVER-ONLY secrets — never expose them to
 * the client. The private key is stored with literal "\n" sequences in env and
 * un-escaped here.
 */
function getAdminApp(): App | null {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) return null;

  if (getApps().length) return getApp();
  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export function getAdminAuth(): Auth | null {
  const app = getAdminApp();
  return app ? getAuth(app) : null;
}

let firestoreSingleton: Firestore | null = null;

export function getAdminFirestore(): Firestore | null {
  const app = getAdminApp();
  if (!app) return null;
  if (firestoreSingleton) return firestoreSingleton;
  const db = getFirestore(app);
  // ignoreUndefinedProperties lets us store partial menu items without having
  // to strip undefined fields (e.g. optional description/image/tags).
  db.settings({ ignoreUndefinedProperties: true });
  firestoreSingleton = db;
  return db;
}
