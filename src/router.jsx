import { createBrowserRouter } from "react-router-dom";
import Register from "./views/Register.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/about",
        element: <div>
            <h1>About</h1>
            <p>Welcome to the about page!</p>
        </div>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/:catchAll",
        element: <NotFound />
    }
]);

export default Router;