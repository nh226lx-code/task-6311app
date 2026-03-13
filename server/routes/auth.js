const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

router.get("/ping", (req, res) => {
  res.json({ message: "auth route working" })
})

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: "请填写完整信息" })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "该邮箱已注册" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    res.status(201).json({ message: "✔ 注册成功，请登录" })
  } catch (err) {
    console.log("register error:", err)

    if (err.code === 11000) {
      return res.status(400).json({ message: "该邮箱已注册" })
    }

    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "用户信息不符合要求" })
    }

    res.status(500).json({ message: "服务器错误，注册失败" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "请输入邮箱和密码" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "邮箱或密码错误" })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: "邮箱或密码错误" })
    }

    res.status(200).json({
      message: "登录成功",
      _id: user._id,
      username: user.username,
      email: user.email,
    })
  } catch (err) {
    console.log("login error:", err)
    res.status(500).json({ message: "登录失败" })
  }
})

router.post("/reset-request", async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: "请输入邮箱" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "邮箱不存在" })
    }

    const token = crypto.randomBytes(32).toString("hex")

    user.resetToken = token
    user.resetExpire = Date.now() + 3600000

    await user.save()

    res.status(200).json({
      message: "重置 Token 已生成",
      token,
    })
  } catch (err) {
    console.log("reset request error:", err)
    res.status(500).json({ message: "请求失败" })
  }
})

router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({ message: "请输入 Token 和新密码" })
    }

    const user = await User.findOne({
      resetToken: token,
      resetExpire: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: "Token 无效或已过期" })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user.resetToken = undefined
    user.resetExpire = undefined

    await user.save()

    res.status(200).json({ message: "✔ 密码重置成功，请登录" })
  } catch (err) {
    console.log("reset password error:", err)
    res.status(500).json({ message: "重置失败" })
  }
})

module.exports = router