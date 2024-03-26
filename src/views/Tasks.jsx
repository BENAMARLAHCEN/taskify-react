import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom/dist";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const onDeleteClick = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    axiosClient
      .delete(`/tasks/${task.id}`)
      .then((response) => {
        console.log(response.data);
        getTasks();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getTasks = () => {
    setLoading(true);
    axiosClient
      .get("/tasks")
      .then(({ data }) => {
        setLoading(false);
        console.log(data.tasks);
        setTasks(data.tasks);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.tasks);
      });
  };

  //   const onDeleteClick = (task) => {
  //       console.log(task);
  //   }
  //     const loading = false;

  //   const tasks = [
  //     {
  //       id: 1,
  //       name: "Task 1",
  //       description: "Description 1",
  //       status: "Pending",
  //     },
  //     {
  //       id: 2,
  //       name: "Task 2",
  //       description: "Description 2",
  //       status: "Completed",
  //     },
  //     {
  //       id: 3,
  //       name: "Task 3",
  //       description: "Description 3",
  //       status: "Pending",
  //     },
  //     {
  //       id: 4,
  //       name: "Task 4",
  //       description: "Description 4",
  //       status: "Completed",
  //     },
  //     {
  //       id: 5,
  //       name: "Task 5",
  //       description: "Description 5",
  //       status: "Pending",
  //     },
  //   ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Tasks</h1>
        <Link to="/tasks/new" className="btn btn-add">
          Create Task
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            </tbody>
          )}
          <tbody>
            {!loading &&
              (tasks.length === 0 ? (
                <tr>
                  <td colSpan="3">No tasks found</td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                    <select value={task.status}>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    </td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Link
                        to={`/tasks/${task.id}`}
                        className="btn btn-edit"
                      >
                        edit
                      </Link>
                      <button
                        onClick={(ev) => onDeleteClick(task)}
                        className="btn btn-sm btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
