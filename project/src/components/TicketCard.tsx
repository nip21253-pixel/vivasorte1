import React from 'react';
import { Star } from 'lucide-react';

interface TicketCardProps {
  quantity: number;
  price: number;
  popular: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function TicketCard({ quantity, price, popular, isSelected, onClick }: TicketCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-3 rounded-lg text-center transition-all duration-200 ${
        isSelected 
          ? 'bg-green-500 text-white ring-4 ring-green-300 scale-105' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } active:scale-95`}
    >
      {popular && (
        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
          <Star className="w-3 h-3 text-white fill-white" />
        </div>
      )}
      <div className="text-xl font-bold">+{quantity}</div>
      <div className="text-xs">R${price.toFixed(2).replace('.', ',')}</div>
      <div className={`text-xs mt-1 rounded px-1 py-1 ${
        isSelected 
          ? 'bg-green-600' 
          : 'bg-blue-700'
      }`}>
        {isSelected ? 'SELECIONADO' : 'SELECIONAR'}
      </div>
    </button>
  );
}