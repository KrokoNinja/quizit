'use client';
import type { Course } from '@prisma/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button, buttonVariants } from './ui/button';
import CourseForm from './CourseForm';
import { getSession } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CourseDialogProps {
  triggerText: string;
  title: string;
  description: string;
  course?: Course;
}

const CourseDialog = ({
  triggerText,
  title,
  description,
  course,
}: CourseDialogProps) => {
  const [user, setUser] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      if (!session.userId) {
        return notFound();
      }
      setUser(session.userId);
    };
    checkSession();
  });

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger className={buttonVariants()}>{triggerText}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <CourseForm course={course} user={user} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
