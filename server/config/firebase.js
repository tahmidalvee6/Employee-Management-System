import * as admin from "firebase-admin";

const isConfigured = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
);

let auth = null;
const apps = admin.apps ?? [];

if (isConfigured && apps.length === 0) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error) {
    console.warn("Firebase Admin initialization skipped:", error.message);
  }
}

if ((admin.apps ?? []).length) {
  auth = admin.auth();
}

export { auth };
export default auth;
