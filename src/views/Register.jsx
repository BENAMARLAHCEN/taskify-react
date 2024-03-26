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

  const validateInput = (field, e) => {
    var value = e.target.value;
    if (field === "name") {
      if (value.length < 3) {
        setErrors({ name: ["Name must be at least 3 characters"] });
      } else {
        setErrors({ name: [] });
      }
    } else if (field === "email") {
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(value)) {
            setErrors({ email: ["Invalid email address"] });
        } else {
            setErrors({ email: [] });
        }
    } else if (field === "password") {
      if (value.length < 6) {
        setErrors({ password: ["Password must be at least 6 characters"] });
      } else {
        setErrors({ password: [] });
      }
    }
  };

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
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            onKeyUp={(e) => validateInput("name", e)}
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Email Address"
            onKeyUp={(e) => validateInput("email", e)}
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            onKeyUp={(e) => validateInput("password", e)}
          />
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
