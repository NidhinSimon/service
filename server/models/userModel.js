import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profileimage: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/man-character_665280-46970.jpg?w=740'
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    blocked: {
        type: Boolean,
        default: false
    },
    address: {
        type: Array,
    },
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
    cart: [
        {
            serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
            quantity: { type: Number, required: true, default: 1 },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            _id:false
        },
    ],




}, {
    timestamps: true
})

const User = mongoose.model('Users', userSchema
)
export default User