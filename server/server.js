import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import cors from 'cors';
import cloudinary from 'cloudinary';
import serviceRoute from './routes/providerRoute.js';
import cookieParser from 'cookie-parser';
import { Server } from "socket.io";
import Stripe from 'stripe';
import getRawBody from 'raw-body';
import Booking from './models/BookingModel.js';
import Service from './models/serviceModel.js';
import category from './models/CategoryModel.js';
import Provider from './models/providerModel.js';
import geolib from 'geolib'
import Request from './models/RequestModel.js';
import { acceptBooking } from './controller/providerController.js';
import { init } from './controller/providerController.js';


const port = process.env.PORT;

dotenv.config();

connectDB();


const app = express();

const server = app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

io.on("connection", (socket) => {

  socket.join(`provider_${socket.id}`);

  socket.on('test-message', (data) => {
    console.log('Received test message from client:', data);
    socket.emit('test-message-response', 'Message received on the server');

  });
  socket.on('join-provider-room', (providerId) => {
    socket.join(`provider_${providerId}`);
  });

  socket.emit('test','message ddddddddddddddddddddrrrrrrrrrrrrrsent to the user sideeeeeeeeeeeeeeeeeeeeee')


  socket.on('disconnect', () => {
  });
});



init(io)

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);

// app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "500mb" }));


app.use(cors());


app.use(cookieParser());

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))


cloudinary.v2.config({
  cloud_name: "dj8z6xx94",
  api_key: '215584545747347',
  api_secret: "3FPTZutia3Qu1cxCVRT7YcuJaBw",
  max_file_size: 50000000
});

app.use('/users', userRoutes);
app.use('/admin', adminRoute);
app.use(serviceRoute);





app.post('/checkout', async (req, res) => {
  console.log('inside checkout route');



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
        total: total
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
});


const endpointSecret = "whsec_895129302214904687488a5d9440622b6146a5307d8735ad6c4327ebbaf7b34f";

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {

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
});



let session


const createOrder = async (customer, data, io, res, session) => {
  if (customer && customer.metadata && customer.metadata.cart) {
    try {
      const items = JSON.parse(customer.metadata.cart);

      const newOrder = new Booking({
        bookingId: data._id,
        userId: customer.metadata.userId,
        paymentId: data.payment_intent,
        services: items,
        Total: customer.metadata.total,
        payment_status: data.payment_status,
        address: customer.metadata.address,
        date: customer.metadata.date,
        latitude: customer.metadata.latitude,
        longitude: customer.metadata.longitude,
      });

      newOrder.status = 'pending';
      const newBooking = await newOrder.save();
      console.log(newBooking, '.....')
      const serviceId = items[0].serviceId;

      const service = await Service.findById(serviceId);

      const category = service.category;

      const providersInCategory = await Provider.find({ category });

      const userLocation = {
        latitude: customer.metadata.latitude,
        longitude: customer.metadata.longitude,
      };

      const providersWithDistances = providersInCategory.map((provider) => {
        const providerLocation = {
          latitude: provider.latitude,
          longitude: provider.longitude,
        };
        const distance = geolib.getDistance(userLocation, providerLocation);
        console.log(distance, "-------------------------------------------------------------------------------------------------------------------");
        return { ...provider._doc, distance };
      });

      providersWithDistances.sort((a, b) => a.distance - b.distance);

      const maxDistance = 300000; //30km

      const nearbyProviders = providersWithDistances.filter(
        (provider) => provider.distance <= maxDistance
      );

      console.log(newBooking, "Booking created");

      nearbyProviders.forEach((provider) => {
        io.to(`provider_${provider._id}`).emit('new-booking-for-provider', { booking: newBooking });
      });

      console.log('Booking notifications sent to nearby providers');
    } catch (error) {
      console.log(error.message, "An error occurred in create order");
    }
  } else {
    console.log('Error: customer.metadata.cart is undefined or null');
  }
};









// const sendNotification = async (newBooking, items,io,customer) => {

//   try {

//     const serviceId = items[0].serviceId;


//     const service = await Service.findById(serviceId);

//     const category = service.category;

//     const providersInCategory = await Provider.find({ category });


//     const userLocation = {
//       latitude: customer.metadata.latitude,
//       longitude: customer.metadata.longitude,
//     };


//     const providersWithDistances = providersInCategory.map((provider) => {
//       const providerLocation = {
//         latitude: provider.latitude,
//         longitude: provider.longitude,
//       };
//       const distance = geolib.getDistance(userLocation, providerLocation);
//       console.log(distance, "-------------------------------------------------------------------------------------------------------------------");
//       return { ...provider._doc, distance };
//     });


//     providersWithDistances.sort((a, b) => a.distance - b.distance);


//     const maxDistance = 300000; //30km

//     const nearbyProviders = providersWithDistances.filter(
//       (provider) => provider.distance <= maxDistance
//     );

//     console.log(newBooking, "Booking created");

//     nearbyProviders.forEach((provider) => {

//       io.to(`provider_${provider._id}`).emit('new-booking-for-provider', { booking: newBooking });
//     });

//     console.log('Booking notifications sent to nearby providers');

//   } catch (error) {
//     console.log(error.message, "error in the sendNotification")
//   }


// }









app.use('/', (req, res) => {
  res.json({ message: 'server ready' });
});



