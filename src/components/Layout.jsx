import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom/dist";
import axiosClient from "../axios-client";

export default function Layout() {
    const {user, token, setUser, setToken, notification} = useStateContext();
    if (!token) return <Navigate to="/login" />;
    const onLogout = (event) => {
        event.preventDefault();
        axiosClient.post("/logout").then(response => {
            console.log(response.data)
            setUser(null)
            setToken(null)
        }).catch(error => {
            console.log(error.response.data)
        });
    };
    return (
        <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>

          <div>
            {user.name} &nbsp; &nbsp;
            <a href="#" onClick={onLogout} className="btn-logout" >Logout</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>

      </div>
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )
        }

    </div>
    );
}