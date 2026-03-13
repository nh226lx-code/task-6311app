import { useState } from "react"
import axios from "axios"

const API="http://localhost:5000"

function Register({setPage}){

const [username,setUsername]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [message,setMessage]=useState("")
const [messageType,setMessageType]=useState("")

const register=async()=>{

if(!username || !email || !password){

setMessage("✖ 请填写完整信息")
setMessageType("message-error")

return

}

try{

await axios.post(`${API}/api/auth/register`,{

username,
email,
password

})

setMessage("✔ 注册成功，请登录")
setMessageType("message-success")

setTimeout(()=>{

setPage("login")

},1200)

}catch(err){

setMessage("✖ 该邮箱已注册")
setMessageType("message-error")

}

}

return(

<div className="card">

<div className="title">用户注册</div>

<input
placeholder="用户名"
onChange={(e)=>setUsername(e.target.value)}
/>

<input
placeholder="邮箱"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="密码"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={register}>
注册
</button>

{message && (

<div className={`form-message ${messageType}`}>
{message}
</div>

)}

<div
className="login-links"
>

<span
className="link-text"
onClick={()=>setPage("login")}
>
返回登录
</span>

</div>

</div>

)

}

export default Register