'use client';
import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";


export default function InputBar() {
    // setting local input state for when the user types the task in the input bar
    const [input, setInput] = useState("");
    // now we are going to extract addTask from store
    const addTask = useTaskStore((state) => state.addTask);

    const handleInput = (e)=> {
        e.preventDefault(); // prevent page refresh on hitting submit
        // check if input is not empty before adding task
        if(input.trim()) {
            addTask(input);
            setInput(""); // clear input after adding task
        }
    }

    return (
        //creating form to handle enter and button click
        <div className="flex">
            <form onSubmit={handleInput}>
                <input
                    type="text"
                    value={input}
                    placeholder="Add new task"
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </form>
        </div>
    );
}