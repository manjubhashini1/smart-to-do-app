import InputBar from "./components/InputBar";
import TaskList from "./components/TaskList";


export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-100">
      <div className="w-1/2">
        <InputBar />
        <TaskList />
      </div>
    </div>
  );
}
