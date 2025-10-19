import React from "react";
import { Plus } from "lucide-react";

interface CardButtonProps {
  icon: React.ElementType;
  title: string;
  onClick?: () => void;
}

const CardButton: React.FC<CardButtonProps> = ({
  icon: Icon,
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"
    >
      <div className="flex items-center">
        <div
          className="p-2 mr-3 rounded-lg bg-white shadow-md"
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
        >
          <Icon className="w-5 h-5 text-gray-700" />
        </div>
        <span className="text-sm font-medium text-gray-800">{title}</span>
      </div>
      <Plus className="w-4 h-4 text-gray-500" />
    </button>
  );
};

export default CardButton;
