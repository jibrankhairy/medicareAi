"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Stethoscope,
  Heart,
  FileText,
  Activity,
  Zap,
  User,
  Bot,
  AlertTriangle,
  Send,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import ChatInput from "./components/ChatInput";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
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
    {/* Penambahan flex-shrink-0 untuk memastikan ikon tidak tersembunyi */}
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
          <p className="whitespace-pre-wrap text-sm">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = (text: string) => {
    if (!text.trim() || isThinking) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };

    setChatHistory((prev) => [...prev, newUserMessage]);
    setIsThinking(true);

    const mockAIResponse = `
        Baik, saya akan menganalisis data Anda berdasarkan input: "${text}".

        **[SIMULASI DIAGNOSA & ANALISIS AI]**

        Berdasarkan data yang Anda masukkan, berikut analisis kesehatan Anda:
        
        * **Gula Darah:** 120 mg/dL (Normal).
        * **Kolesterol:** 200 mg/dL (Batas Normal Tinggi).
        * **Asam Urat:** 6.5 mg/dL (Hampir tinggi, perhatikan diet purin).
        * **Tekanan Darah:** 120/80 mmHg (Optimal).

        **Rekomendasi AI:**
        Fokus utama Anda saat ini adalah **menurunkan Kolesterol Total** dan menjaga kadar Asam Urat. 
        1. **Diet:** Kurangi makanan tinggi lemak jenuh. Perbanyak asupan serat.
        2. **Aktivitas:** Minimal 30 menit olahraga ringan setiap hari.
        3. **Tindak Lanjut:** Input data lagi dalam 1 minggu untuk melihat tren.
        `;

    setTimeout(() => {
      const newAIMessage: Message = {
        id: Date.now() + 1,
        text: mockAIResponse.trim(),
        sender: "ai",
      };
      setChatHistory((prev) => [...prev, newAIMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const ThinkingIndicator = () => (
    <div className="flex items-center text-gray-500 text-sm italic mb-6 ml-14">
      <Bot className="w-5 h-5 mr-2 animate-pulse text-purple-500" />
      AI sedang menganalisis data...
    </div>
  );

  const isHomeView = chatHistory.length === 0;

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
