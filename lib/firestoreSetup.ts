import {
  getAuth,
  signInWithCustomToken,
  signInAnonymously,
  Auth,
} from "firebase/auth";
import {
  Firestore,
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  setLogLevel,
  Query,
  query,
  orderBy,
  DocumentData,
  doc,
  setDoc,
  getDocs,
  limit,
} from "firebase/firestore";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";

declare const __firebase_config: string;
declare const __initial_auth_token: string;
declare const __app_id: string;

let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;
let currentUserId: string = "loading";
let currentAppId: string = "default-app-id";

const initFirebaseFunction = async () => {
  const isCanvasReady = typeof __firebase_config !== "undefined";

  try {
    currentAppId = isCanvasReady ? __app_id : "default-app-id";
    let firebaseConfig;
    let appInstance: FirebaseApp;

    if (getApps().length === 0 && isCanvasReady) {
      firebaseConfig = JSON.parse(__firebase_config);
      appInstance = initializeApp(firebaseConfig, currentAppId);
    } else if (getApps().length === 0 && !isCanvasReady) {
      firebaseConfig = {
        apiKey: "dummy",
        authDomain: "dummy.firebaseapp.com",
        projectId: "dummy-medicare",
        appId: "dummy",
        storageBucket: "dummy.appspot.com",
        messagingSenderId: "dummy",
      };
      appInstance = initializeApp(firebaseConfig, "fallback-app");
    } else {
      appInstance = getApp();
    }

    authInstance = getAuth(appInstance);
    dbInstance = getFirestore(appInstance);
    setLogLevel("debug");

    const token =
      isCanvasReady && typeof __initial_auth_token !== "undefined"
        ? __initial_auth_token
        : null;

    if (token) {
      try {
        await signInWithCustomToken(authInstance, token);
      } catch (e) {
        console.warn(
          "[Canvas Firebase] Custom token sign-in failed. Falling back to anonymous or default."
        );
      }
    }

    if (!authInstance.currentUser) {
      try {
        await signInAnonymously(authInstance);
      } catch (anonError) {
        console.warn(
          `[Canvas Firebase] Anonymous sign-in failed: ${anonError}. Proceeding with default user ID.`
        );
      }
    }

    currentUserId = authInstance.currentUser?.uid || crypto.randomUUID();
    console.log(
      `[Canvas Firebase] Final User ID: ${currentUserId}, DB Status: OK`
    );
  } catch (error) {
    console.error("[Canvas Firebase] Fatal Initialization Failed:", error);
    currentUserId = "auth-failed-" + crypto.randomUUID();
    dbInstance = null;
  }

  return {
    db: dbInstance,
    auth: authInstance,
    userId: currentUserId,
    appId: currentAppId,
  };
};

export const getMessageCollectionRef = (
  db: Firestore,
  userId: string,
  sessionId: string
) => {
  const currentAppId =
    typeof __app_id !== "undefined" ? __app_id : "default-app-id";
  return collection(
    db,
    `artifacts/${currentAppId}/users/${userId}/sessions/${sessionId}/messages`
  );
};

export const getSessionsCollectionRef = (db: Firestore, userId: string) => {
  const currentAppId =
    typeof __app_id !== "undefined" ? __app_id : "default-app-id";
  return collection(db, `artifacts/${currentAppId}/users/${userId}/sessions`);
};

export const saveMessageToFirestore = async (
  db: Firestore | null,
  userId: string,
  sessionId: string,
  message: { text: string; sender: "user" | "ai" }
) => {
  try {
    if (!db) {
      console.error("Firestore DB is not initialized. Cannot save message.");
      return;
    }

    const chatRef = getMessageCollectionRef(db, userId, sessionId);
    await addDoc(chatRef, {
      ...message,
      timestamp: serverTimestamp(),
    });

    const sessionRef = getSessionsCollectionRef(db, userId);
    const sessionDocRef = doc(sessionRef, sessionId);

    const isUserMessage = message.sender === "user";

    const sessionData = {
      userId: userId,
      lastActivity: serverTimestamp(),
      title: isUserMessage
        ? message.text.substring(0, 30) +
          (message.text.length > 30 ? "..." : "")
        : "New Session",
      createdAt: serverTimestamp(),
    };

    await setDoc(sessionDocRef, sessionData, { merge: true });
  } catch (error) {
    console.error("Error saving message to Firestore:", error);
  }
};

export const getChatQuery = (
  db: Firestore,
  userId: string,
  sessionId: string
): Query<DocumentData> => {
  const chatRef = getMessageCollectionRef(db, userId, sessionId);
  return query(chatRef, orderBy("timestamp", "asc"));
};

export const getHistorySessions = async (db: Firestore, userId: string) => {
  if (!db) return [];
  const sessionsRef = getSessionsCollectionRef(db, userId);
  const q = query(sessionsRef, orderBy("lastActivity", "desc"), limit(10));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title || "Untitled Chat",
  }));
};

export { initFirebaseFunction as initFirebase };
