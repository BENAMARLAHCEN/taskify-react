import { createBrowserRouter } from "react-router-dom";
import Register from "./views/Register.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Layout from "./components/Layout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Tasks from "./views/Tasks.jsx";
import TaskForm from "./views/TaskForm.jsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element:<GuestLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    },
    {
        path: "/",
        element:<Layout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/tasks",
                element: <Tasks />
            },
            {
                path: "/tasks/new",
                element: <TaskForm key="TaskCreate" />
            },
            {
                path: "/tasks/:id",
                element: <TaskForm key="TaskUpdate" />
            }
        ]
    },
    
    {
        path: "/:catchAll",
        element: <NotFound />
    }
]);

export default Router;