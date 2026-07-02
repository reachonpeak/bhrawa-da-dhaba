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
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) return null;

    if (getApps().length) return getApp();
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  } catch (err) {
    console.error("Firebase admin app initialization failed:", err);
    return null;
  }
}

export function getAdminAuth(): Auth | null {
  try {
    const app = getAdminApp();
    return app ? getAuth(app) : null;
  } catch (err) {
    console.error("Firebase auth initialization failed:", err);
    return null;
  }
}

let firestoreSingleton: Firestore | null = null;

export function getAdminFirestore(): Firestore | null {
  try {
    const app = getAdminApp();
    if (!app) return null;
    if (firestoreSingleton) return firestoreSingleton;
    const db = getFirestore(app);
    // ignoreUndefinedProperties lets us store partial menu items without having
    // to strip undefined fields (e.g. optional description/image/tags).
    db.settings({ ignoreUndefinedProperties: true });
    firestoreSingleton = db;
    return db;
  } catch (err) {
    console.error("Firebase firestore initialization failed:", err);
    return null;
  }
}
