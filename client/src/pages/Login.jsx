import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../App.css"

export default function Login() {

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [message,setMessage] = useState("")
  const [error,setError] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try{

      const res = await axios.post(
        "https://task-6311app.onrender.com/api/auth/login",
        { email,password }
      )

      localStorage.setItem("userId",res.data._id)

      navigate("/dashboard")

    }catch(err){

      setError(true)
      setMessage("✖ 邮箱或密码错误")

    }
  }

  return(

    <div className="loginPage">

      <div className="loginCard">

        <h2>用户登录</h2>

        <form onSubmit={handleLogin}>

          <input
            placeholder="邮箱"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="密码"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button>登录</button>

        </form>

        {message && (
          <p className={error ? "errorMsg" : "successMsg"}>
            {message}
          </p>
        )}

        <div className="loginLinks">

          <span onClick={()=>navigate("/register")}>
            注册账号
          </span>

          <span onClick={()=>navigate("/reset")}>
            忘记密码
          </span>

        </div>

      </div>

    </div>
  )
}