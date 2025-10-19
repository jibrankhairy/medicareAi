"use client";

import React from "react";
import {
  Home,
  Zap,
  CheckSquare,
  Mail,
  Calendar,
  BarChart2,
  Settings,
  Plus,
  CircleUser,
  LogOut,
} from "lucide-react";

const MAIN_NAV = [
  { name: "Home", icon: Home, current: false },
  { name: "Prodify AI", icon: Zap, current: true, bold: true },
  { name: "My Tasks", icon: CheckSquare, current: false },
  { name: "Inbox", icon: Mail, current: false },
  { name: "Calendar", icon: Calendar, current: false },
  { name: "Reports & Analytics", icon: BarChart2, current: false },
];

const PROJECTS = [
  { name: "Product launch", color: "text-purple-600" },
  { name: "Team brainstorm", color: "text-blue-600" },
  { name: "Branding launch", color: "text-green-600" },
];

const Sidebar = () => {
  const NavItem = ({ item }: { item: (typeof MAIN_NAV)[0] }) => (
    <a
      href="#"
      className={`flex items-center p-2 rounded-lg transition-colors group ${
        item.current
          ? "text-gray-900 bg-gray-100 font-semibold"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
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

  return (
    <div className="flex flex-col w-60 h-full bg-white px-3 py-4 shadow-2xl shadow-gray-100/50">
      <div className="flex items-center p-2 mb-6 cursor-pointer">
        <div className="relative">
          <img
            className="w-8 h-8 rounded-full mr-3 object-cover"
            src="/path-to-your-avatar.jpg"
            alt="Courtney Henry avatar"
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

      <nav className="space-y-1">
        {MAIN_NAV.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </nav>

      <div className="my-6 border-t border-gray-100"></div>

      <div className="mb-auto">
        <div className="flex justify-between items-center px-2 mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            My Projects
          </span>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center">
            <Plus className="w-4 h-4 mr-1 text-gray-400" />
            <span className="text-xs text-blue-600 font-semibold">+ Add</span>
          </button>
        </div>

        <nav className="space-y-2 pt-1">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href="#"
              className="flex items-center p-2 rounded-lg text-sm text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <span
                className={`w-2 h-2 rounded-full mr-3 ${project.color}`}
                style={{
                  backgroundColor: project.color
                    .replace("text-", "")
                    .replace("-600", "")
                    .replace("-500", ""),
                }}
              ></span>
              <span className="flex-1 whitespace-nowrap">{project.name}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-auto pt-4 space-y-4">
        <div className="flex items-center p-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          <Settings className="w-5 h-5 mr-3 text-gray-400" />
          <span className="font-medium">Settings</span>
        </div>

        <div className="p-3 rounded-xl" style={{ backgroundColor: "#f0f3ff" }}>
          <div className="flex items-center mb-2">
            <div className="p-1 rounded-full bg-purple-600">
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
            style={{ backgroundColor: "#4c6fff" }}
          >
            + Invite people
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
