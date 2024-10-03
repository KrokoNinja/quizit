'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import QuestionForm from './QuestionForm';
import { Course, Question } from '@prisma/client';
import { editQuestion } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';

type EditQuestionDialogProps = {
  courses: Course[];
  question: Question;
};

const EditQuestionDialog = ({ courses, question }: EditQuestionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState<Course | undefined>(
    courses.find((c) => c.id === question.courseId),
  );

  const [state, formAction] = useFormState<any, FormData>(editQuestion, {
    id: question.id,
    question: question.question,
    choice1: question.choice1,
    choice2: question.choice2,
    choice3: question.choice3,
    choice4: question.choice4,
    choice5: question.choice5,
    courseId: question.courseId,
  });

  const handleSubmit = () => {
    if (state?.success === 'Question updated') {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Edit Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Edit question</DialogTitle>
            <DialogDescription>
              Make changes to the question here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <input type="hidden" name="id" value={question.id} />
          <QuestionForm
            courses={courses}
            question={question}
            course={course}
            setCourse={setCourse}
          />
          <DialogFooter>
            <Button type="submit" onClick={() => handleSubmit()}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
        {state?.error && <p>{state.error}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionDialog;
