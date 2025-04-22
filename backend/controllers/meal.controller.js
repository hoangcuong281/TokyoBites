import Meal from "../models/meal.model.js";
import mongoose from 'mongoose';

export const getMenu = async (req, res) => {
    try {
        const meals = await Meal.find();
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch meals'});
    }
}

export const getMealById = async (req, res) => {
    const {id} = req.params;
    try {
        const meal = await Meal.findById(id);
        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch meal'});
    }
}

export const createMeal = async (req, res) => {
    const {name, description, img, category} = req.body;
    if(!name || !description || !img || !category) {
        return res.status(400).json({message: 'All fields are required'});
    }
    const meal = new Meal({name, description, img, category});
    try {
        await meal.save();
        res.status(201).json(meal);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error',
                details: error.message
            });
        }
        if (error.code === 11000) { // Duplicate key error
            return res.status(409).json({
                message: 'A meal with this name already exists'
            });
        }
        // Generic server error
        res.status(500).json({
            message: 'Failed to create meal',
            details: error.message
        });
    }
}

export const updateMeal = async (req, res) => {
    const {id} = req.params;
    const allowedFields = ['name', 'description', 'img', 'category'];
    
    // Check for unknown fields
    const unknownFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
    if (unknownFields.length > 0) {
        return res.status(400).json({
            message: `Invalid fields detected: ${unknownFields.join(', ')}`,
            allowedFields
        });
    }

    const {name, description, img, category} = req.body;
    
    // Validate that at least one valid field is provided
    if (!name && !description && !img && !category) {
        return res.status(400).json({
            message: 'At least one valid field (name, description, img, or category) is required'
        });
    }

    // Create update object with only valid fields
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (img) updateData.img = img;
    if (category) updateData.category = category;

    try {
        const updatedMeal = await Meal.findByIdAndUpdate(
            id, 
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedMeal) {
            return res.status(404).json({ message: 'Meal not found' });
        }

        res.status(200).json({
            message: 'Updated successfully',
            meal: updatedMeal
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid meal ID format',
                details: error.message
            });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error', 
                details: error.message
            });
        }
        res.status(500).json({
            message: 'Failed to update meal',
            details: error.message
        });
    }
}

export const deleteMeal = async (req, res) => {
    const {id} = req.params;    
    try {
        await Meal.findByIdAndDelete(id);
        res.status(200).json({message: 'Deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Product not found'});
    }
}
