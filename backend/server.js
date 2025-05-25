import express from "express";
import cors from 'cors';
import {connect} from './config/db.js';
connect();
import menuRoutes from './routes/menu.route.js';
import mealRoutes from './routes/meal.route.js';
import paymentRoutes from './routes/payment.route.js';
import tableRoutes from './routes/table.route.js';
import emailRouter from './routes/email.route.js';
const app = express();
const port = process.env.PORT;

app.use(cors()); //allow cross-origin requests
app.use(express.json()); //allow json data in the body of the request

app.use('/menu', menuRoutes);
app.use('/api/meal', mealRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/table', tableRoutes);
app.use('/api/email', emailRouter);

app.listen(port, () => {});
