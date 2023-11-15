import { useState } from "react";
import { TodoItem, useTodoContext } from "./TodoContext";
import { cn } from "./utils";
import toast from "react-hot-toast";

const ManageTodo: React.FC = () => {
  const { todoAction, currentTodo, allTodos, setTodoAction, setAllTodos } =
    useTodoContext();
  const [task, setTask] = useState(
    todoAction === "edit" && currentTodo ? currentTodo.task : ""
  );
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (task.trim() === "") {
      setError("Required!");
      return;
    }

    if (todoAction === "edit") {
      setAllTodos((prevAllTodos) => {
        return prevAllTodos.map((todo) => {
          if (currentTodo && todo.id === currentTodo.id) {
            return { ...todo, task: task };
          }
          return todo;
        });
      });
      setTodoAction("");
      setTask("");
      toast.success("Task successfully updated!");

      return;
    }

    const newId = crypto.randomUUID();
    const payload: TodoItem = {
      id: newId,
      task: task,
      isCompleted: false,
      isFavorite: false,
    };

    setAllTodos([...allTodos, payload]);
    setTodoAction("");
    setTask("");
    toast.success("Task successfully added!");
  };

  return (
    <div className="flex flex-col">
      <div className="font-bold text-xl">
        {todoAction === "add" ? "Add New Task" : "Edit Task"}
      </div>
      <div className="mt-5">
        <div className="flex flex-col">
          {error && <span className="text-red-600">{error}</span>}

          <label>Task:</label>
          <textarea
            className={cn(
              "bg-transparent border-2 border-solid mt-1 mb-4 h-32 rounded-md p-2",
              error ? "border-red-600" : "border-neutral-600"
            )}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="hover:bg-pink-700 hover:text-white p-2 rounded-sm font-bold bg-transparent text-black border-2 border-black"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageTodo;
