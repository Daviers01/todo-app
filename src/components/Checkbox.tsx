import { Todo } from "../App";
import { cn } from "../utils";

interface Props {
  todo: Todo;
  onChange: (id: number) => void;
}

export default function Checkbox({ todo, onChange }: Props) {
  const { id, task, isCompleted } = todo;

  const toggleCheck = () => {
    onChange(todo.id);
  };

  return (
    <div>
      <div className="flex flex-row items-center w-full" onChange={toggleCheck}>
        <input
          id={`checkbox-${id}`}
          type="checkbox"
          defaultChecked={isCompleted}
          value={String(isCompleted)}
          className="w-4 h-4 accent-pink-600 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className={cn("ml-4 text-xl", isCompleted && "line-through")}
        >
          {task}
        </label>
      </div>
    </div>
  );
}
