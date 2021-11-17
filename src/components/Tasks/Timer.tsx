import { useContext, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { TaskContext } from "../../context/context";
import { TasksType } from "../../types";
interface TimerType {
  id: string;
  isStart: boolean;
  whenTaskStarted: number;
  taskTimeDone: string;
}

export const Timer: React.FC<TimerType> = ({
  isStart,
  whenTaskStarted = 0,
  id,
  taskTimeDone,
}) => {
  const context = useContext(TaskContext);
  const time = new Date();
  const date =
    time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
  const clock =
    time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

  let dispute: number;
  if (whenTaskStarted === 0) {
    dispute = 0;
  } else {
    dispute = (time.getTime() - whenTaskStarted) / 1000;
  }

  time.setSeconds(time.getSeconds() + dispute);
  const { seconds, minutes, hours, days, start, reset, isRunning, pause } =
    useStopwatch({
      autoStart: isStart,
      offsetTimestamp: time,
    });

  const taskStart = (id: string) => () => {
    if (!isRunning) {
      const array = [...context.tasks];
      const taskIndex = array.findIndex((task: TasksType) => task.id === id);
      if (whenTaskStarted === 0) {
        array[taskIndex] = {
          ...array[taskIndex],
          isStart: true,
          taskStarted: time.getTime(),
          startedTime: date,
        };
      } else {
        array[taskIndex] = {
          ...array[taskIndex],
          isStart: true,
        };
      }
      context.setTasks(array);
      start();
    }
  };

  const taskDone = (id: string) => () => {
    const array = [...context.tasks];
    const taskIndex = array.findIndex((task: TasksType) => task.id === id);
    array[taskIndex] = {
      ...array[taskIndex],
      isStart: false,
      taskStarted: 0,
    };
    context.setTasks(array);
    reset(undefined, false);
  };

  const taskIsDone = (id: string) => () => {
    const array = [...context.tasks];
    const taskIndex = array.findIndex((task: TasksType) => task.id === id);
    array[taskIndex] = {
      ...array[taskIndex],
      finishedTime:
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate(),
      taskDone: `${days}:${hours}:${minutes}:${seconds}`,
    };
    context.setTasks(array);
  };

  return (
    <div>
      {taskTimeDone ? null : (
        <>
          <button onClick={taskStart(id)}>Start</button>
          <button onClick={taskDone(id)}>Reset</button>
          <button onClick={taskIsDone(id)}>Done</button>
          <div
            style={{ fontSize: "30px", display: "inline", marginLeft: "1em" }}
          >
            <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
            <span>{seconds}</span>
          </div>
        </>
      )}
      {taskTimeDone ? <h2> {taskTimeDone} </h2> : null}
    </div>
  );
};
