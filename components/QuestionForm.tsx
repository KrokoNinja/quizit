'use client';
import { Course, Question } from '@prisma/client';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useEffect, useState } from 'react';
import QuestionFormItem from './QuestionFormItem';

type QuestionFormProps = {
  courses: Course[];
  course?: Course;
  question?: Question;
  setCourse: (course: Course) => void;
};

const QuestionForm = ({
  setCourse,
  courses,
  course,
  question,
}: QuestionFormProps) => {
  const [questionText, setQuestionText] = useState<string>(
    question?.question || '',
  );
  const [choice1, setChoice1] = useState<string>(question?.choice1 || '');
  const [choice2, setChoice2] = useState<string>(question?.choice2 || '');
  const [choice3, setChoice3] = useState<string>(question?.choice3 || '');
  const [choice4, setChoice4] = useState<string>(question?.choice4 || '');
  const [choice5, setChoice5] = useState<string>(question?.choice5 || '');
  const [choice1Correct, setChoice1Correct] = useState<boolean>(
    question?.choice1Correct || false,
  );
  const [choice2Correct, setChoice2Correct] = useState<boolean>(
    question?.choice2Correct || false,
  );
  const [choice3Correct, setChoice3Correct] = useState<boolean>(
    question?.choice3Correct || false,
  );
  const [choice4Correct, setChoice4Correct] = useState<boolean>(
    (question && question?.choice4Correct) || false,
  );
  const [choice5Correct, setChoice5Correct] = useState<boolean>(
    (question && question?.choice5Correct) || false,
  );
  const [courseId, setCourseId] = useState<string>(
    course?.id || question?.courseId || '',
  );

  useEffect(() => {
    question && setQuestionText(question.question);
    question && setChoice1(question.choice1);
    question && setChoice2(question.choice2);
    question && setChoice3(question.choice3);
    question && question.choice4 && setChoice4(question.choice4);
    question && question.choice5 && setChoice5(question.choice5);
    question && setCourseId(question.courseId);
    question && setChoice1Correct(question.choice1Correct);
    question && setChoice2Correct(question.choice2Correct);
    question && setChoice3Correct(question.choice3Correct);
    question &&
      question.choice4Correct &&
      setChoice4Correct(question.choice4Correct);
    question &&
      question.choice5Correct &&
      setChoice5Correct(question.choice5Correct);
  }, [question]);

  const handleCourseChange = (e: string) => {
    const course = courses.find((course) => course.id == e);
    course && setCourse(course);
    setCourseId(e);
  };

  return (
    <>
      <div className="mb-4">
        <Label>Question</Label>
        <Input
          type="text"
          name="question"
          placeholder="Enter your question"
          required
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>
      <QuestionFormItem
        labelText="Choice 1"
        required
        choice={choice1}
        setChoice={setChoice1}
        choiceCorrect={choice1Correct}
        setChoiceCorrect={setChoice1Correct}
      />
      <QuestionFormItem
        labelText="Choice 2"
        required
        choice={choice2}
        setChoice={setChoice2}
        choiceCorrect={choice2Correct}
        setChoiceCorrect={setChoice2Correct}
      />
      <QuestionFormItem
        labelText="Choice 3"
        required
        choice={choice3}
        setChoice={setChoice3}
        choiceCorrect={choice3Correct}
        setChoiceCorrect={setChoice3Correct}
      />
      <QuestionFormItem
        labelText="Choice 4"
        choice={choice4}
        setChoice={setChoice4}
        choiceCorrect={choice4Correct}
        setChoiceCorrect={setChoice4Correct}
      />
      <QuestionFormItem
        labelText="Choice 5"
        choice={choice5}
        setChoice={setChoice5}
        choiceCorrect={choice5Correct}
        setChoiceCorrect={setChoice5Correct}
      />
      <Label>Course</Label>
      <Select
        name="course"
        value={courseId}
        onValueChange={(e) => handleCourseChange(e)}
        required>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a course" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.name} ({course.abbreviation})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default QuestionForm;
