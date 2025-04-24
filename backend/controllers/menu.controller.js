import Meal from "../models/meal.model.js";

export const getMenu = async (req, res) => {
    try {
        const meals = await Meal.find();
        res.json(meals);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

