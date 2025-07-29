import { useState, useEffect } from "react";
import "./Login.css";
const Login = ({ setShowLogin }) => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div onClick={() => setShowLogin(false)} className="login-page">
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="form-container"
      >
        <p className="form-title">
          <span className="highlight">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="input-group">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              type="text"
              required
            />
          </div>
        )}

        <div className="input-group">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            type="email"
            required
          />
        </div>

        <div className="input-group">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("login")} className="switch-link">
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span onClick={() => setState("register")} className="switch-link">
              click here
            </span>
          </p>
        )}

        <button className="submit-btn">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
