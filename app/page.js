import InputBar from "./components/InputBar";
import TaskList from "./components/TaskList";


export default function Page() {
  return (
    <main className="flex items-center justify-center flex-col min-h-screen p-4">
      <div className="w-full md:w-1/2">
        <InputBar />
        <TaskList />
      </div>
    </main>
  );
}
