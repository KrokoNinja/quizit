'use client';
import prisma from '@/lib/db';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import type { Course } from '@prisma/client';

interface CourseWithCount extends Course {
  _count: {
    questions: number;
  };
}

interface CourseSelectProps {
  setCourse: (course: string) => void;
  course: string | null;
}

const CourseSelect = ({ setCourse, course }: CourseSelectProps) => {
  const [courses, setCourses] = useState<CourseWithCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/get-courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const fetchedCourses: CourseWithCount[] = await response.json();

        // Filter courses with at least 3 questions
        const filteredCourses = fetchedCourses.filter(
          (course) => course._count.questions >= 3,
        );
        setCourses(filteredCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <Select value={course || ''} onValueChange={(value) => setCourse(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a course" />
      </SelectTrigger>
      <SelectGroup>
        <SelectContent>
          {courses.map((course: Course) => (
            <SelectItem key={course.id} value={course.id}>
              {course.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};

export default CourseSelect;
