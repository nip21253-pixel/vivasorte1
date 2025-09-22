import { ticketOptions } from '../data/ticketOptions';

export const calculatePrice = (quantity: number): number => {
  const option = ticketOptions.find(opt => opt.quantity === quantity);
  if (option) return option.price;
  
  // Calcular preço proporcional para quantidades customizadas
  const basePrice = 0.99; // R$ 0,99 por título
  return quantity * basePrice;
};