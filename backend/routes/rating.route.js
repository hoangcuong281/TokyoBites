import {createRating} from '../controllers/rating.controller.js';
import express from "express";

const router = express.Router();

router.post("/", createRating);

export default router;