import QuizBox from "@/components/QuizBox"
import SinglePageWrapper from "@/components/SinglePageWrapper"
import prisma from "@/lib/db"
import { notFound } from "next/navigation"

const page = async ({ params } : {params: {id: string}}) => {

  const questions = await prisma.question.findMany({
    where: {
      courseId: params.id,
      published: true
    }
  });

  if (questions.length === 0) {
    return notFound();
  }

  return (
    <SinglePageWrapper>
      <h1>Quiz</h1>
      <div>
        <QuizBox courseId={params.id} />
      </div>
    </SinglePageWrapper>
  )
}

export default page