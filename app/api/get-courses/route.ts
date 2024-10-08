import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        questions: {
          some: {
            published: true,
          },
        },
      },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return new NextResponse('Failed to fetch courses', { status: 500 });
  }
}
