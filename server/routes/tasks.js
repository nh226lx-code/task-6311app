const router = require("express").Router()
const Task = require("../models/Task")

router.get("/", async (req,res)=>{

try{

const tasks = await Task.find()

res.json(tasks)

}catch(err){

res.status(500).json(err)

}

})

router.post("/", async (req,res)=>{

try{

const newTask = new Task({

title:req.body.title,
userId:"demo"

})

const savedTask = await newTask.save()

res.json(savedTask)

}catch(err){

res.status(500).json(err)

}

})

router.delete("/:id", async (req,res)=>{

try{

await Task.findByIdAndDelete(req.params.id)

res.json("deleted")

}catch(err){

res.status(500).json(err)

}

})

module.exports = router