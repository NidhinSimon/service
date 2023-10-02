import Provider from "../models/providerModel.js";
import cloudinary from 'cloudinary'
import nodemailer from 'nodemailer';
import User from "../models/userModel.js";



const registerProvider = async (req, res) => {
    console.log("hello provider routes")
    const { profileimage, name, age, mobile, state, city, license, licenseimage, email, selectedCategory, pincode,latitude,longitude,address } = req.body
console.log(req.body,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    try {

        const userEmail = await Provider.findOne({ email })

        if (userEmail) {
            res.json({ message: "User Exist with the same email" })
        }


        const userMobile = await Provider.findOne({ mobile })

        if (userMobile) {
            res.json({ message: "User with the same mobile exist" })
        }

        const uploadimage = await cloudinary.v2.uploader.upload(licenseimage)

        if (profileimage) {

            const upload = await cloudinary.v2.uploader.upload(profileimage)

            const newProvider = new Provider({
                name,
                age,
                mobile,
                state,
                city,
                license,
                licenseimage: uploadimage.url,
                profileimage: upload.url,
                email,
                pincode,
                category: selectedCategory,
                latitude,
                longitude,
                address
            })
            const b = await newProvider.save()
            console.log(b, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            res.status(201).json({ message: "provider added successfully", newProvider })
        }

    } catch (error) {
        console.log(error.message)
    }
}


const getProviders = async (req, res) => {

    try {
        const providers = await Provider.find({ status: "pending" })
        res.json(providers)
    } catch (error) {
        console.log(error.message)
    }
}



const verifyProvider = async (req, res) => {

    try {
        const provider = await Provider.findById(req.params.id)
        if (!provider) {
            return res.status(401).json({ message: "provider not found" })
        }
        provider.status = 'verified'
        await provider.save()
        sendOtpVerify(provider.email)
        res.status(201).json({ message: "provider verified successfully" })
    } catch (error) {
        console.log(error.message)
    }
}


function sendOtpVerify(email) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "n758899@gmail.com",
            pass: "hczdjlgrlqrfpbrc",
        }
    })
    const mailOptions = {
        from: "n758899@gmail.com",
        to: email,
        subject: 'VERIFIED EMAIL',
        text: "Profile verify"
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error.message, "error")
        } else {
            console.log("email Sent" + info.response)
        }
    })
}


const rejectProvider = async (req, res) => {

    try {
        const provider = await Provider.findById(req.params.id)
        if (!provider) {
            return res.status(401).json({ message: "provider not found" })
        }
        provider.status = 'rejected'
        await provider.save()
        sendOtpVerify(provider.email)
        res.json({ message: "provider rejected" })
    } catch (error) {
        console.log(error.message)
    }
}

const loginProvider = async (req, res) => {
    const { mobile } = req.body;
  
    try {
        const provider=await User.findOne({mobile})
        if(provider)
        {
            res.json({message:"User Login Successfull"})
        }else
        {
            res.json({message:"User does not exist"})
        }
    }
    catch (error) {
        console.log(error.message)
    }
        
  };
  


const allProviders = async (req, res) => {
    const providers = await Provider.find({ status: "verified" })
    res.json(providers)
}

const providerBlock = async (req, res) => {
    console.log(req.params.id)
    try {
        const provider = await Provider.findByIdAndUpdate(req.params.id)

        if (!provider) {
            res.json({ message: "provider not found" })
        }

        provider.isBlocked = true
        const b = await provider.save()
        console.log(b, '>>>>>>>>>>>>>>>>>>>>>>>>>>>')

        res.json({ message: "provider blocked successfully" })

    } catch (error) {
        console.log(error.message)
    }


}

const unblock = async (req, res) => {
    const provider = await Provider.findByIdAndUpdate(req.params.id)

    if (!provider) {
        res.json({ message: "provider not found" })
    }

    provider.isBlocked = false
    await provider.save()

    res.json({ message: "user blocked sucessfully" })
}

const checkprovider=async(req,res)=>{
    const {mobile}=req.body

    
    try {
        const provider = await Provider.findOne({ mobile });
       
        if (provider) {
          if (provider.status === 'pending') {
            res.json({ message: 'provider verify pending', status: 'pending' });
          } else if (provider.status === 'rejected') {
            res.json({ message: 'provider verify rejected', status: 'rejected' });
          } else {
            res.json({ message: 'provider veirfy verified', status: 'verified' });
          }
        } else {
          res.json({ message: 'provider  does not exist' });
        }
      } catch (error) {
        console.log(error.message);
      }

}

export {
    registerProvider,
    getProviders,
    verifyProvider,
    rejectProvider,
    loginProvider,
    allProviders,
    providerBlock,
    unblock,
    checkprovider

}