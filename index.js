const express = require('express')
const app = express()   
const userrouter = require('./routes/User')
require('dotenv').config()
app.use(express.json())
const connectDB = require('./db/connect')
const port = 4000
app.use('/worko/user' , userrouter)
app.get('/' , (req,res) => {
    res.send('<h1>welcome </h1>')
})
const start = async (req,res) =>{
    await connectDB(process.env.MONGO_URI)
    app.listen(port , ()=>{
        console.log(`server listening on port ${port}`)
    })
}
start()
