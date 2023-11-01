import Provider from "../models/providerModel.js";
import cloudinary from 'cloudinary'
import nodemailer from 'nodemailer';
import User from "../models/userModel.js";
import Request from "../models/RequestModel.js";
import Booking from "../models/BookingModel.js";
import Service from "../models/serviceModel.js";


let io;


const init = (hello) => {
    io = hello;
};

const registerProvider = async (req, res) => {
    console.log("hello provider routes")
    const { profileimage, name, age, mobile, state, city, license, licenseimage, email, selectedCategory, pincode, latitude, longitude, address } = req.body
    console.log(req.body, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
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
        const provider = await Provider.findOne({ mobile })
        if (provider) {
            res.json({ message: "User Login Successfull", provider })

        } else {
            res.json({ message: "User does not exist" })
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

const checkprovider = async (req, res) => {
    const { mobile } = req.body


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



const getrequest = async (req, res) => {
    try {
        console.log("booooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", req.body);
        const bookingId = req.body.bookingId.booking;
        console.log(bookingId, "***********************************************************************************************************");
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        console.log(booking, '///////////////////////////');
        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



const acceptBooking = async (req, res) => {
    console.log('LLL')
    const { id } = req.params;
    const { providerId } = req.body;

    console.log(providerId, '>>>>>>>>>', id)

    console.log("Booking ID:", id);
    console.log("Provider ID:", providerId);

    try {
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (booking.status === 'accepted') {
            return res.status(400).json({ success: false, message: 'Booking is already accepted' });
        }

        booking.status = 'accepted';
        booking.provider = providerId;
        const b = await booking.save();
        console.log(b, "::>>::>>::>>")
        const provider = await Provider.findById(providerId)



        io.emit('booking-accepted', {
            booking: b, providerInfo: {
                name: provider.name,
                age: provider.age,
                mobile: provider.mobile,

            }
        });

        res.json({ success: true, updatedBooking: booking });
    } catch (error) {
        console.error('Error accepting booking:', error);
        return res.status(500).json({ success: false, message: 'Error accepting booking' });
    }
};


const getUpcoming = async (req, res) => {
    const { id } = req.params;
    console.log(id, '>>>>')

    try {
        // Get the current date
        const currentDate = new Date();

        // Use the `find` method to retrieve upcoming bookings for the provider
        const upcoming = await Booking.find({
            provider: id, // Filter by provider ID
            date: { $gte: currentDate }, // Filter for dates on or after the current date
            status: 'accepted',
        });
        console.log(upcoming, ">>>>>>")

        res.json(upcoming);
    } catch (error) {
        console.error('Failed to retrieve upcoming bookings:', error);
        res.status(500).json({ error: 'Failed to retrieve upcoming bookings' });
    }
};

const getAllBookings = async (req, res) => {
    const { id } = req.params

    try {
        const all = await Booking.find({
            provider: id,

        })

        res.json(all)
    } catch (error) {
        console.log(error.message)
    }
}

const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the booking and update its status to 'canceled'
        const booking = await Booking.findByIdAndUpdate(id);
        booking.status = 'canceled';
        const updatedBooking = await booking.save();

        // Find the associated user and update their Wallet
        const user = booking.userId;
        const userId = await User.findById(user);
        userId.Wallet += booking.Total;
        const updatedUser = await userId.save();

        res.status(200).json({ success: true, message: 'Booking canceled successfully', updatedBooking });
    } catch (error) {
        console.error('Error canceling booking:', error);
        res.status(500).json({ success: false, message: 'Failed to cancel the booking. Please try again later.' });
    }
};


const serviceName = async (req, res) => {
    const { id } = req.params;

    try {

        const service = await Service.findById(id);

        if (!service) {

            return res.status(404).json({ error: 'Service not found' });
        }


        return res.json({ serviceName: service.name });
    } catch (error) {

        console.error('Error while fetching service:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


export {
    serviceName,
    init,
    registerProvider,
    getProviders,
    verifyProvider,
    rejectProvider,
    loginProvider,
    allProviders,
    providerBlock,
    unblock,
    checkprovider
    , getrequest,
    acceptBooking,
    getUpcoming,
    getAllBookings,
    cancelBooking
}