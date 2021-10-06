import { useContext } from "react";
import { useStopwatch } from "react-timer-hook";
import { TaskContext } from "../../context/context";
import { TasksType } from "../../types";
interface TimerType {
  id: string;
  isStart: boolean;
  whenTaskStarted: number;
}

export const Timer: React.FC<TimerType> = ({
  isStart,
  whenTaskStarted = 0,
  id,
}) => {
  const context = useContext(TaskContext);
  const time = new Date();

  let x: number;
  if (whenTaskStarted === 0) {
    x = 0;
  } else {
    x = (time.getTime() - whenTaskStarted) / 1000;
  }

  time.setSeconds(time.getSeconds() + x);
  const { seconds, minutes, hours, days, start, reset, isRunning } =
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

  return (
    <div>
      <button onClick={taskStart(id)}>Start</button>
      <button onClick={taskDone(id)}>Reset</button>
      <div style={{ fontSize: "30px", display: "inline", marginLeft: "1em" }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
    </div>
  );
};
