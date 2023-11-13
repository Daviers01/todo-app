import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Todo from "./Todo";
import { capitalizeFirstLetter, cn } from "./utils";
import { FaRegCheckSquare, FaRegListAlt, FaStar } from "react-icons/fa";

const sidebarFilters = [
  {
    label: "all",
    icon: <FaRegListAlt />,
  },
  {
    label: "pending",
    icon: <FaRegCheckSquare />,
  },
  {
    label: "completed",
    icon: <FaRegCheckSquare />,
  },
  {
    label: "favorites",
    icon: <FaStar />,
  },
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filters = queryParams.get("filters");

  useEffect(() => {
    console.log("param:", filters);
  }, [filters]);

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
    <div className="w-screen flex flex-col md:flex-row">
      <div className="relative flex flex-col bg-white text-gray-700 h-full md:h-screen w-full md:w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal text-3xl font-black leading-snug text-gray-900">
            MyTodo
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
                  "flex flex-row items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 hover:text-blue-900 outline-none",
                  filters === filter.label ? "bg-blue-200" : "bg-white"
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
          <div className="mb-5 hidden md:flex">
            <p className="text-3xl font-semibold">Welcome back!</p>
          </div>

          <button className="w-full flex bg-transparent hover:bg-neutral-800 text-neutral-800 hover:text-white text-left items-center py-2 px-10 mb-2 shadow-md border-2 border-neutral-800 rounded-xl transition-all">
            <span className="text-2xl">+</span>{" "}
            <span className="ml-3 font-bold">Add New Todo</span>
          </button>
          <Todo />
        </div>

        <div className="w-full xl:w-[40rem] p-10 bg-neutral-50">
          <div className="flex flex-col">
            <div className="font-bold text-xl">Add New Todo</div>
            <div>
              <div className="flex flex-col"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
