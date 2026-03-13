import { useState } from "react"
import axios from "axios"

const API = "https://task-6311app.onrender.com"

function Reset({ setPage }) {
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const requestReset = async () => {
    if (!email) {
      setMessage("✖ 请输入邮箱")
      setMessageType("message-error")
      return
    }

    try {
      const res = await axios.post(`${API}/api/auth/reset-request`, {
        email,
      })

      console.log("Reset Token:", res.data.token)
      setMessage("✔ 重置 Token 已生成，请继续设置新密码")
      setMessageType("message-success")
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        "邮箱不存在"

      setMessage(
        backendMessage.startsWith("✖")
          ? backendMessage
          : `✖ ${backendMessage}`
      )
      setMessageType("message-error")
    }
  }

  const resetPassword = async () => {
    if (!token || !password) {
      setMessage("✖ 请输入 Token 和新密码")
      setMessageType("message-error")
      return
    }

    try {
      const res = await axios.post(`${API}/api/auth/reset-password`, {
        token,
        password,
      })

      setMessage(res?.data?.message || "✔ 密码重置成功，请登录")
      setMessageType("message-success")

      setTimeout(() => {
        setPage("login")
      }, 1200)
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Token 无效或已过期"

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
      <div className="title">密码重置</div>

      <input
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={requestReset}>获取重置 Token</button>

      <input
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <input
        type="password"
        placeholder="新密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={resetPassword}>重置密码</button>

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

export default Reset