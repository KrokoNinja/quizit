"use client"
import { Course, Question } from "@prisma/client"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useEffect, useState } from "react"

type QuestionFormProps = {
  courses: Course[]
  course?: Course
  question?: Question
  setCourse: (course: Course) => void
}

const QuestionForm = ({setCourse, courses, course, question}: QuestionFormProps) => {

  const [questionText, setQuestionText] = useState<string>(question?.question || "")
  const [choice1, setChoice1] = useState<string>(question?.choice1 || "")
  const [choice2, setChoice2] = useState<string>(question?.choice2 || "")
  const [choice3, setChoice3] = useState<string>(question?.choice3 || "")
  const [choice4, setChoice4] = useState<string>(question?.choice4 || "")
  const [choice5, setChoice5] = useState<string>(question?.choice5 || "")
  const [choice1Correct, setChoice1Correct] = useState<boolean>(question?.choice1Correct || false);
  const [choice2Correct, setChoice2Correct] = useState<boolean>(question?.choice2Correct || false);
  const [choice3Correct, setChoice3Correct] = useState<boolean>(question?.choice3Correct || false);
  const [choice4Correct, setChoice4Correct] = useState<boolean>(question && question?.choice4Correct || false);
  const [choice5Correct, setChoice5Correct] = useState<boolean>(question && question?.choice5Correct || false);
  const [courseId, setCourseId] = useState<string>(course?.id || question?.courseId || "")

  useEffect(() => {
    question && setQuestionText(question.question)
    question && setChoice1(question.choice1)
    question && setChoice2(question.choice2)
    question && setChoice3(question.choice3)
    question && question.choice4 && setChoice4(question.choice4)
    question && question.choice5 && setChoice5(question.choice5)
    question && setCourseId(question.courseId)
    question && setChoice1Correct(question.choice1Correct)
    question && setChoice2Correct(question.choice2Correct)
    question && setChoice3Correct(question.choice3Correct)
    question && question.choice4Correct && setChoice4Correct(question.choice4Correct)
    question && question.choice5Correct && setChoice5Correct(question.choice5Correct)
  }
  , [question])

  const handleCourseChange = (e: string) => {
    const course = courses.find(course => course.id == e)
    course && setCourse(course)
    setCourseId(e)
  }

  return (
    <>
      <Label>Question</Label>
      <Input type="text" name="question" placeholder="Enter your question" required value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
      <div className="flex items-center gap-4">
        <input type="hidden" name="choice1Correct" value={`${choice1Correct}`} />
        <Input className="w-6 h-6" type="checkbox" name="choice1Correct" checked={choice1Correct} onChange={(e) => choice1 != "" && setChoice1Correct(e.target.checked)} />
        <div className="w-full">
          <Label>Choice 1</Label>
          <Input type="text" name="choice1" placeholder="Enter choice 1" required value={choice1} onChange={(e) => setChoice1(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input type="hidden" name="choice2Correct" value={`${choice2Correct}`} />
        <Input className="w-6 h-6" type="checkbox" name="choice2Correct" checked={choice2Correct} onChange={(e) => choice2 != "" && setChoice2Correct(e.target.checked)} />
        <div className="w-full">
          <Label>Choice 2</Label>
          <Input type="text" name="choice2" placeholder="Enter choice 2" required value={choice2} onChange={(e) => setChoice2(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input type="hidden" name="choice3Correct" value={`${choice3Correct}`} />
        <Input className="w-6 h-6" type="checkbox" name="choice3Correct" checked={choice3Correct} onChange={(e) => choice3 != "" && setChoice3Correct(e.target.checked)} />
        <div className="w-full">
          <Label>Choice 3</Label>
          <Input type="text" name="choice3" placeholder="Enter choice 3" required value={choice3} onChange={(e) => setChoice3(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input type="hidden" name="choice4Correct" value={`${choice4Correct}`} />
        <Input className="w-6 h-6" type="checkbox" name="choice4Correct" checked={choice4Correct} onChange={(e) => choice4 != "" && setChoice4Correct(e.target.checked)} />
        <div className="w-full">
          <Label>Choice 4</Label>
          <Input type="text" name="choice4" placeholder="Enter choice 4" value={choice4} onChange={(e) => setChoice4(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input type="hidden" name="choice5Correct" value={`${choice5Correct}`} />
        <Input className="w-6 h-6" type="checkbox" name="choice5Correct" checked={choice5Correct} onChange={(e) => choice5 != "" && setChoice5Correct(e.target.checked)} />
        <div className="w-full">
          <Label>Choice 5</Label>
          <Input type="text" name="choice5" placeholder="Enter choice 5" value={choice5} onChange={(e) => setChoice5(e.target.value)} />
        </div>
      </div>
      <Label>Course</Label>
      <Select name="course" value={courseId} onValueChange={(e) => handleCourseChange(e)} required>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a course" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {courses.map(course => (
              <SelectItem key={course.id} value={course.id}>{course.name} ({course.abbreviation})</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export default QuestionForm