"use client";

import React from "react";
import {
  Zap,
  CheckSquare,
  Mail,
  Calendar,
  BarChart2,
  Settings,
  Plus,
  Clock,
} from "lucide-react";

const BASE_COLOR = "#427693";
const LIGHT_BG_COLOR = "#e9f0f4";

interface ChatSession {
  id: string;
  title: string;
}

interface SidebarProps {
  startNewChat: () => void;
  loadChatSession: (id: string) => void;
  sessions: ChatSession[];
  currentSessionId: string;
}

const MAIN_NAV = [
  { name: "Prodify AI", icon: Zap, current: true, bold: true },
  { name: "My Tasks", icon: CheckSquare, current: false },
  { name: "Inbox", icon: Mail, current: false },
  { name: "Calendar", icon: Calendar, current: false },
  { name: "Reports & Analytics", icon: BarChart2, current: false },
];

const Sidebar: React.FC<SidebarProps> = ({
  startNewChat,
  sessions,
  loadChatSession,
  currentSessionId,
}) => {
  const NavItem = ({ item }: { item: (typeof MAIN_NAV)[0] }) => (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
      }}
      className={`flex items-center p-2 rounded-lg transition-colors group ${
        item.current
          ? "bg-gray-100 font-semibold"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
      style={item.current ? { color: BASE_COLOR } : {}}
    >
      <item.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600" />
      <span
        className={`flex-1 whitespace-nowrap text-sm ${
          item.bold ? "font-semibold" : ""
        }`}
      >
        {item.name}
      </span>
    </a>
  );

  const HistoryItem = ({ session }: { session: ChatSession }) => {
    const isCurrent = session.id === currentSessionId;

    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          loadChatSession(session.id);
        }}
        className={`flex items-center p-2 rounded-lg text-sm transition-colors group ${
          isCurrent ? "font-medium" : "text-gray-800 hover:bg-gray-100"
        }`}
        style={
          isCurrent
            ? { color: BASE_COLOR, backgroundColor: LIGHT_BG_COLOR }
            : {}
        }
      >
        <Clock
          className={`w-4 h-4 mr-3`}
          style={{ color: isCurrent ? BASE_COLOR : "rgb(156 163 175)" }}
        />{" "}
        <span className="flex-1 whitespace-nowrap truncate">
          {session.title}
        </span>
      </a>
    );
  };

  return (
    <div className="flex flex-col w-60 h-full bg-white px-3 py-4 shadow-2xl shadow-gray-100/50">
      <div className="flex items-center p-2 mb-6 cursor-pointer">
        <div className="relative">
          <img
            className="w-8 h-8 rounded-full mr-3 object-cover"
            src="https://placehold.co/150x150/7864ff/ffffff?text=C"
            alt="User avatar"
          />
          <div className="absolute bottom-0 right-2 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-900 leading-tight">
            Courtney Henry
          </p>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={startNewChat}
          className="w-full flex items-center px-4 py-2 text-sm font-bold text-white transition-colors 
                       bg-[#427693] hover:bg-[#31576d] shadow-md rounded-full"
        >
          <Plus className="w-4 h-4 mr-3 text-white" />
          New Chat
        </button>
      </div>

      <nav className="space-y-1 mb-6 border-b pb-4 border-gray-100">
        {MAIN_NAV.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 block mb-2">
          History ({sessions.length})
        </span>
        <nav className="space-y-1">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <HistoryItem key={session.id} session={session} />
            ))
          ) : (
            <p className="text-xs text-gray-400 px-2">No previous chats.</p>
          )}
        </nav>
      </div>

      <div className="mt-auto pt-4 space-y-4 border-t border-gray-100">
        <div
          className="flex items-center p-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          style={{ color: BASE_COLOR }}
        >
          <Settings className="w-5 h-5 mr-3" style={{ color: BASE_COLOR }} />{" "}
          <span className="font-medium">Settings</span>
        </div>

        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: LIGHT_BG_COLOR }}
        >
          <div className="flex items-center mb-2">
            <div
              className="p-1 rounded-full"
              style={{ backgroundColor: BASE_COLOR }}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="ml-2 font-semibold text-sm text-gray-900">
              prodify
            </span>
          </div>
          <p className="text-xs text-gray-700 mb-3">
            New members will gain access to public Spaces, Docs and Dashboards
          </p>
          <button
            className="w-full text-center py-2 px-3 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: BASE_COLOR }}
          >
            + Invite people
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
