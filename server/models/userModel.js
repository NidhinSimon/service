import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    blocked:{
        type:Boolean,
        default:false
    },
    address:{
        type:Array,  
    },
    longitude:{
        type:Number,
    },
    latitude:{
        type:Number,
    }
  

    
},{
    timestamps:true
})

const User=mongoose.model('Users',userSchema
)
export default User