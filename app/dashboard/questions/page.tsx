import SinglePageWrapper from "@/components/SinglePageWrapper"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"
import Question from "./components/Question"
import { getSession, requestQuestion } from "@/lib/actions"
import Link from "next/link"
import QuestionDialog from "@/components/QuestionDialog"

const Page = async () => {

  const questions = await prisma.question.findMany({
    where: {
      published: true
    }
  })
  const courses = await prisma.course.findMany();
  const session = await getSession();

  return (
    <SinglePageWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1>All Questions</h1>
        {session.isAdmin && <Link href="/dashboard/questions/requests"><Button>Show Requests</Button></Link>}
        <QuestionDialog
          title={session.isAdmin ? "Create question" : "Request question"}
          triggerText={session.isAdmin ? "Create question" : "Request question"}
          courses={courses}
          action={requestQuestion}
        />
      </div>
      {questions.length === 0 ?
        <p>No questions found</p>
        :
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {questions.map(question => (
            <Question key={question.id} question={question} />
          ))}
        </ul>
      }
    </SinglePageWrapper>
  )
}

export default Page