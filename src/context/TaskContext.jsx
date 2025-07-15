import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:6001/tasks")
        .then((response) => response.json())
        .then(setTasks);
    }, []);

    function toggleComplete(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const toggledTask = updatedTasks.find((task) => task.id === id);
    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: toggledTask.completed }),
    });
    }

    function addTask(title) {
    const newTask = {
      title,
      completed: false,
    };
    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        const task = { ...data, title: data.title || title };
        setTasks((previous) => [...previous, task]);
      });
  }

    const value = {tasks, toggleComplete, addTask}

    return (<TaskContext.Provider value={value}>{children}</TaskContext.Provider>);
}
