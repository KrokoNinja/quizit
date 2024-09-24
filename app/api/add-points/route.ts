"use server";
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/actions';

// API route to update the user's points
export async function POST(request: Request) {
  const session = await getSession();

  // Check if the session is valid
  if (!session || !session.isLoggedIn) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Parse the request body to get the points
  const body = await request.json();
  const { points } = body;

  if (typeof points !== 'number') {
    return NextResponse.json({ error: 'Invalid points data' }, { status: 400 });
  }

  // Update the user's points in the database
  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        points: {
          increment: points, // Use 'increment' to add to the current points
        },
      },
    });

    // Respond with the updated user data
    return NextResponse.json({ message: 'Points updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating points:', error);
    return NextResponse.json({ error: 'Error updating points' }, { status: 500 });
  }
}