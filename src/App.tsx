import Todo from "./Todo";

const sidebarFilters = [
  {
    name: "All",
  },
  {
    name: "Pending",
  },
  {
    name: "Completed",
  },
];

function App() {
  return (
    <div className="w-screen flex flex-col sm:flex-row">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-screen w-full sm:w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal text-3xl font-black leading-snug text-gray-900">
            Todo App
          </h5>
        </div>
        <nav className="flex flex-col gap-1 w-[240px] p-2 text-base font-normal text-gray-700">
          {sidebarFilters.map((filter) => {
            return (
              <div
                role="button"
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                {filter.name}
              </div>
            );
          })}
        </nav>
      </div>
      <div className="w-full sm:w-[calc(100vw-50rem)] bg-white p-10">
        <div className="mb-5">
          <p className="text-3xl font-semibold">Welcome back!</p>
        </div>
        {/* <div className="flex flex-col">
          <input
            className="bg-transparent text-black border-2 border-solid my-2 h-10 rounded-lg rounded-tr-none rounded-br-none"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="-ml-1 bg-black text-white p-2 rounded-lg rounded-tl-none rounded-bl-none"
            onClick={createTodo}
          >
            Add new todo
          </button>
        </div> */}
        <button className="w-full flex bg-neutral-800 hover:bg-neutral-700 text-white text-left items-center py-3 px-10 shadow-sm border-[1px] rounded-xl">
          <span className="text-2xl">+</span>{" "}
          <span className="ml-3 font-bold">Add New Todo</span>
        </button>
        <Todo />
      </div>

      <div className="w-full sm:w-[30rem] bg-white p-10">
        <div className="flex flex-col">QWE</div>
      </div>
    </div>
  );
}

export default App;
