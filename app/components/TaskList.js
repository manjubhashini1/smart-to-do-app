'use client';
import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";



export default function TaskList() {
    const { tasks, deleteTask, toggleComplete, reorderTasks, clearTasks, clearCompleted, markAllCompleted, editTask } = useTaskStore();
    const [draggedIndex, setDraggedIndex] = useState(null); //Index of the task being dragged
    const [dragOverIndex, setDragOverIndex] = useState(null);
    //for editing
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

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

    const startEditing = (task) => {
        setEditingId(task.id); // Set the ID of the task being edited
        setEditText(task.text); // Set the text of the task being edited
    }

    const saveEdit = (taskId) => {
        if (editText.trim() !== "") {
            editTask(taskId, editText.trim());
            setEditingId(null);       // Exit editing mode
            setEditText(""); // Clear the input state
        }
        else {
            cancelEditing(); // If the edit text is empty, cancel editing
        }
    }

    const cancelEditing = () => {
        setEditingId(null);
        setEditText("");
    };

    if (!tasks) return null;
    return (
        <div className="tasklist-container">
            <ul className="space-y-2 max-h-[600px] md:max-h-[800px] overflow-y-auto">
                {tasks.map((task, index) => {
                    if (!task) return null;
                    const isEditing = editingId === task.id;
                    return (
                        <li className={`flex justify-between items-center border text-sm lg:text-lg p-2 rounded mb-2 bg-white shadow cursor-move transition-all duration-150
            ${draggedIndex === index ? "opacity-80 scale-105" : ""}
            ${dragOverIndex === index && draggedIndex !== index ? "translate-y-1" : ""}
          `}
                            key={task.id}
                            draggable
                            onDragStart={() => handleDragStart(index)} //capture index of the task being dragged
                            onDragEnter={() => handleDragEnter(index)} // to get index of if it is being dragged over another task
                            onDragEnd={handleDragEnd} // to reset the dragged index
                        >
                            <button className="cursor-pointer text-4xl" onClick={() => toggleComplete(task.id)}>{task.isCompleted
                                ? <div className="relative mr-3"><span className="text-3xl">☐</span><span className="absolute top-0 left-0 text-green-500">✔</span></div>
                                : <div className="relative mr-3"><span className="text-3xl">☐</span></div>}</button>
                            {isEditing
                                ? (<input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onBlur={() => saveEdit(task.id)}
                                    onKeyDown={(e) => e.key === 'Enter' ? saveEdit(task.id) : e.key === 'Escape' ? cancelEditing() : null}
                                    autoFocus
                                    className={`flex-1 bg-transparent border-none p-0 focus:outline-none ${task.isCompleted ? 'line-through' : ''}`}
                                />
                                ) : (<span
                                    className={`flex-1 ${task.isCompleted ? 'line-through' : 'text-black'} cursor-text select-text`}
                                    onClick={() => startEditing(task)}
                                    title="Double click to edit task"
                                >
                                    {task.text}</span>)}

                            <button className="cursor-pointer text-4xl text-red-500" onClick={() => deleteTask(task.id)}>🗑</button>
                        </li>
                    );
                })}
            </ul>
            {tasks.length > 0 && (
                <div className="flex mt-4 gap-x-2">
                    <button className="bg-blue-500 text-white text-sm lg:text-lg px-3 py-2 rounded" onClick={markAllCompleted}>Mark Completed</button>
                    <button className="bg-blue-500 text-white text-sm lg:text-lg px-3 py-2 rounded" onClick={clearCompleted}>Clear Completed</button>
                    <button className="bg-blue-500 text-white text-sm lg:text-lg px-3 py-2 rounded" onClick={clearTasks}>Clear All</button>
                </div>
            )}
        </div>
    );
}