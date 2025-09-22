import React, { useState } from 'react';
import { X, User, Mail, Phone, CreditCard, Copy, QrCode, Loader2 } from 'lucide-react';
import QRCode from 'qrcode';
import { SunizeTransaction } from '@/types/lottery';

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  totalPrice: number;
}

export default function CheckoutPopup({ isOpen, onClose, quantity, totalPrice }: CheckoutPopupProps) {
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [pixCode, setPixCode] = useState<string>('');
  const [transactionData, setTransactionData] = useState<SunizeTransaction | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPhone = (phone: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = phone.replace(/\D/g, '');
    
    // Adiciona o código do país (+55) se não estiver presente
    if (numbers.length === 11) {
      return `+55${numbers}`;
    } else if (numbers.length === 10) {
      return `+55${numbers}`;
    }
    
    return `+55${numbers}`;
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/\D/g, '');
  };

  const generateExternalId = () => {
    return `viva-sorte-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const getClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return '127.0.0.1'; // Fallback IP
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const clientIP = await getClientIP();
      
      const transactionData = {
        external_id: generateExternalId(),
        total_amount: totalPrice,
        payment_method: 'PIX' as const,
        items: [
          {
            id: 'viva-sorte-tickets',
            title: `${quantity} Títulos da Viva Sorte`,
            description: `Compra de ${quantity} títulos da loteria Viva Sorte - Sorteio de R$ 1.000.000`,
            price: totalPrice,
            quantity: 1,
            is_physical: false
          }
        ],
        ip: clientIP,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formatPhone(formData.phone),
          document_type: 'CPF' as const,
          document: formatCPF(formData.cpf)
        }
      };

      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar transação');
      }

      const result: SunizeTransaction = await response.json();
      
      if (result.hasError) {
        throw new Error('Erro na criação da transação');
      }

      setTransactionData(result);
      setPixCode(result.pix.payload);

      // Gerar QR Code
      const qrCodeDataUrl = await QRCode.toDataURL(result.pix.payload, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeUrl(qrCodeDataUrl);
      setStep('payment');
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      alert('Código PIX copiado para a área de transferência!');
    } catch (error) {
      console.error('Erro ao copiar código PIX:', error);
      alert('Erro ao copiar código PIX');
    }
  };

  const handleClose = () => {
    setStep('form');
    setTransactionData(null);
    setQrCodeUrl('');
    setPixCode('');
    setFormData({ name: '', email: '', phone: '', cpf: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {step === 'form' ? 'Finalizar Compra' : 'Pagamento PIX'}
          </h2>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <>
            {/* Resumo da compra */}
            <div className="p-4 bg-blue-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Quantidade de títulos:</span>
                <span className="font-bold text-blue-600">{quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Valor total:</span>
                <span className="font-bold text-green-600 text-lg">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefone/WhatsApp (11) 99999-9999"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="cpf"
                  placeholder="CPF (apenas números)"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <QrCode className="w-5 h-5" />
                  )}
                  {loading ? 'GERANDO PIX...' : 'GERAR PIX'}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Ao finalizar a compra, você concorda com nossos termos e condições
              </p>
            </form>
          </>
        ) : (
          /* Tela de Pagamento PIX */
          <div className="p-4">
            {/* Resumo */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="text-center">
                <p className="text-gray-700 mb-2">Valor a pagar:</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center mb-4">
              <p className="text-gray-700 mb-3">Escaneie o QR Code com seu banco:</p>
              {qrCodeUrl && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code PIX" 
                    className="border-2 border-gray-200 rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* PIX Copia e Cola */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2 text-center">Ou copie o código PIX:</p>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-xs text-gray-600 break-all mb-2">{pixCode}</p>
                <button
                  onClick={copyPixCode}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  COPIAR CÓDIGO PIX
                </button>
              </div>
            </div>

            {/* Instruções */}
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-yellow-800 mb-2">Instruções:</h3>
              <ol className="text-sm text-yellow-700 space-y-1">
                <li>1. Abra o app do seu banco</li>
                <li>2. Escolha a opção PIX</li>
                <li>3. Escaneie o QR Code ou cole o código</li>
                <li>4. Confirme o pagamento</li>
                <li>5. Aguarde a confirmação por email</li>
              </ol>
            </div>

            {/* Status */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Status: <span className="font-bold text-orange-600">Aguardando Pagamento</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Você receberá um email de confirmação após o pagamento
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}