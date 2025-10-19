"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Stethoscope,
  Heart,
  FileText,
  Activity,
  User,
  Bot,
  AlertTriangle,
  Send,
} from "lucide-react";
import { onSnapshot, Firestore, Query, DocumentData } from "firebase/firestore";
import {
  initFirebase,
  saveMessageToFirestore,
  getChatQuery,
} from "@/lib/firestoreSetup";
import { getHealthAnalysis } from "@/lib/ai";

import Sidebar from "./components/Sidebar";
import ChatInput from "./components/ChatInput";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const FEATURE_CARDS = [
  {
    title: "Input Data Harian",
    icon: FileText,
    description: "Catat hasil lab (Gula, Kolesterol, Asam Urat, dll.)",
  },
  {
    title: "Diagnosa & Rekomendasi",
    icon: Stethoscope,
    description: "Dapatkan diagnosa awal dan rekomendasi AI.",
  },
  {
    title: "Analisis Kesehatan AI",
    icon: Activity,
    description: "Lihat tren dan pola data kesehatanmu.",
  },
  {
    title: "Ringkasan Riwayat",
    icon: Heart,
    description: "Lihat rangkuman status kesehatanmu.",
  },
];

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon: Icon,
}) => (
  <div
    className="flex flex-col items-center justify-center p-6 bg-white rounded-xl text-center shadow-lg border border-gray-100 min-w-[200px] h-36 transition-all duration-300 cursor-default
               hover:shadow-2xl hover:border-purple-300 transform hover:scale-[1.02] active:scale-[1.01]"
  >
    <Icon className="w-6 h-6 text-purple-600 mb-2 flex-shrink-0" />
    <p className="text-base font-semibold text-gray-800">{title}</p>
    <p className="text-xs text-gray-500 mt-1">{description}</p>
  </div>
);

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.sender === "user";
  return (
    <div className={`flex mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3xl flex items-start ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`p-2 rounded-full ${
            isUser ? "bg-purple-600" : "bg-gray-200"
          } ${isUser ? "ml-3" : "mr-3"}`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-gray-700" />
          )}
        </div>
        <div
          className={`p-4 rounded-xl shadow-md ${
            isUser
              ? "bg-purple-500 text-white rounded-tr-none"
              : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
          }`}
        >
          <div
            className="whitespace-pre-wrap text-sm"
            dangerouslySetInnerHTML={{
              __html: message.text
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\n/g, "<br/>"),
            }}
          />
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [db, setDb] = useState<Firestore | null>(null);
  const [userId, setUserId] = useState<string>("loading");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      userId !== "loading" &&
      userId.startsWith("auth-failed") === false
    ) {
      try {
        const q: Query<DocumentData> = getChatQuery(db, userId);

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
  }, [db, userId]);

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

    // 1. Simpan pesan User ke Firestore
    const userMessagePromise = saveMessageToFirestore(db, userId, {
      text,
      sender: "user",
    });

    setIsThinking(true);

    try {
      await userMessagePromise;

      const aiResponseText = await getHealthAnalysis(text);

      await saveMessageToFirestore(db, userId, {
        text: aiResponseText,
        sender: "ai",
      });
    } catch (error) {
      console.error("AI Analysis/Firestore Save failed:", error);

      await saveMessageToFirestore(db, userId, {
        text: "Maaf, terjadi kesalahan saat memproses permintaan Anda. (Cek koneksi AI/Firestore).",
        sender: "ai",
      });
    } finally {
      setIsThinking(false);
    }
  };

  const ThinkingIndicator = () => (
    <div className="flex items-center text-gray-500 text-sm italic mb-6 ml-14">
      <Bot className="w-5 h-5 mr-2 animate-pulse text-purple-500" />
      AI sedang menganalisis data...
    </div>
  );

  const isHomeView = chatHistory.length === 0;

  if (userId === "loading") {
    return (
      <div className="flex h-screen items-center justify-center text-lg">
        Memuat layanan Medicare...
      </div>
    );
  }

  if (userId.startsWith("auth-failed") || !db) {
    return (
      <div className="flex h-screen items-center justify-center text-lg text-red-600 p-10 text-center">
        <AlertTriangle className="w-6 h-6 mr-2" />
        Gagal menyambung ke layanan database dan autentikasi. Pastikan Anda
        sudah mengaktifkan Firestore di konsol Firebase.
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto w-full flex justify-center pt-8 px-10">
          <div className="w-full max-w-4xl mx-auto flex flex-col">
            <div
              className={`flex flex-col flex-grow ${
                isHomeView ? "justify-center items-center h-full" : "pt-2"
              }`}
            >
              {isHomeView ? (
                <div className="flex flex-col items-center pt-10 pb-40 w-full max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                      MEDICARE AI Assistant
                    </h1>
                    <p className="text-lg text-gray-500">
                      Ketik data pemeriksaan Anda untuk memulai diagnosis.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {FEATURE_CARDS.map((card) => (
                      <InfoCard
                        key={card.title}
                        title={card.title}
                        description={card.description}
                        icon={card.icon}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="pb-5">
                  {chatHistory.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                  {isThinking && <ThinkingIndicator />}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        <div
          className={`w-full flex justify-center border-t border-gray-200 sticky bottom-0 z-10 ${
            isHomeView ? "bg-transparent pt-0" : "bg-gray-50 pt-2 pb-8"
          }`}
        >
          <div
            className={`w-full ${
              isHomeView ? "max-w-4xl px-10" : "max-w-4xl px-10"
            }`}
          >
            <ChatInput
              onSendMessage={handleSendMessage}
              isThinking={isThinking}
              placeholderText={
                isHomeView
                  ? "Masukkan data Anda di sini (misal: Gula 120, Tekanan 130/90...)"
                  : "Ketik pertanyaan atau data Anda selanjutnya..."
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
