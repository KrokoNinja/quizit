import type { Course } from "@prisma/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import CourseForm from "./CourseForm"
import { getSession } from "@/lib/actions"
import { notFound } from "next/navigation"


interface CourseDialogProps {
  triggerText: string
  title: string
  description: string
  course?: Course
}

const CourseDialog = async ({triggerText, title, description, course} : CourseDialogProps) => {

  const session = await getSession();

  if(!session.userId) {
    return notFound();
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <CourseForm course={course} user={session.userId} />
      </DialogContent>
    </Dialog>
  )
}

export default CourseDialog