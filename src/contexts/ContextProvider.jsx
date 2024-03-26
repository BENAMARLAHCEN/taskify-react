import { createContext, useContext, useState } from "react";


const StateContext = createContext({
    user: null,
    setUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    token: null,
    setToken: () => {},
    notification: null,
    setNotification: () => {}
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, _setToken] = useState(localStorage.getItem("token"));
    const [notification, _setNotification] = useState(null);
    const setNotification = (notification) => {
        _setNotification(notification);
        setTimeout(() => {
            _setNotification(null);
        }, 3000);
    }

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }


    return (
        <StateContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, token, setToken,notification ,setNotification }}>
            { children }
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);