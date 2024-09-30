import { cn } from '@/lib/utils';
import Link from 'next/link';

type Course = {
  id: string;
  name: string;
  tutorId: string;
  abbreviation: string;
};

interface CourseProps extends React.HTMLAttributes<HTMLAnchorElement> {
  course: Course;
}

const Course = ({ course, ...props }: CourseProps) => {
  return (
    <Link
      {...props}
      href={`/dashboard/courses/${course.id}`}
      className={cn('', props.className)}>
      <div className="rounded-md bg-primary p-6 text-primary-foreground">
        <h2 className="text-lg font-bold">{course.name}</h2>
        <p>{course.abbreviation}</p>
      </div>
    </Link>
  );
};

export default Course;
