import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityCounterProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

export default function QuantityCounter({ 
  quantity, 
  onIncrement, 
  onDecrement, 
  minQuantity = 20, 
  maxQuantity = 200 
}: QuantityCounterProps) {
  return (
    <div className="bg-blue-600 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={onDecrement}
          disabled={quantity <= minQuantity}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors ${
            quantity <= minQuantity 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-700 hover:bg-blue-800'
          }`}
        >
          <Minus className="w-5 h-5" />
        </button>
        
        <div className="bg-white rounded-lg px-6 py-2 min-w-[100px] text-center">
          <div className="text-xl font-bold text-gray-800">
            {quantity}
          </div>
        </div>
        
        <button 
          onClick={onIncrement}
          disabled={quantity >= maxQuantity}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors ${
            quantity >= maxQuantity 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-700 hover:bg-blue-800'
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}