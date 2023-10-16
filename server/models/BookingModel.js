import mongoose from "mongoose";

const booking = new mongoose.Schema({
    bookingId: {
        type: String,
    },
    userId: {
        type: String
    },
    paymentId: {
        type: String,
    },
    services: [
        {
            serviceId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service'
            },
         

        }
    ],
    date: {
        type: String
    },
    Total: {
        type: Number
    },
    address: {
        type: String
    },
    payment_status: {
        type: String
    }, 
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
      provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        default: null, // Initially, no provider is assigned
      },
      providersReceived: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Provider'
        }
    ]

}, {
    timestamps: true
})

const Booking = mongoose.model('booking', booking)
export default Booking