import * as admin from "firebase-admin";
<<<<<<< HEAD
import { getAuth } from "firebase-admin/auth";
=======
>>>>>>> dev

const isConfigured = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
);

let auth = null;
<<<<<<< HEAD

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
=======
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
>>>>>>> dev
  } catch (error) {
    console.warn("Firebase Admin initialization skipped:", error.message);
  }
}

<<<<<<< HEAD
=======
if ((admin.apps ?? []).length) {
  auth = admin.auth();
}

>>>>>>> dev
export { auth };
export default auth;
