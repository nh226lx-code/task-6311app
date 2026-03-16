import { useState, useEffect } from "react"
import axios from "axios"
import TaskItem from "./components/TaskItem"
import "./dashboard.css"

const API = "https://task6311-api.onrender.com"

function Dashboard() {

  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState("")

  const loadTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/tasks`)
      setTasks(res.data)
    } catch (err) {
      console.log("load tasks error:", err)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const addTask = async () => {

    if (!taskText.trim()) return

    try {
      await axios.post(`${API}/api/tasks`, {
        title: taskText
      })

      setTaskText("")
      loadTasks()

    } catch (err) {
      console.log("add task error:", err)
    }

  }

  const deleteTask = async (id) => {

    try {
      await axios.delete(`${API}/api/tasks/${id}`)
      loadTasks()
    } catch (err) {
      console.log("delete task error:", err)
    }

  }

  return (

    <div className="dashboard">

      <div className="dashboard-header">
        <h2>我的任务</h2>
      </div>

      <div className="add-task">

        <input
          placeholder="请输入任务..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />

        <button onClick={addTask}>
          添加
        </button>

      </div>

      <div className="task-list">

        {tasks.map((task, index) => (

          <TaskItem
            key={task._id}
            task={task}
            index={index}
            onDelete={deleteTask}
          />

        ))}

      </div>

    </div>

  )

}

export default Dashboard