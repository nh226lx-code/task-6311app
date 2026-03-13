const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

// 注册

router.post("/register",async(req,res)=>{

try{

const salt = await bcrypt.genSalt(10)

const hashedPassword = await bcrypt.hash(req.body.password,salt)

const newUser = new User({

username:req.body.username,
email:req.body.email,
password:hashedPassword

})

const savedUser = await newUser.save()

res.status(200).json(savedUser)

}catch(err){

res.status(500).json(err)

}

})


// 登录

router.post("/login",async(req,res)=>{

try{

const user = await User.findOne({email:req.body.email})

if(!user) return res.status(400).json("用户不存在")

const validPassword = await bcrypt.compare(req.body.password,user.password)

if(!validPassword) return res.status(400).json("密码错误")

res.status(200).json(user)

}catch(err){

res.status(500).json(err)

}

})


// 请求重置密码

router.post("/reset-request",async(req,res)=>{

try{

const user = await User.findOne({email:req.body.email})

if(!user) return res.status(400).json("邮箱不存在")

const token = crypto.randomBytes(32).toString("hex")

user.resetToken = token

user.resetExpire = Date.now() + 3600000

await user.save()

res.status(200).json({
message:"reset token created",
token:token
})

}catch(err){

res.status(500).json(err)

}

})


// 重置密码

router.post("/reset-password",async(req,res)=>{

try{

const user = await User.findOne({

resetToken:req.body.token,
resetExpire:{ $gt: Date.now() }

})

if(!user) return res.status(400).json("token无效")

const salt = await bcrypt.genSalt(10)

user.password = await bcrypt.hash(req.body.password,salt)

user.resetToken = undefined
user.resetExpire = undefined

await user.save()

res.status(200).json("密码已更新")

}catch(err){

res.status(500).json(err)

}

})

module.exports = router