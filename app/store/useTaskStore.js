'use client';
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create(persist(
    (set) => ({
        tasks: [],
        addTask: (input) => set((state) => {
            const text = input.trim();
            if (!text) return state; // ⛔ Prevent empty tasks
            return {
                tasks: [...state.tasks, { id: Date.now(), text, isCompleted: false }],
            };
        }),
        deleteTask: (id) => set(state => ({
            tasks: state.tasks.filter(task => task.id != id)
        })),
        toggleComplete: (id) =>
            set(state => ({
                tasks: state.tasks.map(task =>
                    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
                )
            })),
        reorderTasks: (fromIndex, toIndex) => set(state => {
            const updatedTasks = [...state.tasks];
            const [movedTask] = updatedTasks.splice(fromIndex, 1); //removing one task fromIndex
            updatedTasks.splice(toIndex, 0, movedTask); //inserting it at toIndex
            return { tasks: updatedTasks };
        }),
        clearTasks: () => set({ tasks: [] }),
        clearCompleted: () => set(state => ({
            tasks: state.tasks.filter(task => !task.isCompleted)
        })),
        markAllCompleted: () => set(state => ({
            tasks: state.tasks.map(task => ({ ...task, isCompleted: true }))
        }))

    }),
    {
        name: 'task-storage', // Key used in localStorage
    }
));