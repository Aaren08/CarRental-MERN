import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/ContexedApp.js";
import "./Login.css";
const Login = () => {
  const { axios, setShowLogin, setToken, setUser, navigate } = useAppContext();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = useCallback(
    async (e) => {
      try {
        e.preventDefault();

        const { data } = await axios.post(`/api/user/${state}`, {
          name,
          email,
          password,
        });
        if (data.success) {
          navigate("/");
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setShowLogin(false);
          setUser(data.user);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log("Error response:", error.response);
        toast.error(error.response.data.message);
      }
    },
    [
      state,
      name,
      email,
      password,
      navigate,
      setUser,
      setShowLogin,
      setToken,
      axios,
    ]
  );

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
