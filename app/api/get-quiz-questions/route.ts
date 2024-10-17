import { NextResponse } from 'next/server';
import { getQuizQuestions } from '@/lib/actions'; // Assuming this function fetches your quiz questions

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
  }

  try {
    const questions = await getQuizQuestions(courseId);
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz questions' }, { status: 500 });
  }
}
