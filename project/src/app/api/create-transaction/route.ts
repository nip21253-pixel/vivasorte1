import { NextRequest, NextResponse } from 'next/server';
import { SunizeCreateTransactionRequest, SunizeTransaction } from '@/types/lottery';

export async function POST(request: NextRequest) {
  try {
    const body: SunizeCreateTransactionRequest = await request.json();

    const response = await fetch('https://api.sunize.com.br/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.SUNIZE_CLIENT_KEY!,
        'x-api-secret': process.env.SUNIZE_CLIENT_SECRET!,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Sunize API Error:', errorText);
      return NextResponse.json(
        { error: 'Erro ao criar transação na Sunize API' },
        { status: response.status }
      );
    }

    const data: SunizeTransaction = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}