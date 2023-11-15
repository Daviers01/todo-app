import { useLocation, useNavigate } from "react-router-dom";
import Todo from "./Todo";
import { capitalizeFirstLetter, cn } from "./utils";
import {
  FaRegCheckSquare,
  FaRegListAlt,
  FaRegWindowClose,
  FaStar,
} from "react-icons/fa";
import { useTodoContext } from "./TodoContext";
import ManageTodo from "./ManageTodo";
import { Toaster } from "react-hot-toast";

const sidebarFilters = [
  {
    label: "all",
    icon: <FaRegListAlt />,
  },
  {
    label: "favorites",
    icon: <FaStar />,
  },
  {
    label: "pending",
    icon: <FaRegCheckSquare />,
  },
  {
    label: "completed",
    icon: <FaRegCheckSquare />,
  },
];

function App() {
  const { todoAction, setTodoAction } = useTodoContext();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filters = queryParams.get("filters");

  const updateQueryParams = (newParams: Record<string, string | null>) => {
    for (const [key, value] of Object.entries(newParams)) {
      if (value === null) {
        queryParams.delete(key);
      } else {
        queryParams.set(key, value);
      }
    }

    navigate({ search: queryParams.toString() });
  };

  const handleFilter = (filter: string) => {
    updateQueryParams({ filters: filter });
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="w-screen flex flex-col md:flex-row">
        <div className="relative flex flex-col bg-white text-gray-700 h-full md:h-screen w-full md:w-[20rem] p-4 shadow-xl shadow-pink-gray-900/5">
          <div className="mb-2 p-4">
            <h5 className="block antialiased tracking-normal text-3xl font-black leading-snug text-gray-900">
              MyTasks
            </h5>
          </div>
          <nav className="flex flex-row md:flex-col gap-0 md:gap-1 w-[240px] p-2 text-base font-normal text-gray-700">
            {sidebarFilters.map((filter, id) => {
              return (
                <div
                  onClick={() => handleFilter(filter.label)}
                  key={`filter-${id}`}
                  role="button"
                  className={cn(
                    "flex flex-row items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-pink-50 hover:bg-opacity-80 focus:bg-pink-50 focus:bg-opacity-80 hover:text-pink-900 outline-none",
                    filters === filter.label ? "bg-pink-200" : "bg-white"
                  )}
                >
                  <span className="text-xs">{filter.icon}</span>{" "}
                  <span className="ml-2">
                    {capitalizeFirstLetter(filter.label)}
                  </span>
                </div>
              );
            })}
          </nav>
        </div>
        <div className="w-full flex flex-col xl:flex-row bg-white">
          <div className="w-full p-10">
            <div className="mb-5 hidden md:flex justify-between">
              <p className="text-3xl font-semibold">Welcome back!</p>
              <p className="text-xl">What's your goals today?</p>
            </div>

            <button
              onClick={() => setTodoAction("add")}
              className="w-full flex bg-transparent hover:bg-neutral-800 text-neutral-800 hover:text-white text-left items-center py-2 px-10 mb-2 shadow-md border-2 border-neutral-800 rounded-xl transition-all"
            >
              <span className="text-2xl">+</span>{" "}
              <span className="ml-3 font-bold">Add New Task</span>
            </button>
            <Todo />
          </div>

          {todoAction === "add" || todoAction === "edit" ? (
            <div className="w-full xl:w-[40rem] p-10 bg-neutral-50">
              <div
                onClick={() => setTodoAction("")}
                className="text-2xl absolute top-5 right-5 cursor-pointer"
              >
                <FaRegWindowClose />
              </div>
              <ManageTodo />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
