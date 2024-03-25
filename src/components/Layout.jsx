import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Layout() {
    const {user, token} = useStateContext();
    if (!user || !token) return <Navigate to="/login" />;
    return (
        <div>
            <h1>Layout</h1>
            <p>Welcome to the layout!</p>
            <Outlet />
        </div>
    );
}