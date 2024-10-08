import { Input } from './ui/input';
import { Label } from './ui/label';

type QuestionFormItemProps = {
  choice: string;
  setChoice: (choice: string) => void;
  choiceCorrect: boolean;
  setChoiceCorrect: (choiceCorrect: boolean) => void;
  labelText: string;
  required?: boolean;
};

const QuestionFormItem = ({
  choice,
  setChoice,
  choiceCorrect,
  setChoiceCorrect,
  labelText,
  required,
}: QuestionFormItemProps) => {
  const number = labelText.split(' ')[1];
  return (
    <div className="mb-4 flex flex-col gap-2">
      <input
        type="hidden"
        name={`choice${number}Correct`}
        value={`${choiceCorrect}`}
      />
      <Label>
        {labelText}
        {required && <sup className="text-red-500">*</sup>}
      </Label>
      <div className="flex w-full items-center gap-2">
        <Input
          className="h-6 w-6"
          type="checkbox"
          name={`choice${number}Correct`}
          checked={choiceCorrect}
          onChange={(e) => choice != '' && setChoiceCorrect(e.target.checked)}
        />
        <Input
          type="text"
          name={`choice${number}`}
          placeholder="Enter choice 2"
          required={required}
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default QuestionFormItem;
