"use client"

import { getQuizQuestions } from "@/lib/actions"
import { Question } from "@prisma/client";
import { useEffect, useState } from "react"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Dialog } from "./ui/dialog";
import ReviewQuestionDialog from "./ReviewQuestionDialog";
import { useRouter } from "next/navigation";

const QuizBox = ({courseId} : {courseId: string}) => {

  const [open, setOpen] = useState<boolean>(false);
  const [points, setPoints] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState([false, false, false, false, false]);
  const [choices, setChoices] = useState<{choice: string, correct: boolean}[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // fetch quiz questions
    const fetchQuestions = async () => {
      const questions = await getQuizQuestions(courseId);
      setQuestions(questions);
    }
    fetchQuestions();
  }, [courseId]);

  useEffect(() => {
    if (questionNumber < questions.length) {
      const currentQuestion = questions[questionNumber];

      const choiceData = [
        { choice: currentQuestion.choice1, correct: currentQuestion.choice1Correct },
        { choice: currentQuestion.choice2, correct: currentQuestion.choice2Correct },
        { choice: currentQuestion.choice3, correct: currentQuestion.choice3Correct },
      ];

      if (currentQuestion.choice4) {
        choiceData.push({ choice: currentQuestion.choice4, correct: currentQuestion.choice4Correct! });
      }
      if (currentQuestion.choice5) {
        choiceData.push({ choice: currentQuestion.choice5, correct: currentQuestion.choice5Correct! });
      }

      const shuffledChoices = choiceData.sort(() => Math.random() - 0.5);

      setChoices(shuffledChoices);
    }
  }, [questionNumber, questions]);

  const checkAnswer = () => {

    let isAnswerCorrect = true;

    for (let i = 0; i < choices.length; i++) {
      if (choices[i].correct !== selected[i]) {
        isAnswerCorrect = false;
        break;
      }
    }

    if (isAnswerCorrect) {
      setPoints(points + 1);
    }
    setIsCorrect(isAnswerCorrect);
    setOpen(true);
  };

  const handleSelect = (index: number) => {
    const updatedSelected = selected.map((value, i) =>
      i === index ? !value : value
    );
    setSelected(updatedSelected);
  };

  const nextQuestion = () => {
    setQuestionNumber(questionNumber + 1);
    setSelected([false, false, false, false, false]);
    setIsCorrect(false);
    setOpen(false);
    console.log(`Questionnumber: ${questionNumber}, Questions length: ${questions.length}`);
    if (questionNumber >= questions.length - 1) {
      updatePoints(points);
    }
  };

  const updatePoints = async (points: number) => {
    const response = await fetch('/api/add-points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error(data.error);
      // Handle error here, show error message to the user
    } else {
      const data = await response.json();
      console.log('Points updated successfully', data);
      // Proceed with the redirection here after points are updated
      router.push(`/dashboard/courses/${courseId}/quiz/review`);
    }
  };

  return (
    <div>
      <p>Points: {points}</p>
      {questions.length > 0 ? questionNumber < questions.length ?
        <div className="w-full flex items-center flex-col">
          <h2 className="text-xl mb-4">{questions[questionNumber].question}</h2>
          <div className="flex gap-6 mb-6 flex-col md:flex-row">
            {choices.map((choice, index) => (
              <div key={index}>
                <Input className="hidden" type="checkbox" id={`choice-${index}`} name="choice" value={choice.choice} onChange={() => handleSelect(index)} />
                <Label className={cn("bg-primary text-secondary p-6 rounded border-2 border-primary block", selected[index] === true && "border-red-500")} htmlFor={`choice-${index}`}>{choice.choice}</Label>
              </div>
            ))}
          </div>
          <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <ReviewQuestionDialog question={questions[questionNumber]} choices={choices} nextQuestion={nextQuestion} isCorrect={isCorrect} />
          </Dialog>
          <Button onClick={() => checkAnswer()}>Check</Button>
        </div>
      :
        <div>
          <h2>Quiz Complete</h2>
          <p>You scored {points} points</p>
          <p>You will be redirected to the review page. Please wait for this to happen, so we can deliver your points.</p>
        </div>
        :
        <p>Loading...</p>
    }
    </div>
  )
}

export default QuizBox