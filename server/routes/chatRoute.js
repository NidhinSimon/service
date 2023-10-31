import express from 'express'

import { protect } from '../middleware/authMiddleware.js'


const chatRoute = express.Router()

import { createChat, userChat,findChat ,getuserData} from '../controller/chatController.js'

chatRoute.post('/chat', createChat)
chatRoute.get("/chat/:userId",userChat)
chatRoute.get('/find/:firstId/:secondId',findChat)
chatRoute.get('/get/:id',getuserData)

export default chatRoute
