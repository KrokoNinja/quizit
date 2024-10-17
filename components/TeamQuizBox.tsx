'use client';

import React, { useEffect, useState } from 'react';
import QuizBox from './QuizBox';
import { useRouter } from 'next/navigation';

interface TeamQuizBoxProps {
  teamId: string;
}

const TeamQuizBox = ({teamId} : TeamQuizBoxProps) => {
  const [course, setCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter(); // Router object should not cause issues if directly in effect

  useEffect(() => {
    setIsClient(true);
    const savedCourse = localStorage.getItem('course');
    if (savedCourse) {
      setCourse(savedCourse);
      setLoading(false);
    }
  }, []);

  if (!course) {
    return <p>Loading...</p>;
  }

  return <QuizBox courseId={course} isTeamQuiz={true} team={teamId} />;
};

export default TeamQuizBox;
