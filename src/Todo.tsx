import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Checkbox from "./components/Checkbox";
import { FaRegStar, FaStar, FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { capitalizeFirstLetter, cn } from "./utils";
import Tooltip from "./components/Tooltip";
import { useTodoContext } from "./TodoContext";

function Todo() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filters = queryParams.get("filters");

  const {
    isLoading,
    allTodos,
    toggleFavorite,
    toggleComplete,
    deleteTodo,
    editTodo,
  } = useTodoContext();

  const finalTodos = useMemo(
    () =>
      filters === "all" || !filters
        ? allTodos
        : allTodos
            .sort((x, y) => {
              return Number(x.isFavorite) - Number(y.isFavorite);
            })
            .filter((todo) => {
              if (filters === "pending" && !todo.isCompleted) return true;
              if (filters === "completed" && todo.isCompleted) return true;
              if (filters === "favorites" && todo.isFavorite) return true;
              return false;
            }),
    [allTodos, filters]
  );

  if (isLoading) return "Loading..";

  return (
    <div className="mt-5">
      {filters !== "all" && filters ? (
        <>
          Filters:
          <div className="ml-2 mb-5 inline-flex rounded-lg bg-white border-[1px] border-black text-sm px-2">
            {capitalizeFirstLetter(filters)}
          </div>
        </>
      ) : null}
      {finalTodos.length === 0 && (
        <div className="flex mt-2 font-bold">No data found!</div>
      )}
      {finalTodos.map((todo) => {
        return (
          <div
            className="flex flex-row justify-between py-3 px-6 shadow-sm"
            key={`todo-${todo.id}`}
          >
            <Checkbox
              onChange={() => toggleComplete(todo.id)}
              isChecked={todo.isCompleted}
              label={todo.task}
            />
            <div>
              <Tooltip message="Delete">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-red-500 text-sm"
                >
                  <FaRegTrashAlt />
                </button>
              </Tooltip>
              <Tooltip message="Edit">
                <button
                  onClick={() => editTodo(todo.id)}
                  className="p-2 text-neutral-700 text-sm"
                >
                  <FaRegEdit />
                </button>
              </Tooltip>
              <Tooltip
                message={`${
                  todo.isFavorite ? "Remove from" : "Add to"
                } favorites`}
              >
                <button
                  onClick={() => toggleFavorite(todo.id)}
                  className={cn(
                    "p-2",
                    todo.isFavorite ? "text-yellow-400" : "text-neutral-600"
                  )}
                >
                  {todo.isFavorite ? <FaStar /> : <FaRegStar />}
                </button>
              </Tooltip>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
