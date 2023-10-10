import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import cors from 'cors'
import cloudinary from 'cloudinary'
import serviceRoute from './routes/providerRoute.js'
import cookieParser from 'cookie-parser'
import { Server } from "socket.io";
import Stripe from 'stripe';





dotenv.config()

connectDB()

const port = process.env.PORT

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);
const app = express()

app.use(express.json({ limit: '500mb' }))
app.use(express.urlencoded({ extended: true, limit: "500mb" }))
app.use(cors())
app.use(cookieParser())





cloudinary.v2.config({
  cloud_name: "dj8z6xx94",
  api_key: '215584545747347',
  api_secret: "3FPTZutia3Qu1cxCVRT7YcuJaBw",
  max_file_size: 50000000
});

app.use('/users', userRoutes)
app.use('/admin', adminRoute)
app.use(serviceRoute)
app.post('/checkout', async (req, res) => {
  console.log("hdhdhhdhdhdhhdhdhdhdhhdhdhd")
  try {
    console.log("ivdee------------------------------------------------- ")
   
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
      }
    })

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
            unit_amount: req.body.total * 100,
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


// app.post(
//   "/webhook",
//   express.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf.toString();
//     },
//   })
// );


app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res,buf) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.ENDPOINTSECRET;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody=buf.toString(), sig, endpointSecret);
    } catch (err) {
      console.log('Webhook signature verification failed:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the webhook event here
  } else {
    console.log('Webhook signing is not enabled');
  }

  res.send().end();
});






// app.post('/webhook', express.raw({type: 'application/json'}), (request, response,buf) => {
//   console.log("shshsh")
//   const endpointSecret = process.env.ENDPOINTSECRET;
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.rawBody = buf.toString(), sig, endpointSecret);
//     console.log(event,'>>>>>>>>>>>..')
//   } catch (err) {
//     console.log(err.message,"-------------------------")
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send().end();
// });








app.use('/', (req, res) => {
  res.json({ message: 'server ready' });
});






const server = app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`)
})


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
})


io.on("connection", (socket) => {
  console.log('connec to socket io')
});

io.on("connection", (socket) => {
  socket.emit("hello", "77777777777777777777777");
});
