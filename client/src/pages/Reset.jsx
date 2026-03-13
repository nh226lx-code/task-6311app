import { useState } from "react"
import axios from "axios"

const API="http://localhost:5000"

function Reset({setPage}){

const [email,setEmail]=useState("")
const [token,setToken]=useState("")
const [password,setPassword]=useState("")

const requestReset=async()=>{

const res=await axios.post(`${API}/api/auth/reset-request`,{
email
})

alert("重置token: "+res.data.token)

}

const resetPassword=async()=>{

await axios.post(`${API}/api/auth/reset-password`,{
token,
password
})

alert("密码已重置")

setPage("login")

}

return(

<div className="card">

<div className="title">密码重置</div>

<input
placeholder="邮箱"
onChange={(e)=>setEmail(e.target.value)}
/>

<button onClick={requestReset}>
获取重置Token
</button>

<input
placeholder="Token"
onChange={(e)=>setToken(e.target.value)}
/>

<input
type="password"
placeholder="新密码"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={resetPassword}>
重置密码
</button>

<div className="switch"
onClick={()=>setPage("login")}
>
返回登录
</div>

</div>

)

}

export default Reset