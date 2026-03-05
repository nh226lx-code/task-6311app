const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8888;

// 前端 build 文件位置
const clientPath = path.join(__dirname, "..", "client", "dist");

// 让 Express 托管前端静态文件
app.use(express.static(clientPath));

// 所有页面返回 React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});