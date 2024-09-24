import SinglePageWrapper from "@/components/SinglePageWrapper";
import { getSession } from "@/lib/actions";
import prisma from "@/lib/db";
import Question from "../components/Question";
import { notFound } from "next/navigation";

const page = async () => {

  const session = await getSession();

  const isUserTutor = await prisma.user.findFirst({
    where: {
      id: session.userId,
      isTutor: true
    }
  })

  if (!session.isAdmin && !isUserTutor) {
    return notFound()
  }

  let requestedQuestions;

  if (session.isAdmin) {
    requestedQuestions = await prisma.question.findMany({
      where: {
        published: false
      },
    });
  } else {
    // Fetch all unpublished questions where the user is the tutor of the course
    requestedQuestions = await prisma.question.findMany({
      where: {
        published: false, // Only unpublished questions
        course: {
          tutorId: session.userId, // The current user is the tutor of the course
        }
      },
      include: {
        course: true, // Optionally include the course details if needed
      },
    });
  }

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