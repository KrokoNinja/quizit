"use client"
import type { Course, User } from "@prisma/client"
import { useFormState } from "react-dom"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useState } from "react"
import { createCourse } from "@/lib/actions"
import { DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"

interface CourseFormProps {
  user: string
  course?: Course
}

const CourseForm = ({user, course}: CourseFormProps) => {

  const [name, setName] = useState(course?.name || "");
  const [abbreviation, setAbbreviation] = useState(course?.abbreviation || "");

  const [state, formAction] = useFormState<any, FormData>(createCourse, {
    name: "",
    abbreviation: "",
    tutor: ""
  })

  return (
    <>
      <form action={formAction}>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Label htmlFor="abbreviation">Abbreviation</Label>
        <Input id="abbreviation" name="abbreviation" type="text" value={abbreviation} onChange={(e) => setAbbreviation(e.target.value)} />
        <input type="hidden" name="tutor" value={user} />
        <DialogFooter>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </form>
      {state.error && <p>{state.error}</p>}
    </>
  )
}

export default CourseForm