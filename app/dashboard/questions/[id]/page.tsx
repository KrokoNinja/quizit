import { Button } from "@/components/ui/button"
import { approveQuestion, editQuestion, getSession } from "@/lib/actions";
import prisma from "@/lib/db"
import DeleteQuestionForm from "../components/DeleteQuestionForm";
import { notFound } from "next/navigation";
import EditQuestionDialog from "@/components/EditQuestionDialog";
import BackButton from "@/components/BackButton";
import QuestionDialog from "@/components/QuestionDialog";

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
    <div>
      <BackButton>Back</BackButton>
      <h1>Question #{question.id}</h1>
      <p>{question.question}</p>
      {session.isAdmin || isTutor &&
        <div>
          <p>{question.choice1}</p>
          <p>{question.choice2}</p>
          <p>{question.choice3}</p>
          {question.choice4 && <p>{question.choice4}</p>}
          {question.choice5 && <p>{question.choice5}</p>}
        </div>
      }
      <p>{question.createdAt.toDateString()}</p>
      {session.isAdmin || isTutor && !question.published ? (
        <div className="flex gap-x-4">
          <form action={approveQuestion}>
            <input type="hidden" name="id" value={question.id} />
            <Button type="submit">Approve</Button>
          </form>
          <DeleteQuestionForm id={question.id} buttonText="Reject" />
        </div>
      ) :
        <div>
          <p>Question is published</p>
          {
            session.isAdmin || isTutor &&
            <>
              <QuestionDialog title="Edit question" triggerText="Edit question" action={editQuestion} question={question} courses={courses} />
              <DeleteQuestionForm id={question.id} buttonText="Delete" />
            </>
          }
        </div>
      }
    </div>
  )
}

export default page