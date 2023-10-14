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
dotenv.config();

connectDB();

const port = process.env.PORT;



const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);
const app = express();
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

const createOrder = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cart);

  try {
    const newOrder = new Booking({
      userId: customer.metadata.userId,
      paymentId: data.payment_intent,
      services: items,
      Total: data.amount_total,
      payment_status: data.payment_status,
      address: customer.metadata.address,
      date: customer.metadata.date,
      latitude: customer.metadata.latitude,
      longitude: customer.metadata.longitude,
    });

    const newBooking = await newOrder.save();
    console.log(newBooking, "Booking saved successfully.");

    // Extract the serviceId from the booking
    const serviceId = items[0].serviceId;

    // Retrieve the associated service
    const service = await Service.findById(serviceId);

    // Extract the category information from the service
    const category = service.category;

    // Find providers in the same category
    const providersInCategory = await Provider.find({ category });

    // Define the user's location
    const userLocation = {
      latitude: customer.metadata.latitude, // Replace with user's latitude
      longitude: customer.metadata.longitude, // Replace with user's longitude
    };

    // Calculate distances and filter providers
    const providersWithDistances = providersInCategory.map(provider => {
      const providerLocation = {
        latitude: provider.latitude,
        longitude: provider.longitude,
      };
      const distance = geolib.getDistance(userLocation, providerLocation);
      console.log(distance,"-------------------------------------------------------------------------------------------------------------------")
      return { ...provider._doc, distance };
    });

    // Sort providers by distance in ascending order
    providersWithDistances.sort((a, b) => a.distance - b.distance);

    // Filter providers based on a maximum distance (e.g., 10000 meters)
    const maxDistance = 300000; // Adjust as needed
    const nearbyProviders = providersWithDistances.filter(provider => provider.distance <= maxDistance);

    console.log('Nearby Providers:', nearbyProviders);
  } catch (error) {
    console.log(error.message, "An error occurred.");
  }
};


app.post('/checkout', async (req, res) => {
  console.log('inside checkout route');

  console.log(req.body, "----------------------------req.body-----------------------------")

  const total = parseInt(req.body.total, 10);

  if (isNaN(total)) {
    res.status(400).json({ error: 'Invalid total amount' });
    return;
  }

  try {

    const customer = await stripe.customers.create({

      metadata: {

        userId: req.body.userId,
        cart: JSON.stringify(req.body.cart),
        date: req.body.date,
        address: req.body.address,
        latitude:req.body.latitude,
        longitude:req.body.longitude



      },
    });

    const session = await stripe.checkout.sessions.create({
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
    res.status(500).json({ error: 'An error occurred' });
  }
});

const endpointSecret = "whsec_895129302214904687488a5d9440622b6146a5307d8735ad6c4327ebbaf7b34f";

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, response) => {

  const sig = req.headers['stripe-signature'];
  console.log('Raw Request Body:', req.rawBody);
  try {

    const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

    const data = event.data.object;
    const eventType = event.type;

    if (eventType === 'checkout.session.completed') {
      stripe.customers.retrieve(data.customer).then((customer) => {
        console.log(customer, "-----------------------------------------------------------------------customerrrr------------------------------------------------------------------------------------------------------")
        console.log(data, "==========================================================================data=========================================================================")
        createOrder(customer, data)
      }).catch((err) => {
        console.log(err.message);
      });
    }

    response.send().end();
  } catch (err) {
    console.log('Webhook Error:', err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
});



app.use('/', (req, res) => {
  res.json({ message: 'server ready' });
});

const server = app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

io.on("connection", (socket) => {
  console.log('connect to socket.io');
});

io.on("connection", (socket) => {
  socket.emit("hello", "77777777777777777777777");
});
