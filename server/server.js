const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const authRoute = require("./routes/auth")
const tasksRoute = require("./routes/tasks")

const app = express()

app.use(cors())
app.use(express.json())

// 使用 Vercel / Render 环境变量
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://nh226lx_db_user:Mydb123456@cluster0.ck7v3dn.mongodb.net/task6311?retryWrites=true&w=majority"

app.get("/", (req, res) => {
  res.send("API running")
})

app.use("/api/auth", authRoute)
app.use("/api/tasks", tasksRoute)

const PORT = process.env.PORT || 5000

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected")

    app.listen(PORT, () => {
      console.log("Server running on port " + PORT)
    })
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err)
    process.exit(1)
  })