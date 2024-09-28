import { Button } from "@/components/ui/button"
import { approveQuestion, editQuestion, getSession } from "@/lib/actions";
import prisma from "@/lib/db"
import DeleteQuestionForm from "../components/DeleteQuestionForm";
import { notFound } from "next/navigation";
import EditQuestionDialog from "@/components/EditQuestionDialog";
import BackButton from "@/components/BackButton";
import QuestionDialog from "@/components/QuestionDialog";
import SinglePageWrapper from "@/components/SinglePageWrapper";

const page = async ({params}: {params: {id:string}}) => {

  const session = await getSession();

  const question = await prisma.question.findFirst({
    where: {
      id: params.id
    }
  })

  const courses = await prisma.course.findMany();

  if(!question) {
    return notFound();
  }

  const isTutor = await prisma.user.findFirst({
    where: {
      id: session.userId,
      tutorOfCourse: {
        some: {
          id: question.courseId
        }
      }
    }
  })

  return (
    <SinglePageWrapper>
      <BackButton>Back</BackButton>
      <h1 className="text-2xl font-bold mb-4">Question #{question.id}</h1>
      <p className="text-lg mb-6">{question.question}</p>

      {(session.isAdmin || isTutor) && (
        <div className="space-y-2 mb-6">
          <p className={`bg-gray-100 text-background p-3 rounded border-2 ${question.choice1Correct ? "border-green-500" : "border-red-500"}`}>{question.choice1}</p>
          <p className={`bg-gray-100 text-background p-3 rounded border-2 ${question.choice2Correct ? "border-green-500" : "border-red-500"}`}>{question.choice2}</p>
          <p className={`bg-gray-100 text-background p-3 rounded border-2 ${question.choice3Correct ? "border-green-500" : "border-red-500"}`}>{question.choice3}</p>
          {question.choice4 && <p className={`bg-gray-100 text-background p-3 rounded border-2 ${question.choice4Correct ? "border-green-500": "border-red-500"}`}>{question.choice4}</p>}
          {question.choice5 && <p className={`bg-gray-100 text-background p-3 rounded border-2 ${question.choice5Correct ? "border-green-500": "border-red-500"}`}>{question.choice5}</p>}
        </div>
      )}

      <p className="text-sm text-gray-400 mb-6">Created on: {new Date(question.createdAt).toDateString()}</p>

      {(session.isAdmin || isTutor) && !question.published ? (
        <div className="flex gap-x-4">
          <form action={approveQuestion}>
            <input type="hidden" name="id" value={question.id} />
            <button type="submit" className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-all">
              Approve
            </button>
          </form>
          <DeleteQuestionForm id={question.id} buttonText="Reject" />
        </div>
      ) : (
        <div>
          <p className="bg-green-500 text-white font-semibold mb-4 px-4 py-2 rounded-lg w-fit transition-all">Question is published</p>
          {(session.isAdmin || isTutor) && (
            <div className="flex gap-x-4">
              <QuestionDialog
                title="Edit question"
                triggerText="Edit question"
                action={editQuestion}
                question={question}
                courses={courses}
              />
              <DeleteQuestionForm id={question.id} buttonText="Delete" />
            </div>
          )}
        </div>
      )}
    </SinglePageWrapper>
  )
}

export default page