import { createContext, useContext, useState } from "react";
import todos from "./todos.json";
import toast from "react-hot-toast";

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
    let currentState = false;
    setAllTodos((prevAllTodos) =>
      prevAllTodos.map((todo) => {
        if (todo.id === id) {
          currentState = todo.isCompleted;
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      })
    );
    toast.success(`Task marked as ${!currentState ? "completed" : "pending"}!`);
  };

  const toggleFavorite = (id: string) => {
    let currentState = false;
    setAllTodos((prevAllTodos) =>
      prevAllTodos.map((todo) => {
        if (todo.id === id) {
          currentState = todo.isFavorite;
          return { ...todo, isFavorite: !todo.isFavorite };
        }
        return todo;
      })
    );

    toast.success(`Task ${!currentState ? "added" : "removed"} to favorites`);
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
    toast.success("Task successfully deleted!");
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

// eslint-disable-next-line react-refresh/only-export-components
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoContextProvider");
  }
  return context;
};
