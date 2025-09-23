@@ .. @@
 import { NextRequest, NextResponse } from 'next/server';
-import { SunizeCreateTransactionRequest, SunizeTransaction } from '@/types/lottery';
+import { SunizeCreateTransactionRequest, SunizeTransaction } from '@/src/types/lottery';

 export async function POST(request: NextRequest) {