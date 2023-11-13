import { createContext, useContext, useState } from "react";
import todos from "./todos.json";

export interface TodoItem {
  id: string;
  task: string;
  isCompleted: boolean;
  isFavorite: boolean;
}

interface TodoContextProps {
  allTodos: TodoItem[];
  currentTodo: TodoItem | undefined;
  setAllTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  toggleFavorite: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  todoAction: string | null;
  isLoading: boolean;
  setTodoAction: React.Dispatch<React.SetStateAction<string | null>>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allTodos, setAllTodos] = useState<TodoItem[]>(todos);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todoAction, setTodoAction] = useState<string | null>(null);
  const [currentTodo, setCurrentTodo] = useState<TodoItem>();

  const toggleComplete = (id: string) => {
    setAllTodos((prevAllTodos) =>
      prevAllTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const toggleFavorite = (id: string) => {
    setAllTodos((prevAllTodos) =>
      prevAllTodos.map((todo) =>
        todo.id === id ? { ...todo, isFavorite: !todo.isFavorite } : todo
      )
    );
  };

  const editTodo = (id: string) => {
    setIsLoading(true);
    const currentTodo = allTodos.find((todo) => todo.id === id);
    setTodoAction("edit");
    setCurrentTodo(currentTodo);

    setIsLoading(false);
  };

  const deleteTodo = (id: string) => {
    setIsLoading(true);
    setAllTodos((prevAllTodos) =>
      prevAllTodos.filter((todo) => todo.id !== id)
    );
    setIsLoading(false);
  };

  return (
    <TodoContext.Provider
      value={{
        isLoading,
        allTodos,
        setAllTodos,
        toggleFavorite,
        toggleComplete,
        currentTodo,
        editTodo,
        deleteTodo,
        todoAction,
        setTodoAction,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoContextProvider");
  }
  return context;
};
