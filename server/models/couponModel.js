import mongoose from "mongoose";

function calculateExpiryDate() {

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30); 
    return currentDate;
  }
  
const couponSchema = mongoose.Schema({
    couponName: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiresIn: {
        type: Date,
        default:calculateExpiryDate ,
        required: true
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

const coupon=mongoose.model('coupon',couponSchema)
export default coupon

