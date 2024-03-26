import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom/dist";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setNotification } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/tasks/${id}`)
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          setTask(response.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response.data);
        });
    }, []);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      title: event.target[0].value,
      description: event.target[1].value,
      status: event.target[2].value,
    };
    if (id) {
      axiosClient
        .put(`/tasks/${id}`, payload)
        .then((response) => {
          setNotification("Task updated successfully");
          navigate("/tasks");
          console.log(response.data);
        })
        .catch((error) => {
          const response = error.response;
          setErrors(response.data.errors);
        });
    } else {
      axiosClient
        .post("/tasks", payload)
        .then((response) => {
          setNotification("Task created successfully");
          navigate("/tasks");
          console.log(response.data);
        })
        .catch((error) => {
          const response = error.response;
          console.log(response.data.errors);
          setErrors(response.data.errors);
        });
    }
  };

  return (
    <div>
      {!task.id && <h1>Create Task</h1>}

      {task.id && <h1>Edit Task</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert alert-danger">
            {Object.keys(errors).map((key) => (
              <div key={key}>
                {errors[key].map((message) => (
                  <div key={message}>{message}</div>
                ))}
              </div>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={task.title}
              onChange={(ev) => setTask({ ...task, title: ev.target.value })}
            />
            <textarea
              placeholder="Description"
              value={task.description}
              onChange={(ev) =>
                setTask({ ...task, description: ev.target.value })
              }
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
