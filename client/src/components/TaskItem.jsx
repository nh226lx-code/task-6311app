function TaskItem({ task, index, onDelete }) {
  return (
    <div className="task-item">
      <div className="task-check">
        <input type="checkbox" />
      </div>

      <div className="task-index">
        {index + 1}.
      </div>

      <div className="task-text">
        {task.title}
      </div>

      <button
        className="delete"
        onClick={() => onDelete(task._id)}
      >
        删除
      </button>
    </div>
  )
}

export default TaskItem