export interface TicketOption {
  quantity: number;
  price: number;
  popular: boolean;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export interface SunizeTransaction {
  id: string;
  external_id: string;
  status: 'AUTHORIZED' | 'PENDING' | 'CHARGEBACK' | 'FAILED' | 'IN_DISPUTE';
  total_value: number;
  customer: {
    email: string;
    name: string;
  };
  payment_method: string;
  pix: {
    payload: string;
  };
  hasError: boolean;
}

export interface SunizeCreateTransactionRequest {
  external_id: string;
  total_amount: number;
  payment_method: 'PIX';
  items: Array<{
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    is_physical: boolean;
  }>;
  ip: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    document_type: 'CPF';
    document: string;
  };
}