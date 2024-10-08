'use client';

import React, { useEffect, useState } from 'react';
import QuizBox from './QuizBox';
import { useRouter } from 'next/navigation';

const TeamQuizBox = () => {
  const [course, setCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (window != undefined) {
      const course = localStorage.getItem('course');
      setCourse(course);
      setLoading(false);
    }
  });

  useEffect(() => {
    if (!loading && course === null) {
      router.push('/404'); // Or any other page you'd prefer to redirect to
    }
  }, [course, loading, router]);

  if (!course) {
    return <p>Loading...</p>; // You can return a loading state while fetching from localStorage
  }

  return <QuizBox courseId={course} isTeamQuiz={true} />;
};

export default TeamQuizBox;
