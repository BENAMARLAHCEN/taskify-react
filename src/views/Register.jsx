import { useRef, useState } from "react";
import { Link } from "react-router-dom/dist";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  function onSubmit(event) {
    event.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/register", payload)
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
          <h1 className="title">Signup for Free</h1>
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
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input type="password" placeholder="Repeat Password" />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
