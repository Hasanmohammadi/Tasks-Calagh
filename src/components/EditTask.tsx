import { useFormik } from "formik";
import { useContext } from "react";
import { TasksType } from "../types";
import style from "./tasks.module.css";
import { TaskContext } from "./../context/context";
interface EditTaskType {
  initialValues: TasksType;
  setEdit: any;
}

export const EditTask: React.FC<EditTaskType> = ({
  initialValues,
  setEdit,
}) => {
  const context = useContext(TaskContext);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: TasksType) => {
      const array = [...context.tasks];
      const taskIndex = array.findIndex((task) => task.id === initialValues.id);
      array[taskIndex] = values;
      context.setTasks(array);
      setEdit(false);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          className={style.input}
        />
        <label htmlFor="project">Project</label>
        <input
          id="project"
          name="project"
          type="project"
          onChange={formik.handleChange}
          value={formik.values.project}
          className={style.input}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          className={style.input}
        />
        <label htmlFor="startedTime">Started time</label>
        <input
          id="startedTime"
          name="startedTime"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.startedTime}
          className={style.input}
        />
        <label htmlFor="finishedTime">Finished time</label>
        <input
          id="finishedTime"
          name="finishedTime"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.finishedTime}
          className={style.input}
        />

        <button type="submit" className={style.btn}>
          Done
        </button>
      </form>
    </>
  );
};
