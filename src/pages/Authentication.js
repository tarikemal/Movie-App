import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import Auth from "./../auth.js";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const history = useHistory();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setHasError(true);
      setErrMessage("Please fill out the given areas.");
      return;
    }

    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setHasError(!res.status);

        if (!res.status) {
          setErrMessage("Something is wrong.");
        } else {
          history.push("/");
        }
      });
  };

  return (
    <section>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "2.5rem",
        }}
      >
        Signup Page
      </h2>

      <form
        onSubmit={(e) => handleSignUp(e)}
        style={{ textAlign: "center", margin: "30px" }}
      >
        <div className="signup-part">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signup-part">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
      {hasError && <div>{errMessage}</div>}
    </section>
  );
}

export function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const history = useHistory();

  const handleLogIn = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.status) {
          localStorage.setItem("userToken", res.token);
          Auth.login(() => {
            history.push("/movies");
            setHasError(false);
          });
        } else {
          setHasError(true);
        }
      });
  };

  return (
    <section>
      <div style={{ fontSize: "3rem", textAlign: "center" }}>
        Welcome to the Movie App
      </div>
      <form
        onSubmit={(e) => handleLogIn(e)}
        style={{ textAlign: "center", margin: "30px" }}
      >
        <div className="login-part">
          <label>Email</label>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-part">
          <label>Password</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-btn" type="submit">
          Log In
        </button>
      </form>
      <div style={{ textAlign: "center" }}>
        Have you not signed up yet? <a href="/signup">Click here</a>
      </div>
      {hasError && (
        <div style={{ textAlign: "center", color: "red", marginTop: "30px" }}>
          We could not log you in. Your information is wrong.
        </div>
      )}
    </section>
  );
}
