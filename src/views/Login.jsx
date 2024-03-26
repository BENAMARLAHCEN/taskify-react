import { useRef, useState } from "react";
import { Link } from "react-router-dom/dist";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  function onSubmit(event) {
    event.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        console.log(response.data.token);
      })
      .catch((error) => {
        const response = error.response;
        console.log(response.data.errors);
        setErrors(response.data.errors);
      });
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <div>
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
          </div>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
