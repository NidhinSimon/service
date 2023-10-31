import category from "../models/CategoryModel.js"
import admin from "../models/adminModel.js"
import Service from "../models/serviceModel.js"
import User from '../models/userModel.js'
import cloudinary from 'cloudinary'
import { generateAdminToken } from "../utils/generateToke.js"
import Report from "../models/ReportModel.js"
const adminLogin = async (req, res) => {

    const { email, password } = req.body


    const adminy = await admin.findOne({ email })

    if (adminy && password === adminy.password) {
        const adminToken = await generateAdminToken(res, adminy._id)
        res.status(200).json({
            message: "success",
            _id: adminy._id,
            email: adminy.email,
            adminToken

        })
        console.log(adminToken, "?")
    }

    else {
        {
            res.json({ message: "wrong credentials" })
        }
    }
}

const addservice = async (req, res) => {
    console.log("ivde ethii")
    const { title, price, description, image, category } = req.body
    console.log(price, "===========================================")
    if (image) {
        const upload = await cloudinary.v2.uploader.upload(image)
        const imageUrl = upload.url
        console.log(imageUrl)
        const service = new Service({
            title, description, image: imageUrl, price, category
        })
        const saved = await service.save()
        console.log(saved)
        res.status(201).json({ message: 'Category added successfully' });
    }
}



const allservice = async (req, res) => {
    console.log("hello service")
    try {
        const services = await Service.find()
        res.json(services)
    } catch (error) {
        console.log(error.message)
    }


}

const editservice = async (req, res) => {

    try {

        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log(req.param.id, "666666666666666666666")
        console.log(updatedService, "------------------------------")
        res.json(updatedService)
    } catch (error) {
        console.log(error.message)
    }
}

const allusers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error.message)
    }
}

const deleteservices = async (req, res) => {
    try {
        const { id } = req.params

        const delte = await Service.findByIdAndDelete(id)

        if (!delte) {
            res.status(400).json({ message: "service not found" })
        }
        res.status(200).json({ message: "service deleted Successfully" })
    } catch (error) {
        console.log(error.message)
    }
}


const blockUser = async (req, res) => {
    console.log("hello block user")

    try {
        const user = await User.findByIdAndUpdate(req.params.id)
        if (!user) {
            res.status(401).json({ message: "user does not exist" })
        }
        user.blocked = true
        const b = await user.save()
        console.log(b, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..")
        res.json({ message: "user blocked successfully" })
    }
    catch (error) {
        console.log(error.message)
    }
}


const unBlockUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id)
        if (!user) {
            res.json({ message: "user not found" })
        }
        user.blocked = false
        const c = await user.save()
        console.log(c, "....")
        res.json({ message: "user unblocked successfully" })

    } catch (error) {
        console.log(error.message)
    }
}


const getReports=async(req,res)=>{
    try {
        const reports=await Report.find()
        .populate('reporterId','name')
        .populate('providerId','name')

        res.json(reports)
    } catch (error) {
        console.log(error.message)
    }
}


export {
    adminLogin,
    addservice,
    allservice,
    editservice,
    allusers,
    deleteservices,
    blockUser,
    unBlockUser,
    getReports
}