import { useEffect, useState } from "react";
import { api } from "../api";

function TaskPage({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await api("/tasks", { token });
    setTasks(data);
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = await api("/tasks", {
      method: "POST",
      token,
      body: { title }
    });

    setTasks([newTask, ...tasks]);
    setTitle("");
  }

  async function toggle(task) {
    const updated = await api(`/tasks/${task._id}`, {
      method: "PUT",
      token,
      body: { completed: !task.completed }
    });

    setTasks(tasks.map(t =>
      t._id === task._id ? updated : t
    ));
  }

  async function remove(id) {
    await api(`/tasks/${id}`, {
      method: "DELETE",
      token
    });

    setTasks(tasks.filter(t => t._id !== id));
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.dashboard}>
        <div style={styles.header}>
          <h2>任务管理系统</h2>
          <button onClick={onLogout} style={styles.logout}>
            退出
          </button>
        </div>

        <form onSubmit={addTask} style={styles.form}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入新任务..."
            style={styles.input}
          />
          <button type="submit" style={styles.addBtn}>
            添加
          </button>
        </form>

        <div style={styles.taskList}>
          {tasks.length === 0 && (
            <p style={{ color: "#888" }}>暂无任务</p>
          )}

          {tasks.map(t => (
            <div key={t._id} style={styles.taskItem}>
              <span
                onClick={() => toggle(t)}
                style={{
                  ...styles.taskText,
                  textDecoration: t.completed ? "line-through" : "none"
                }}
              >
                {t.title}
              </span>
              <button
                onClick={() => remove(t._id)}
                style={styles.deleteBtn}
              >
                删除
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    paddingTop: "60px"
  },
  dashboard: {
    width: "600px",
    backgroundColor: "#fff",
    borderRadius: "14px",
    padding: "30px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logout: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  form: {
    display: "flex",
    marginTop: "20px"
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },
  addBtn: {
    marginLeft: "10px",
    padding: "12px 18px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  taskList: {
    marginTop: "25px"
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    borderBottom: "1px solid #eee"
  },
  taskText: {
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default TaskPage;