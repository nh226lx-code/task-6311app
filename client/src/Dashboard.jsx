import { useState, useEffect } from "react"
import axios from "axios"
import TaskItem from "./components/TaskItem"
import "./dashboard.css"

const API = "http://localhost:5000"

function Dashboard() {

  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState("")

  const loadTasks = async () => {

    const res = await axios.get(`${API}/api/tasks`)
    setTasks(res.data)

  }

  useEffect(() => {

    loadTasks()

  }, [])

  const addTask = async () => {

    if (!taskText.trim()) return

    await axios.post(`${API}/api/tasks`, {
      title: taskText
    })

    setTaskText("")
    loadTasks()

  }

  const deleteTask = async (id) => {

    await axios.delete(`${API}/api/tasks/${id}`)
    loadTasks()

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