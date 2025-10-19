import React, { useState } from "react";
import { Plus, ExternalLink } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isThinking: boolean;
  placeholderText: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isThinking,
  placeholderText,
}) => {
  const [input, setInput] = useState("");

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (input.trim() && !isThinking) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <form onSubmit={handleSend} className="bg-transparent border-t-0">
      <div className="mx-auto w-full">
        <div className="relative flex items-center p-1 border border-gray-300 rounded-xl bg-white shadow-xl">
          <button
            type="button"
            className="p-2 mr-1 text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isThinking}
          >
            <Plus className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder={placeholderText}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isThinking}
            className="flex-1 text-sm text-gray-800 focus:outline-none p-2"
          />

          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="p-2 m-1 rounded-lg text-white transition-colors transform rotate-[315deg] disabled:bg-gray-400"
            style={{ backgroundColor: "#7864ff" }}
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          <div className="flex space-x-4">
            <button
              type="button"
              className="flex items-center hover:text-gray-700 transition-colors"
            >
              <Plus className="w-3 h-3 mr-1" /> Voice Message
            </button>
            <button
              type="button"
              className="flex items-center hover:text-gray-700 transition-colors"
            >
              <Plus className="w-3 h-3 mr-1" /> Browse Prompts
            </button>
          </div>
          <p className="text-right">{input.length} / 3,000</p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-2">
          Script may generate inaccurate information about people, places, or
          facts. Model: Script AI v1.3
        </p>
      </div>
    </form>
  );
};

export default ChatInput;
