import { useState } from 'react';

export const useQuantitySelector = (initialQuantity = 20) => {
  const [selectedQuantity, setSelectedQuantity] = useState(initialQuantity);
  const [customQuantity, setCustomQuantity] = useState(initialQuantity);

  const handleQuantitySelect = (quantity: number) => {
    setSelectedQuantity(quantity);
    setCustomQuantity(quantity);
  };

  const incrementQuantity = () => {
    setCustomQuantity(prev => {
      let newValue;
      if (prev < 20) newValue = 20;
      else if (prev < 30) newValue = 30;
      else if (prev < 40) newValue = 40;
      else if (prev < 70) newValue = 70;
      else if (prev < 100) newValue = 100;
      else if (prev < 200) newValue = 200;
      else newValue = prev; // Already at maximum
      
      // Auto-select the corresponding card
      setSelectedQuantity(newValue);
      return newValue;
    });
  };

  const decrementQuantity = () => {
    setCustomQuantity(prev => {
      let newValue;
      if (prev > 200) newValue = 200;
      else if (prev > 100) newValue = 100;
      else if (prev > 70) newValue = 70;
      else if (prev > 40) newValue = 40;
      else if (prev > 30) newValue = 30;
      else if (prev > 20) newValue = 20;
      else newValue = prev; // Already at minimum
      
      // Auto-select the corresponding card
      setSelectedQuantity(newValue);
      return newValue;
    });
  };

  return {
    selectedQuantity,
    customQuantity,
    handleQuantitySelect,
    incrementQuantity,
    decrementQuantity
  };
};