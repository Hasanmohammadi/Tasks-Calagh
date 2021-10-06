import { useFormik } from "formik";
import { useContext } from "react";
import { TaskContext } from "../context/context";
import style from "./tasks.module.css";
import { TasksType } from "../types";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  project: yup.string().required("Project is required"),
  description: yup.string().required("Description is required"),
  startedTime: yup.string().required("Started Time is required"),
  finishedTime: yup.string().required("Finished Time is required"),
});

export const TasksInput = () => {
  const context = useContext(TaskContext);
  const formik = useFormik({
    initialValues: {
      id: "",
      isStart: false,
      title: "",
      project: "",
      description: "",
      createdTime: new Date().toLocaleDateString(),
      startedTime: "",
      finishedTime: "",
      taskStarted: 0,
    },
    validationSchema: schema,
    onSubmit: (values: TasksType) => {
      context.setTasks((pre: TasksType[]) => [
        ...pre,
        { ...values, id: uuidv4(), isStart: false },
      ]);
      formik.resetForm();
    },
  });

  return (
    <div>
      <div
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "1em",
          paddingLeft: "5em",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="title"
            className={style.input}
            {...formik.getFieldProps("title")}
          />
          <p style={{ color: "red" }}>{formik.errors.title}</p>
          <label htmlFor="project">Project</label>
          <input
            id="project"
            type="project"
            className={style.input}
            {...formik.getFieldProps("project")}
          />

          <p style={{ color: "red" }}>{formik.errors.project}</p>

          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="description"
            className={style.input}
            {...formik.getFieldProps("description")}
          />
          <p style={{ color: "red" }}>{formik.errors.description}</p>
          <label htmlFor="createdTime">Created time</label>
          <input
            id="createdTime"
            name="createdTime"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.createdTime}
            className={style.input}
            disabled
          />
          <label htmlFor="startedTime">Started time</label>
          <input
            id="startedTime"
            type="date"
            className={style.input}
            {...formik.getFieldProps("startedTime")}
          />
          <p style={{ color: "red" }}>{formik.errors.startedTime}</p>
          <label htmlFor="finishedTime">Finished time</label>
          <input
            id="finishedTime"
            type="date"
            className={style.input}
            {...formik.getFieldProps("finishedTime")}
          />
          <p style={{ color: "red" }}>{formik.errors.finishedTime}</p>

          <button type="submit" className={style.btn}>
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};
