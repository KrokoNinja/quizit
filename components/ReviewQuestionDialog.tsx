import { cn } from "@/lib/utils";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import type { Question } from "@prisma/client";

type ReviewQuestionProps = {
  question: Question;
  choices: {choice: string, correct: boolean}[];
  nextQuestion: () => void;
  isCorrect: boolean;
}

const ReviewQuestionDialog = ({isCorrect, question, choices, nextQuestion}: ReviewQuestionProps) => {

  return (
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>
            <p>{isCorrect ? "You are right!" : "You missed this one :("}</p>
          </DialogTitle>
          <DialogDescription>
            <p>{question.question}</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mb-4 flex-col md:flex-row">
          {choices.map((choice, index) => (
            <div key={index}>
              <Input className="hidden" type="checkbox" id={`choice-${index}`} name="choice" value={choice.choice} />
              <Label className={cn("bg-primary text-secondary p-6 rounded border-2 border-primary block", choice.correct == true ? "bg-green-500" : "bg-red-500")} htmlFor={`choice-${index}`}>{choice.choice}</Label>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={() => nextQuestion()}>Continue</Button>
        </DialogFooter>
      </DialogContent>
  )
}

export default ReviewQuestionDialog