require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const expresslayouts = require('express-ejs-layouts')


mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true , useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=> console.log('Connected to Database'))

app.use(express.json())
app.set("view engine", 'ejs')
app.set ('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expresslayouts)


const usersRouter = require('./routes/users')
app.use('/users', usersRouter)
const indexRouter = require('./routes/index')
app.use('/',indexRouter)
app.listen(4000,()=>{
    console.log("server has started")
})