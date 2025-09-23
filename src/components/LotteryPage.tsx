@@ .. @@
 import React, { useState } from 'react';
 import { Menu, ShoppingCart } from 'lucide-react';
-import CheckoutPopup from './CheckoutPopup';
-import TicketCard from './TicketCard';
-import QuantityCounter from './QuantityCounter';
-import { ticketOptions } from '@/data/ticketOptions';
-import { calculatePrice } from '@/utils/priceCalculator';
-import { useQuantitySelector } from '@/hooks/useQuantitySelector';
+import CheckoutPopup from '@/src/components/CheckoutPopup';
+import TicketCard from '@/src/components/TicketCard';
+import QuantityCounter from '@/src/components/QuantityCounter';
+import { ticketOptions } from '@/src/data/ticketOptions';
+import { calculatePrice } from '@/src/utils/priceCalculator';
+import { useQuantitySelector } from '@/src/hooks/useQuantitySelector';

 export default function LotteryPage() {
 }