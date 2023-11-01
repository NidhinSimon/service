import Stripe from 'stripe';
import Booking from '../models/BookingModel.js';
import Provider from '../models/providerModel.js';
import Service from '../models/serviceModel.js';

import geolib from 'geolib'
import { acceptBooking } from './providerController.js';
import cron from 'node-cron'
import User from '../models/userModel.js';




const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);


let session
let io



export const hai = (i) => {
    io = i
}


const createOrder = async (customer, data, io, res, session) => {
    if (customer && customer.metadata && customer.metadata.cart) {
        try {
            const items = JSON.parse(customer.metadata.cart);

            const serviceNames = items.map(item => item.name);

            console.log(serviceNames, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~+==============================================~~~")
            const newOrder = new Booking({
                bookingId: data._id,
                userId: customer.metadata.userId,
                paymentId: data.payment_intent,
                services: items,
                serviceName: serviceNames,
                userName: customer.metadata.name,
                Total: customer.metadata.total,
                payment_status: data.payment_status,
                address: customer.metadata.address,
                date: customer.metadata.date,
                latitude: customer.metadata.latitude,
                longitude: customer.metadata.longitude,
            });

            newOrder.status = 'pending';
            const newBooking = await newOrder.save();
            console.log(newBooking, '.....---------------------------------------------------------------------')
            const serviceId = items[0].serviceId;
            console.log(serviceId, '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
            const service = await Service.findById(serviceId);

            const category = service.category;

            const providersInCategory = await Provider.find({ category });

            console.log(providersInCategory, "+++++++++++++++++++++++++++++++++++++++++++++++")
            const userLocation = {
                latitude: customer.metadata.latitude,
                longitude: customer.metadata.longitude,
            };
            console.log(userLocation, ">>>>>")

            const providersWithDistances = providersInCategory.map((provider) => {
                const providerLocation = {
                    latitude: provider.latitude,
                    longitude: provider.longitude,
                };
                console.log(providerLocation, '{}{{}{}{}{}{}{}{')
                const distance = geolib.getDistance(userLocation, providerLocation);
                console.log(distance, "-----------------------------------------------------distance--------------------------------------------------------------");
                return { ...provider._doc, distance };
            });

            providersWithDistances.sort((a, b) => a.distance - b.distance);

            const maxDistance = 300000; //30km

            const nearbyProviders = providersWithDistances.filter(
                (provider) => provider.distance <= maxDistance
            );

            console.log(nearbyProviders, ">>>>>>>>>>>>>>>..")

            console.log(newBooking, "Booking created");

            nearbyProviders.forEach((provider) => {
                console.log("ISNIDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", `${provider._id}`);
                io.to(`provider_${provider._id}`).emit('new-booking-for-provider', { booking: newBooking });
            });
            cron.schedule('*/10 * * * *', async () => {
                const currentTime = Date.now();
                const timeThreshold = 10 * 60 * 1000;

                const unacceptedBookings = await Booking.find({
                    status: 'pending',
                    createdAt: { $lt: new Date(currentTime - timeThreshold) },
                });

                for (const booking of unacceptedBookings) {
                    const refund = booking.Total
                    console.log(refund, '>>>>>>')


                    console.log("inside cron")
                    booking.status = 'canceled'
                    const canceledBooking = await booking.save();
                    await updateUserwallet(booking.userId, refund)
                    console.log(canceledBooking, '>>>>>>>>>>>>>>>>>>>>>>')
                    io.emit('cancel-booking', { bookingId: canceledBooking._id });

                }
            })

            console.log('Booking notifications sent to nearby providers');
        } catch (error) {
            console.log(error.message, "An error occurred in create order");
        }
    } else {
        console.log('Error: customer.metadata.cart is undefined or null');
    }
};

const updateUserwallet = async (userId, refund) => {
    console.log('ssusususususuysuysuysuysuysuysuys')
    try {
        const user = await User.findById(userId)
        user.Wallet += refund

        await user.save()
        console.log(`User ${user._id}'s wallet balance updated: $${user.Wallet}`);

    } catch (error) {
        console.log(error.message)
    }
}





export const checkoutController = async (req, res) => {
    console.log('inside checkout route');

    console.log(req.body, "______------->>>>>>>>>")
    const total = req.body.total

    if (isNaN(total)) {
        return res.status(400).json({ error: 'Invalid total amount' });
    }

    try {
        const customer = await stripe.customers.create({
            metadata: {
                userId: req.body.userId,
                cart: JSON.stringify(req.body.cart),
                date: req.body.date,
                address: req.body.address,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                total: total,
                name: req.body.name
            },
        });



        session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer: customer.id,
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'Total Amount',
                        },
                        unit_amount: total * 100,
                    },
                    quantity: 1,
                },
            ],
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'An error occurred......' });
    }
}


const endpointSecret = process.env.ENDPOINTSECRET

export const webhook = async (req, res) => {

    const sig = req.headers['stripe-signature'];

    try {

        const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

        const data = event.data.object;
        const eventType = event.type;

        if (eventType === 'checkout.session.completed') {
            stripe.customers.retrieve(data.customer).then((customer) => {

                createOrder(customer, data, io, res)
            }).catch((err) => {
                console.log(err.message, "______________-");
            });
        }

        res.send().end();
    } catch (err) {
        console.log('Webhook Error:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
}