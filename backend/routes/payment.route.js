import express from "express";
import { createPaymentUrl, checkPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.get("/create_payment_url", createPaymentUrl);

router.get("/checkpayment", checkPayment);

export default router;
