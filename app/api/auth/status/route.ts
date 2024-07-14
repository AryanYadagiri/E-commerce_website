import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function GET() {
  const session = await getSession();
  console.log(session)
  return NextResponse.json({ isAuthenticated: !!session });
}
