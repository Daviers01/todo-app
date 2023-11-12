import { useState } from "react";
import todos from "./todos.json";
import Checkbox from "./components/Checkbox";

export interface Todo {
  id: string;
  task: string;
  isCompleted: boolean;
}

function Todo() {
  const [allTodos, setAllTodos] = useState<Todo[]>(todos);
  const [newTodo, setNewTodo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleTodo = (id: string) => {
    setAllTodos((prevAllTodos) =>
      prevAllTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setAllTodos((prevAllTodos) =>
      prevAllTodos.filter((todo) => todo.id !== id)
    );
  };

  const createTodo = () => {
    if (newTodo.trim() === "") return;

    const newId = crypto.randomUUID();
    const payload: Todo = {
      id: newId,
      task: newTodo,
      isCompleted: false,
    };

    setAllTodos([...allTodos, payload]);
    setNewTodo("");
  };

  if (isLoading) return "Loading..";

  return (
    <div>
      {allTodos.map((todo) => {
        return (
          <div
            className="flex flex-row justify-between py-3 px-10 shadow-sm"
            key={`todo-${todo.id}`}
          >
            <Checkbox
              onChange={() => toggleTodo(todo.id)}
              isChecked={todo.isCompleted}
              label={todo.task}
            />
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-xs p-2 bg-gray-900 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
