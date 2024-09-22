import { Button } from "@/components/ui/button"
import { requestQuestion, getSession } from "@/lib/actions";
import prisma from "@/lib/db"
import Link from "next/link"
import { notFound } from "next/navigation";
import Question from "../../questions/components/Question";
import SinglePageWrapper from "@/components/SinglePageWrapper";
import QuestionDialog from "@/components/QuestionDialog";

const page = async ({params}: {params: {id:string}}) => {

  const session = await getSession();

  const courses = await prisma.course.findMany();

  const course = await prisma.course.findFirst({
    where: {
      id: params.id
    }
  })

  const questions = await prisma.question.findMany({
    where: {
      courseId: params.id
    }
  })

  if(!course) {
    return notFound();
  }

  return (
    <SinglePageWrapper>
      <div>
        <div className="flex justify-between">
          <Link href="/dashboard/courses"><Button>Back</Button></Link>
          <Link href={`/dashboard/courses/${params.id}/quiz`}><Button>Start Quiz</Button></Link>
          <QuestionDialog
            title={session.isAdmin ? "Create question" : "Request question"}
            triggerText={session.isAdmin ? "Create question" : "Request question"}
            courses={courses}
            course={course}
            action={requestQuestion}
          />
        </div>
        <h1>Course: {course.name} ({course.abbreviation})</h1>
        {questions.length === 0
          ?
            <p>No questions found</p>
          :
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {questions.map(question => (
                <Question key={question.id} question={question} />
              ))}
            </ul>
        }
      </div>
    </SinglePageWrapper>
  )
}

export default page