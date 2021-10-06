import { useContext } from "react";
import { TaskContext } from "../context/context";
import { TasksType } from "../types";
import { TaskInfo } from "./TaskInfo";
import style from "./tasks.module.css";

export const Tasks = () => {
  const context = useContext(TaskContext);

  const sort = () => {
    const array = [...context.tasks];

    function compare(a: { project: number }, b: { project: number }) {
      if (a.project < b.project) {
        return -1;
      }
      if (a.project > b.project) {
        return 1;
      }
      return 0;
    }
    array.sort(compare);
    context.setTasks(array);
  };

  return (
    <>
      <button
        onClick={sort}
        className={style.btn}
        style={{ marginLeft: "45%" }}
      >
        A-Z By Project
      </button>
      <div className={style.container}>
        {context.tasks.map((task: TasksType) => {
          return <TaskInfo task={task} key={task.id} />;
        })}
      </div>
    </>
  );
};
