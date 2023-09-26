import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import cors from 'cors'
import cloudinary from 'cloudinary'
import serviceRoute from './routes/providerRoute.js'
import cookieParser from 'cookie-parser'
import { Server } from "socket.io";

dotenv.config()

connectDB()

const port =process.env.PORT


const app=express()

app.use(express.json({limit:'500mb'}))
app.use(express.urlencoded({extended:true,limit:"500mb"}))
app.use(cors())
app.use(cookieParser())

cloudinary.v2.config({
    cloud_name:"dj8z6xx94",
    api_key:'215584545747347',
    api_secret: "3FPTZutia3Qu1cxCVRT7YcuJaBw",
    max_file_size: 50000000 
  });

app.use('/users',userRoutes)
app.use('/admin',adminRoute)
app.use(serviceRoute)

app.use('/',(req,res)=>{
    res.send('server ready')
})




const server= app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})


const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
    }
})


io.on("connection", (socket) => {
    console.log('connec to socket io')
  });

  io.on("connection", (socket) => {
    socket.emit("hello", "77777777777777777777777");
  });
