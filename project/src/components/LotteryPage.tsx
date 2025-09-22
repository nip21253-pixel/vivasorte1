'use client';

import React, { useState } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import CheckoutPopup from './CheckoutPopup';
import TicketCard from './TicketCard';
import QuantityCounter from './QuantityCounter';
import { ticketOptions } from '@/data/ticketOptions';
import { calculatePrice } from '@/utils/priceCalculator';
import { useQuantitySelector } from '@/hooks/useQuantitySelector';

export default function LotteryPage() {
  const [showCheckout, setShowCheckout] = useState(false);
  const {
    selectedQuantity,
    customQuantity,
    handleQuantitySelect,
    incrementQuantity,
    decrementQuantity
  } = useQuantitySelector(20);

  const handleBuyClick = () => {
    setShowCheckout(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <img 
            src="/-logoviva.png" 
            alt="VIVA SORTE"
            className="h-8 md:h-10"
          />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-blue-600" />
        </button>
      </header>

      <div className="px-4 max-w-sm mx-auto">
        {/* Banner Principal */}
        <div className="relative rounded-2xl mb-6 overflow-hidden">
          <img 
            src="/-imgviva.webp" 
            alt="1 MILHÃO - Viva Sorte"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Informação do sorteio */}
        <div className="text-center mb-4 px-2">
          <span className="text-gray-700">O Sorteio será </span>
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">HOJE</span>
          <span className="text-gray-700"> por apenas </span>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">R$0,99</span>
        </div>

        {/* Cards de seleção */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {ticketOptions.map((option) => (
            <TicketCard
              key={option.quantity}
              quantity={option.quantity}
              price={option.price}
              popular={option.popular}
              isSelected={selectedQuantity === option.quantity}
              onClick={() => handleQuantitySelect(option.quantity)}
            />
          ))}
        </div>

        {/* Contador customizado */}
        <QuantityCounter
          quantity={customQuantity}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
        />

        {/* Botão de comprar */}
        <button 
          onClick={handleBuyClick}
          className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors active:scale-98 mb-4"
        >
          <ShoppingCart className="w-5 h-5" />
          COMPRAR TÍTULOS
        </button>

        {/* Texto informativo */}
        <p className="text-center text-gray-600 text-sm mb-6 px-2">
          Comprar mais títulos aumenta suas chances de ganhar!
        </p>

        {/* Imagem do rodapé */}
        <div className="mb-6">
          <img 
            src="/-image copy.png" 
            alt="Hospital do Câncer de Londrina - Instituição beneficiada"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Rodapé com informações legais */}
        <div className="mb-6">
          <img 
            src="/-image copy copy.png" 
            alt="Informações legais - Viva Sorte, ViaCap, Viva Privilégios, EDJ Digital"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Popup de Checkout */}
      <CheckoutPopup
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        quantity={customQuantity}
        totalPrice={calculatePrice(customQuantity)}
      />
    </div>
  );
}