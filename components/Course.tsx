import { cn } from "@/lib/utils";
import Link from "next/link";

type Course = {
  id: string;
  name: string;
  tutorId: string;
  abbreviation: string;
}

interface CourseProps extends React.HTMLAttributes<HTMLAnchorElement>{
  course: Course,
}

const Course = ({course, ...props}: CourseProps) => {
  return (
    <Link {...props} href={`/dashboard/courses/${course.id}`} className={cn("", props.className)}>
      <div className="bg-primary text-primary-foreground p-6 rounded-md">
        <h2>{course.name}</h2>
        <p>{course.abbreviation}</p>
      </div>
    </Link>
  )
}

export default Course