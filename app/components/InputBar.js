'use client';
import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";


export default function InputBar() {
    // setting local input state for when the user types the task in the input bar
    const [input, setInput] = useState("");
    // now we are going to extract addTask from store
    const addTask = useTaskStore((state) => state.addTask);

    const handleInput = (e) => {
        e.preventDefault(); // prevent page refresh on hitting submit
        // check if input is not empty before adding task
        if (input.trim()) {
            addTask(input);
            setInput(""); // clear input after adding task
        }
    }

    return (
        //creating form to handle enter and button click
        <div className="flex justify-between items-center mb-5 text-sm lg:text-lg">
            <form className="w-full" onSubmit={handleInput}>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        value={input}
                        placeholder="Add new task"
                        onChange={(e) => setInput(e.target.value)}
                        className="w-[80%] lg:w-[90%]"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}