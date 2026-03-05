import { useState } from "react";

function AuthForm({ mode, onSubmit, onSwitch, message }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.logo}>Task Manager</h1>
        <h2 style={styles.title}>{isLogin ? "欢迎登录" : "创建账号"}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ email, password });
          }}
        >
          <input
            type="email"
            placeholder="邮箱地址"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.primaryBtn}>
            {isLogin ? "登录" : "注册"}
          </button>
        </form>

        <button onClick={onSwitch} style={styles.switchBtn}>
          {isLogin ? "还没有账号？去注册" : "已有账号？去登录"}
        </button>

        {message && <p style={styles.error}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#667eea,#764ba2)"
  },
  card: {
    width: "380px",
    padding: "40px",
    borderRadius: "14px",
    backgroundColor: "#fff",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  logo: {
    marginBottom: "10px",
    color: "#4f46e5"
  },
  title: {
    marginBottom: "25px",
    fontWeight: "500"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px"
  },
  primaryBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: "10px"
  },
  switchBtn: {
    background: "none",
    border: "none",
    color: "#4f46e5",
    cursor: "pointer",
    fontSize: "14px"
  },
  error: {
    marginTop: "15px",
    color: "red",
    fontSize: "14px"
  }
};

export default AuthForm;