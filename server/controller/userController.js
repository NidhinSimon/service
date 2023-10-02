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


const logoutUser = async (req, res) => {
  res.cookie('usertoken', "", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: "LOGOUT USER" })
}

const profileget = async (req, res) => {

  const user = await User.findById(req.params.id)

  res.json(user)
}


const profileEdit = async (req, res) => {
  console.log(req.params.id, "---------------------------")
  const { name, email, mobile } = req.body

  try {
    const updatedService = await User.findByIdAndUpdate(req.params.id, { $set: { name, email, mobile } }, { new: true });
    res.json(updatedService);
    console.log(updatedService, ">>>>>>>>>>>>>>>>>>>>>>>>");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }

}

const addtocart = async (req, res) => {
  try {
    const { cartData, userid } = req.body;
    console.log("Received cartData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:", cartData);
    console.log("Received userId<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<:", userid);

    // Find the user by their ID
    const user = await User.findById(userid);
    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the item already exists in the cart
    const existingCartItemIndex = user.cart.findIndex((item) => item.serviceId === cartData.serviceId);

    if (existingCartItemIndex !== -1) {
      // If the item already exists, replace it with the new one
      user.cart[existingCartItemIndex] = cartData;
    } else {
      // If the item doesn't exist, add it to the cart
      user.cart.push(cartData);
    }

    console.log("Updated user's cart:", user.cart);

    const savedCart = await user.save();
    console.log(savedCart);
    res.status(200).json({
      cart: savedCart.cart,
      message: "Cart updated successfully"
    });
  } catch (error) {
    console.error("Error updating user's cart:", error);
    res.status(500).json({ error: "An error occurred while updating the user's cart" });
  }
};



const getcart=async(req,res)=>{
const userid=req.params.id
console.log(userid,">>>>>>>>>>")
const user=await User.findById(userid).select('cart')
console.log(
user,">>>>"
)
res.json(user.cart)


}

const deletecart=async(req,res)=>{
  const userid=req.params.id
  const serviceId=req.params.serviceId
console.log(serviceId,userid)
  const user=await User.findByIdAndUpdate(userid,{$pull:{cart:{serviceId:serviceId}}},{new:true})

  res.json(user.cart);


}





export {
  registerUser,
  loginUser,
  checkNumber,
  getServices,
  getCategory,
  saveaddress,
  logoutUser,
  profileget,
  addtocart,
  profileEdit,
  getcart,
  deletecart

}