// FIX: Add missing React import to fix reference errors.
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-8 bg-gray-50/50">
      <h3 className="text-xl font-semibold text-blue-800 border-b border-blue-200 pb-3 mb-6">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {children}
      </div>
    </div>
  );
};

export default Card;