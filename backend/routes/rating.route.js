import {createRating, getRatings, deleteRating} from '../controllers/rating.controller.js';
import express from "express";

const router = express.Router();

router.post("/", createRating);
router.get("/", getRatings);
router.delete("/:id", deleteRating);

export default router;