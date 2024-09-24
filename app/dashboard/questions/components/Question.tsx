import { getSession } from "@/lib/actions";
import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import type { Question } from "@prisma/client";
import Link from "next/link";

type QuestionProps = {
  question: Question,
  className?: string
};

const Question = async ({question, className, ...props}: QuestionProps) => {

  const course = await prisma.course.findFirst({
    where: {
      id: question.courseId
    }
  })
  const session = await getSession();

  if(!course) {
    return null;
  }

  const isTutor = await prisma.user.findFirst({
    where: {
      id: session.userId,
      tutorOfCourse: {
        some: {
          id: course.id
        }
      }
    }
  })

  return (
    <Link {...props} href={`/dashboard/questions/${question.id}`} className={cn("", className)}>
      <div className="bg-primary text-primary-foreground p-6 rounded-md h-full flex flex-col justify-between">
        <div>
          <h2>{question.question}</h2>
          <p>{course.name}</p>
          {session.isAdmin || isTutor &&
            <div>
              <p>{question.choice1}</p>
              <p>{question.choice2}</p>
              <p>{question.choice3}</p>
              {question.choice4 && <p>{question.choice4}</p>}
              {question.choice5 && <p>{question.choice5}</p>}
            </div>
          }
        </div>
        <p>{question.createdAt.toDateString()}</p>
      </div>
    </Link>
  )
}

export default Question