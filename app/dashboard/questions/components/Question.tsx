import { getSession } from "@/lib/actions";
import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import type { Question } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

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

  if(!session.userId) {
    redirect("/login");
  }

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
      <div className="bg-primary text-primary-foreground p-6 rounded-md h-full flex flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-xl font-bold mb-2">{question.question}</h2>
          <p className="text-sm text-gray-300 mb-4">{course.name}</p>

          {(session.isAdmin || isTutor) && (
            <div className="space-y-2">
              <p className="bg-primary-foreground text-primary rounded p-2">{question.choice1}</p>
              <p className="bg-primary-foreground text-primary rounded p-2">{question.choice2}</p>
              <p className="bg-primary-foreground text-primary rounded p-2">{question.choice3}</p>
              {question.choice4 && <p className="bg-primary-foreground text-primary rounded p-2">{question.choice4}</p>}
              {question.choice5 && <p className="bg-primary-foreground text-primary rounded p-2">{question.choice5}</p>}
            </div>
          )}
        </div>
        <p className="text-right text-sm text-gray-400 mt-4">{new Date(question.createdAt).toDateString()}</p>
      </div>
    </Link>
  )
}

export default Question