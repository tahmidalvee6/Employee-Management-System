import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

const isConfigured = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
);

let auth = null;

if (isConfigured) {
  try {
    const privateKey = (() => {
      let key = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
      if (key && !key.includes("-----BEGIN")) {
        key = "-----BEGIN PRIVATE KEY-----\n" + key + "\n-----END PRIVATE KEY-----\n";
      }
      return key;
    })();

    if (admin.getApps().length === 0) {
      admin.initializeApp({
        credential: admin.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      });
    }

    auth = getAuth();
  } catch (error) {
    console.warn("Firebase Admin initialization skipped:", error.message);
  }
}

export { auth };
export default auth;
