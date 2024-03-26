import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom/dist";
import { useStateContext } from "../contexts/ContextProvider";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  useEffect(() => {
    getTasks();
  }, []);

  const onDeleteClick = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    axiosClient
      .delete(`/tasks/${task.id}`)
      .then((response) => {
        console.log(response.data);
        setNotification("Task deleted successfully");
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

    const updateStatus = (task, ev) => {
        axiosClient.put(`/tasks/${task.id}/status`, {status: ev.target.value})
        .then(response => {
            ev.target.value = response.data.task.status
            console.log(response.data)
        }).catch(error => {
            console.log(error.response.data)
        })
    }


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
                    <select value={task.status} onChange={
                        (ev) => {updateStatus(task, ev)}
                    
                    }>
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
