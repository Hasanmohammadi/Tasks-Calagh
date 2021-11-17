import { useContext, useState } from "react";
import { TaskContext } from "../../context/context";
import { TasksType } from "../../types";
import { EditTask } from "./EditTask";
import style from "../Style/tasks.module.css";
import { Timer } from "./Timer";
import { CountDown } from "./CountDown";

interface TaskInfoType {
  task: TasksType;
}

export const TaskInfo: React.FC<TaskInfoType> = ({ task }) => {
  const time = new Date();
  const dispute: number = time.getTime() - Date.parse(task.startedTime);
  const context = useContext(TaskContext);
  const [edit, setEdit] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<TasksType>({
    id: "",
    isStart: false,
    title: "",
    project: "",
    description: "",
    createdTime: "",
    startedTime: "",
    finishedTime: "",
    taskStarted: 0,
    taskDone: "",
  });

  const editTask = (id: string) => () => {
    const array = [...context.tasks];
    const tasks = array.find((tasks: TasksType) => tasks.id === id);
    setEdit(!edit);
    setInitialValues(tasks);
  };

  const deleteTask = (id: string) => () => {
    const array = [...context.tasks];
    const newTasks = array.filter((tasks: TasksType) => tasks.id !== id);
    context.setTasks(newTasks);
  };

  return (
    <div className={style.taskContainer} key={task.id}>
      <span className={style.close} onClick={deleteTask(task.id)}>
        X
      </span>
      <span
        style={{ float: "right", cursor: "pointer", color: "blue" }}
        onClick={editTask(task.id)}
      >
        {edit ? "Cancel" : "Edit Task"}
      </span>
      {!edit ? (
        <>
          <h2>{task.title}</h2>
          <h4>Project: {task.project}</h4>
          <p className={style.description}>{task.description}</p>
          <p>Created time: {task.createdTime}</p>
          <p>Started time: {task.startedTime}</p>
          <p>Finished time: {task.finishedTime}</p>
          {dispute >= 0 || task.startedTime === "" ? (
            <Timer
              id={task.id}
              isStart={task.isStart}
              whenTaskStarted={task.taskStarted}
              taskTimeDone={task.taskDone}
            />
          ) : (
            <CountDown />
          )}
        </>
      ) : (
        <EditTask initialValues={initialValues} setEdit={setEdit} />
      )}
    </div>
  );
};
