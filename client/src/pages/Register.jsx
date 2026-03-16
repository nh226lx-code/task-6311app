import { useState } from "react"
import axios from "axios"

const API = "https://task-6311app-server.onrender.com"

function Register({ setPage }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const register = async () => {
    if (!username || !email || !password) {
      setMessage("✖ 请填写完整信息")
      setMessageType("message-error")
      return
    }

    try {
      const res = await axios.post(`${API}/api/auth/register`, {
        username,
        email,
        password,
      })

      const successMessage = res?.data?.message || "✔ 注册成功，请登录"
      setMessage(successMessage)
      setMessageType("message-success")

      setTimeout(() => {
        setPage("login")
      }, 1200)
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        "注册失败，请稍后重试"

      setMessage(
        backendMessage.startsWith("✖")
          ? backendMessage
          : `✖ ${backendMessage}`
      )
      setMessageType("message-error")

      console.log("register error:", err?.response?.data || err.message)
    }
  }

  return (
    <div className="card">
      <div className="title">用户注册</div>

      <input
        placeholder="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>注册</button>

      {message && (
        <div className={`form-message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="login-links">
        <span className="link-text" onClick={() => setPage("login")}>
          返回登录
        </span>
      </div>
    </div>
  )
}

export default Register