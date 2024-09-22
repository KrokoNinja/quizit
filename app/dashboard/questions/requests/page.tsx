import SinglePageWrapper from "@/components/SinglePageWrapper";
import { getSession } from "@/lib/actions";
import prisma from "@/lib/db";
import Question from "../components/Question";

const page = async () => {

  const session = await getSession();

  if (!session.isAdmin) {
    return {notFound: true}
  }

  const requestedQuestions = await prisma.question.findMany({
    where: {
      published: false
    }
  })

  return (
    <SinglePageWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1>Requested Questions</h1>
      </div>
      {requestedQuestions.length === 0 ?
        <p>No requested questions found</p>
        :
        <ul className="flex flex-col gap-y-6">
          {requestedQuestions.map(question => (
            <Question key={question.id} question={question} />
          ))}
        </ul>
      }
    </SinglePageWrapper>
  )
}

export default page