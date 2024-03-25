import { createContext, useContext, useState } from "react";


const StateContext = createContext({
    user: null,
    setUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    token: null,
    setToken: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, _setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, _setToken] = useState(localStorage.getItem("token"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }
    const setUser = (user) => {
        _setUser(user);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem("user");
            setIsAuthenticated(false);
        }
    }

    return (
        <StateContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, token, setToken }}>
            { children }
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);