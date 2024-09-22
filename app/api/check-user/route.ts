"use server";
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/actions';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const session = await getSession();

  // Check if the session is valid
  if (!session || !session.isLoggedIn) {
    console.log("Before destroy", session);
    session.destroy();
    console.log("After destroy", session);

    // Return a response indicating the session is invalid
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Check if the user exists in the database
  const user = await prisma.user.findUnique({
    where: { email: session.email },
  });

  if (!user) {
    console.log("Before destroy", session);
    session.destroy();
    console.log("After destroy", session);

    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // If the user is found, return a success response
  return NextResponse.json({ success: true, user }, { status: 200 });
}
