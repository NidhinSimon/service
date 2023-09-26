import express from 'express'
import { adminLogin,addservice, allservice, editservice ,allusers, deleteservices,blockUser,unBlockUser} from '../controller/adminController.js'
import {addcategory,deleteCategory,editcategory,getcategories,} from '../controller/categoryController.js'

const adminRoute=express.Router()

adminRoute.post('/adminlogin',adminLogin)
adminRoute.post('/add',addcategory)
adminRoute.get('/categories',getcategories)
adminRoute.post('/addservice',addservice)
adminRoute.put('/editcategory/:id',editcategory)
adminRoute.get('/services',allservice)
adminRoute.put('/editservice/:id',editservice)
adminRoute.get('/users',allusers)
adminRoute.delete('/services/:id',deleteservices)
adminRoute.delete('/category/:id',deleteCategory)
adminRoute.put('/userblock/:id',blockUser)
adminRoute.put('/userunblock/:id',unBlockUser)




export default adminRoute




