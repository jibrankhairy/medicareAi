import React, { useState, useEffect, useRef, useCallback } from "react";
import { onSnapshot, Firestore, Query, DocumentData } from "firebase/firestore";
import {
  initFirebase,
  saveMessageToFirestore,
  getChatQuery,
  getHistorySessions,
} from "@/lib/firestoreSetup";
import { getHealthAnalysis } from "@/lib/ai";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
}

interface ChatManagerHook {
  userId: string;
  sessionId: string;
  sessions: ChatSession[];
  chatHistory: Message[];
  isThinking: boolean;
  isHomeView: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  startNewChat: () => void;
  loadChatSession: (newSessionId: string) => void;
  handleSendMessage: (text: string) => Promise<void>;
}

export const useChatManager = (): ChatManagerHook => {
  const [db, setDb] = useState<Firestore | null>(null);
  const [userId, setUserId] = useState<string>("loading");
  const [sessionId, setSessionId] = useState<string>(crypto.randomUUID());
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startNewChat = () => {
    setSessionId(crypto.randomUUID());
    setChatHistory([]);
  };

  const loadChatSession = useCallback((newSessionId: string) => {
    setSessionId(newSessionId);
  }, []);

  const loadSessions = useCallback(async () => {
    if (db && userId && !userId.startsWith("auth-failed")) {
      const loadedSessions = await getHistorySessions(db, userId);
      setSessions(loadedSessions);
    }
  }, [db, userId]);

  useEffect(() => {
    initFirebase()
      .then((result) => {
        setDb(result.db);
        setUserId(result.userId);
      })
      .catch((e) => {
        console.error("Fatal Firebase Init Error:", e);
        setUserId("auth-failed");
      });
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (
      db &&
      userId &&
      sessionId &&
      userId.startsWith("auth-failed") === false
    ) {
      try {
        const q: Query<DocumentData> = getChatQuery(db, userId, sessionId);

        unsubscribe = onSnapshot(q, (snapshot) => {
          const newMessages: Message[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              text: data.text || "Pesan kosong",
              sender: data.sender,
              timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
            };
          });
          setChatHistory(newMessages);
          loadSessions();
        });
      } catch (e) {
        console.error("Error setting up Firestore listener:", e);
      }
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [db, userId, sessionId, loadSessions]);

  useEffect(() => {
    if (
      db &&
      userId &&
      userId !== "loading" &&
      userId.startsWith("auth-failed") === false
    ) {
      loadSessions();
    }
  }, [db, userId, loadSessions]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async (text: string) => {
    if (
      !text.trim() ||
      isThinking ||
      !db ||
      userId === "loading" ||
      userId.startsWith("auth-failed")
    ) {
      console.warn("Cannot send message: DB/User ID not ready or thinking.");
      return;
    }

    const userMessagePromise = saveMessageToFirestore(db, userId, sessionId, {
      text,
      sender: "user",
    });

    setIsThinking(true);

    try {
      await userMessagePromise;

      const aiResponseText = await getHealthAnalysis(text);

      await saveMessageToFirestore(db, userId, sessionId, {
        text: aiResponseText,
        sender: "ai",
      });
    } catch (error) {
      console.error("AI Analysis/Firestore Save failed:", error);

      await saveMessageToFirestore(db, userId, sessionId, {
        text: "Maaf, terjadi kesalahan saat memproses permintaan Anda. (Cek koneksi AI/Firestore).",
        sender: "ai",
      });
    } finally {
      setIsThinking(false);
    }
  };

  const isHomeView = chatHistory.length === 0;

  return {
    userId,
    sessionId,
    sessions,
    chatHistory,
    isThinking,
    isHomeView,
    messagesEndRef,
    startNewChat,
    loadChatSession,
    handleSendMessage,
  };
};
