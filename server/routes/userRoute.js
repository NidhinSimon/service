import express from 'express'

const router=express.Router()
import {
    loginUser,
    registerUser,
    checkNumber,
    getServices,
    getCategory,
    saveaddress,
    logoutUser


} from '../controller/userController.js'


router.post('/register',registerUser)
router.post('/check',checkNumber)
router.post('/login',loginUser)


router.get('/services/:id',getServices)
router.get('/categoryname/:id',getCategory)
router.post('/saveaddress',saveaddress)
router.post('/logout',logoutUser)



export default router