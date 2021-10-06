import { createContext, useEffect, useState } from "react";
import { TasksType } from "../types";

export const TaskContext = createContext<any>({
  task: [],
});

export const Context = ({ children }: any) => {
  const [tasks, setTasks] = useState<TasksType[]>([]);

  useEffect(() => {
    const getTask = localStorage.getItem("tasks");
    if (getTask) setTasks(JSON.parse(getTask));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
