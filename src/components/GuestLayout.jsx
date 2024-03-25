import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const {token} = useStateContext();
    if (token) return <Navigate to="/dashboard" />;
    return (
        <div>
            <h1>Guest Layout</h1>
            <p>Welcome to the guest layout!</p>
            <Outlet />
        </div>
    );
    }
