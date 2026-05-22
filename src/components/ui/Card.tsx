import React from "react";

interface CardProps {
  children: React.ReactNode;
  className: string;
}

export const Card:React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`cursor-pointer border-4 border-purple-400 rounded-lg p-6
      shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/40
      transition-all duration-300 hover:scale-105 bg-white ${className ?? ""}`}
    >
      {children}
    </div>
  );
};

export default Card;