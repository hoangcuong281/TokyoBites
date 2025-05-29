import express from "express";
import { getEmails, createEmail, deleteEmail, sendEmail } from "../controllers/email.controller.js";

const router = express.Router();

router.get("/get_email", getEmails);

router.post("/add_email", createEmail);

router.delete("/delete_email/:id", deleteEmail);

router.post("/send_email", sendEmail);

export default router;
