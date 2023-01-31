import { initializeApp } from "firebase/app";
import config from "config/firebaseConfig";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

type FirebaseId = "fairdoor-v0" | "fairdoor-app";

const projectId =
  process.env.NEXT_PUBLIC_ENV === "prod"
    ? process.env.NEXT_PUBLIC_PROJECT_ID_PROD
    : process.env.NEXT_PUBLIC_PROJECT_ID_STAGING;

const firebaseApp = initializeApp(config.firebase[projectId as FirebaseId]);

export const auth = initializeAuth(firebaseApp, {
  persistence: browserLocalPersistence,
  // No popupRedirectResolver defined
});

export const db = getFirestore(firebaseApp);
export const storage = getStorage();
export const functions = getFunctions(firebaseApp);
