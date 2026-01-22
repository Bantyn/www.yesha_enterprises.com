import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db-utils';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    await db.command({ ping: 1 });
    return NextResponse.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'error', message: (error as Error).message },
      { status: 500 }
    );
  }
}
