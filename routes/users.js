const express = require('express')
const user = require('../models/users')
const router = express.Router()
const User = require('../models/users')
// Getting all
router.get('/', async (req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
// Getting one
router.get('/:id',getUser,  (req,res)=>{
   res.json(res.user)

})
//Creating one
router.post('/', async(req,res)=>{
    const user= new User({
        name: req.body.name,
        lastname:req.body.lastname
    })
    try{
     const newUser = await user.save()
     //status 201 successfully created 200 is only success
     res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
// Updating one
router.patch('/:id',getUser, async(req,res)=>{
    if(req.body.name !=null){
        res.user.name = req.body.name
    }
    if(req.body.lastname !=null){
        res.user.lastname = req.body.lastname
    }
    try {
        const updateduser = await res.user.save()
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})
// Deleting one
router.delete('/:id',getUser,async (req,res)=>{
    try {
        await res.user.remove()
        res.json({message:"deleted User"})
    } catch (err) {
        res.status(500).json({message:err.message})
        
    }
})

async function getUser(req,res,next){
    let user
    try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message:'Cannot find user'})
        }
    }catch (err){
        return res.status(500).json({message: err.message})
    }
    res.user= user
    next()
}

module.exports = router