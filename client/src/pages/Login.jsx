import { useState } from "react"
import axios from "axios"

const API = "https://task6311-api.onrender.com"

function Login({ setPage }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const login = async () => {
    if (!email || !password) {
      setMessage("✖ 请输入邮箱和密码")
      setMessageType("message-error")
      return
    }

    try {
      await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      })

      setPage("home")
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        "邮箱或密码错误"

      setMessage(
        backendMessage.startsWith("✖")
          ? backendMessage
          : `✖ ${backendMessage}`
      )
      setMessageType("message-error")
    }
  }

  return (
    <div className="card">
      <div className="title">用户登录</div>

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

      <button onClick={login}>登录</button>

      {message && (
        <div className={`form-message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="login-links">
        <span className="link-text" onClick={() => setPage("register")}>
          注册账号
        </span>

        <span className="link-divider">|</span>

        <span className="link-text" onClick={() => setPage("reset")}>
          忘记密码
        </span>
      </div>
    </div>
  )
}

export default Login