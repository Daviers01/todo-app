export interface Todo {
  id: number | string;
  task: string;
  isCompleted: boolean;
}

function App() {
  return (
    <div className="w-screen flex flex-col sm:flex-row">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-screen w-full sm:w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal font-sans text-3xl font-black leading-snug text-gray-900">
            Todo App
          </h5>
        </div>
        <nav className="flex flex-col gap-1 w-[240px] p-2 text-base font-normal text-gray-700">
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            Pending
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            Completed
          </div>
        </nav>
      </div>
      <div className="w-full sm:w-[calc(100vw-20rem)] bg-white p-10">
        Todo app
      </div>
    </div>
  );
}

export default App;
