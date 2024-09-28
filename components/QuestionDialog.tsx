"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import QuestionForm from "./QuestionForm"
import { Course, Question } from "@prisma/client"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import prisma from "@/lib/db"
import { getSession } from "@/lib/actions"

type EditQuestionDialogProps = {
  triggerText: string,
  title: string,
  action: (
    prevState: { error: undefined | string },
    formData: FormData
  ) => Promise<
    | { error: string; success?: undefined }
    | { success: string; error?: undefined }
    | { error: string; } | undefined
  >,
  course?: Course,
  courses: Course[]
  question?: Question
}

const QuestionDialog = ({triggerText, title, action, course, courses, question} : EditQuestionDialogProps) => {

  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [questionCourse, setQuestionCourse] = useState<Course | undefined>(course || undefined)

  const [state, formAction] = useFormState<any, FormData>(action, {
    id: question?.id || "",
    question: question?.question || "",
    choice1: question?.choice1 || "",
    choice2: question?.choice2 || "",
    choice3: question?.choice3 || "",
    choice4: question && question?.choice4 || "",
    choice5:  question && question?.choice5 || "",
    courseId: question?.courseId || course?.id || "",
    choice1Correct: question?.choice1Correct || false,
    choice2Correct: question?.choice2Correct || false,
    choice3Correct: question?.choice3Correct || false,
    choice4Correct: question?.choice4Correct || false,
    choice5Correct: question?.choice5Correct || false,
  })

  const handleSubmit = () => {
    if (state.success) {
      setOpen(false)
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction} onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
          <input type="hidden" name="id" value={question?.id || ""} />
          <QuestionForm setCourse={setQuestionCourse} course={questionCourse} courses={courses} question={question} />
        <DialogFooter>
          <Button type="submit" onClick={()=>handleSubmit()}>Save changes</Button>
        </DialogFooter>
        </form>
        {state?.error && <p>{state.error}</p>}
      </DialogContent>
    </Dialog>
  )
}

export default QuestionDialog