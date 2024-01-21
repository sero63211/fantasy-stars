import * as React from "react";
import { createTheme } from "@mui/material/styles";
import "../../Stylings/LoginScreen.css";
import Footer from "../../Components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthentificationState";
const defaultTheme = createTheme();

export default function LoginScreen() {
  const { loggedIn, setLoggedIn } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("Sending request to backend");
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("Login successful");
        setLoggedIn(true);
        navigate("/");
      } else if (response.status === 401) {
        console.error("Unauthorized: Incorrect username or password");
        setLoginError(true);
      } else {
        console.error("An error occurred during login");
        setLoginError(true);
      }
    } catch (error) {
      console.error("Network error:", error);
      setLoginError(true);
    }
  };

  return (
    <div className="theme-provider" style={{ height: "100vh" }}>
      <div className="background"></div>

      <div className="login-container">
        <div className="login-box">
          <h1>Fantasy Stars</h1>
          {loginError && (
            <div className="error-message">
              Login failed. Incorrect username or password.
            </div>
          )}
          <h2>Log dich ein!</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                className={loginError ? "error-input" : ""}
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                className={loginError ? "error-input" : ""}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="submit-container">
              <button type="button" onClick={handleSubmit}>
                Sign In
              </button>
              <button onClick={() => navigate("/")} style={{background:"red"}}>
              Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}