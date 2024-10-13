'use client';

import React, { useEffect, useState } from 'react';
import QuizBox from './QuizBox';
import { useRouter } from 'next/navigation';

const TeamQuizBox = () => {
  const [course, setCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); // Router object should not cause issues if directly in effect

  useEffect(() => {
    // Ensures the code runs only on the client side
    if (typeof window !== 'undefined') {
      const storedCourse = localStorage.getItem('course');

      if (storedCourse) {
        setCourse(storedCourse); // Course found, set the course
      } else {
        setCourse(null); // No course found, set to null
      }
      setLoading(false); // Done loading after localStorage access
    }
  }, []); // Empty array ensures it only runs once on mount

  useEffect(() => {
    // Redirect to 404 only if not loading and course is null
    if (!loading && course === null) {
      router.push('/404');
    }
  }, [loading, course, router]); // Ensure dependency size and order is always the same

  // Show loading spinner/text while checking localStorage
  if (loading) {
    return <p>Loading...</p>;
  }

  // Once the course is available, render the QuizBox
  if (course) {
    return <QuizBox courseId={course} isTeamQuiz={true} />;
  }

  return null; // Default return to prevent React errors
};

export default TeamQuizBox;
