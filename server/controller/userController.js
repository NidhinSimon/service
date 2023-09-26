import { json } from "express";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToke.js";
import Service from "../models/serviceModel.js";
import Category from '../models/CategoryModel.js'

const registerUser = async (req, res) => {

  const { name, email, mobile } = req.body
  const userExists = await User.findOne({ mobile })
  if (userExists) {

    res.json({ message: 'User already exists' });

  } else {
    const user = await User.create({
      name,
      email,
      mobile
    })
    if (user) {
      const token = generateToken(res, user._id)
      console.log("inside if")
      res.status(200).json({
        user,
        token
      })
      console.log(token, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    } else {
      console.log("something went wrong")
    }
  }
}


const checkNumber = async (req, res) => {
  const { mobile } = req.body

  const user = await User.findOne({ mobile })
  if (user) {
    res.json({ message: "user exists" })
  } else {
    res.json({ message: "user not registered" })
  }
}



const loginUser = async (req, res) => {
  try {
    const { number } = req.body;


    const userExists = await User.findOne({ mobile: number });

    if (userExists) {
      const token = generateToken(res, userExists._id)
      console.log("User exists:", userExists);
      res.json({
        message: "User login successful",
     userExists,
        token
      });
    } else {
      console.log("User not registered");
      res.json({ message: "not found" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getServices = async (req, res) => {
  console.log(req.params.id)
  const { id } = req.params
  const filteredServices = await Service.find({ category: id });

  res.json(filteredServices);
}


const getCategory = async (req, res) => {
  console.log(req.params.id)
  const { id } = req.params

  const categoryname = await Category.findById(id)
  res.json(categoryname)
}


const saveaddress = async (req, res) => {
  const { address, userid, latitude, longitude } = req.body;
  console.log(req.body, "??????????????????????????????????????");

  try {
    const user = await User.findById(userid);
    
    if (!user) {
      return res.json({ message: "No user exists" });
    }

    user.address.addToSet({
      address,
      latitude,
      longitude,
    });

    await user.save();

    return res.json({ message: "User address saved" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const logoutUser=async(req,res)=>{
  res.cookie('usertoken',"",{
    httpOnly:true,
    expires:new Date(0)
  })
  res.status(200).json({message:"LOGOUT USER"})
}




export {
  registerUser,
  loginUser,
  checkNumber,
  getServices,
  getCategory,
  saveaddress,
  logoutUser

}