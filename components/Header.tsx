import React from 'react';
import { LogoIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <LogoIcon className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800 ml-3">AIスライドジェネレーター</h1>
      </div>
    </header>
  );
};