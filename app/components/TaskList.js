'use client';
import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";



export default function TaskList() {
    const { tasks, deleteTask, toggleComplete, reorderTasks, clearTasks, clearCompleted, markAllCompleted } = useTaskStore();
    const [draggedIndex, setDraggedIndex] = useState(null); //Index of the task being dragged
    const [dragOverIndex, setDragOverIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index); // Set the index of the task being dragged
    }

    const handleDragEnter = (index) => {
        if (draggedIndex === null || draggedIndex === index) return; // If no task is being dragged or it's the same index, do nothing
        reorderTasks(draggedIndex, index); // Reorder tasks based on drag and drop
        setDraggedIndex(index); // Update the dragged index to the new position
        setDragOverIndex(index); // Set the index of the task being dragged over
    }

    const handleDragEnd = () => {
        setDraggedIndex(null); // Reset the dragged index when dragging ends
    }

    if (!tasks) return null;
    return (
        <div className="p-2">
            <ul className="space-y-2">
                {tasks.map((task, index) => {
                    if (!task) return null;
                    return (
                        <li className={`flex justify-between items-center border p-2 rounded mb-2 bg-white shadow cursor-move transition-all duration-150
            ${draggedIndex === index ? "opacity-80 scale-105" : ""}
            ${dragOverIndex === index && draggedIndex !== index ? "translate-y-1" : ""}
          `}
                            key={task.id}
                            draggable
                            onDragStart={() => handleDragStart(index)} //capture index of the task being dragged
                            onDragEnter={() => handleDragEnter(index)} // to get index of if it is being dragged over another task
                            onDragEnd={handleDragEnd} // to reset the dragged index
                        >
                            <button className="cursor-pointer text-4xl" onClick={() => toggleComplete(task.id)}>✔</button>
                            <span className={`flex-1 ${task.isCompleted ? 'line-through text-red-500' : 'text-blue-700'}`}>{task.text}</span>
                            <button className="cursor-pointer text-4xl" onClick={() => deleteTask(task.id)}>🗑</button>
                        </li>
                    );
                })}
            </ul>
            {tasks.length > 0 && (
            <div className="flex mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 mr-4 rounded" onClick={markAllCompleted}>Mark all as completed</button>
                <button className="bg-blue-500 text-white px-4 py-2 mr-4 rounded" onClick={clearCompleted}>Clear completed</button>
                <button className="bg-blue-500 text-white px-4 py-2 mr-4 rounded" onClick={clearTasks}>Clear All</button>
            </div>
            )}
        </div>
    );
}