const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const authRoute = require("./routes/auth")
const tasksRoute = require("./routes/tasks")

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL || "mongodb+srv://nh226lx_db_user:vSR3fCEIrPV86yoi@cluster0.ck7v3dn.mongodb.net/task6311")
  .then(() => {
    console.log("MongoDB connected")
  })
  .catch((err) => {
    console.log("MongoDB error:", err)
  })

app.get("/", (req, res) => {
  res.send("Server working")
})

app.use("/api/auth", authRoute)
app.use("/api/tasks", tasksRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})