'use client';
import { requestQuestion } from '@/lib/actions';
import { useFormState } from 'react-dom';
import type { Course } from '@prisma/client';
import { Button } from './ui/button';
import QuestionForm from './QuestionForm';
import { useState } from 'react';

interface CreateQuestionFormProps {
  courses: Course[];
  course?: Course;
  isAdmin: boolean | undefined;
}

const CreateQuestionForm = ({
  courses,
  course,
  isAdmin,
}: CreateQuestionFormProps) => {
  const [questionCourse, setQuestionCourse] = useState<Course | undefined>(
    course || undefined,
  );
  const [state, formAction] = useFormState<any, FormData>(requestQuestion, {
    question: '',
    answer: '',
    choice1: '',
    choice2: '',
    choice3: '',
    choice4: '',
    courseId: course?.id || '',
    choice1Correct: false,
    choice2Correct: false,
    choice3Correct: false,
    choice4Correct: false,
    choice5Correct: false,
  });

  return (
    <>
      <form action={formAction}>
        <QuestionForm
          course={questionCourse}
          courses={courses}
          setCourse={setQuestionCourse}
        />
        <Button type="submit">
          {isAdmin ? 'Create question' : 'Request question'}
        </Button>
      </form>
      {state.error && <p>{state.error}</p>}
    </>
  );
};

export default CreateQuestionForm;
