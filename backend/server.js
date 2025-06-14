import express from "express";
import cors from 'cors';
import {connect} from './config/db.js';
connect();
import mealRoutes from './routes/meal.route.js';
import paymentRoutes from './routes/payment.route.js';
import tableRoutes from './routes/table.route.js';
import emailRouter from './routes/email.route.js';
import ratingRoutes from './routes/rating.route.js';
import eventRoutes from "./routes/event.route.js";
import './cron/checkPastTime.js';
const app = express();
const port = process.env.PORT;

app.use(cors()); //allow cross-origin requests
app.use(express.json()); //allow json data in the body of the request

app.use('/api/meal', mealRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/table', tableRoutes);
app.use('/api/email', emailRouter);
app.use('/api/rating', ratingRoutes);
app.use('/api/event', eventRoutes);

app.listen(port, () => {});
