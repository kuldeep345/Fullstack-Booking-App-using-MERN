require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))

app.use('/user' , require('./routes/user'))

const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(4000, ()=>{
        console.log(`server is running at http://localhost:${PORT}`)
    })
}).catch((error) => console.log(`${error} did not connect`))

