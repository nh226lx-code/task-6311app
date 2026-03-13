import {useState} from "react"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./Dashboard"
import Reset from "./pages/Reset"

import "./App.css"

function App(){

const [page,setPage]=useState("login")

if(page==="login"){
return <Login setPage={setPage}/>
}

if(page==="register"){
return <Register setPage={setPage}/>
}

if(page==="reset"){
return <Reset setPage={setPage}/>
}

if(page==="home"){
return <Dashboard/>
}

}

export default App