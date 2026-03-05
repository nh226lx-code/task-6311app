import { useState } from "react";
import { api } from "./api";
import AuthForm from "./components/AuthForm";
import TaskPage from "./components/TaskPage";

function App() {
  const [mode, setMode] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [message, setMessage] = useState("");

  async function handleRegister({ email, password }) {
    try {
      await api("/register", {
        method: "POST",
        body: { email, password }
      });
      setMessage("注册成功，请登录");
      setMode("login");
    } catch (e) {
      setMessage(e.message);
    }
  }

  async function handleLogin({ email, password }) {
    try {
      const data = await api("/login", {
        method: "POST",
        body: { email, password }
      });
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (e) {
      setMessage(e.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken("");
  }

  if (!token) {
    return (
      <AuthForm
        mode={mode}
        onSubmit={mode === "login" ? handleLogin : handleRegister}
        onSwitch={() =>
          setMode(mode === "login" ? "register" : "login")
        }
        message={message}
      />
    );
  }

  return <TaskPage token={token} onLogout={logout} />;
}

export default App;