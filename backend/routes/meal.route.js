import express from 'express';
import { getMenu, getMealById, createMeal, updateMeal, deleteMeal } from "../controllers/meal.controller.js";

const router = express.Router();

router.get('/', getMenu);

router.get('/:id', getMealById);

router.post('/', createMeal);

router.put('/:id', updateMeal);

router.delete('/:id', deleteMeal);

export default router;