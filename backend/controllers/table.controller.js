import Table from '../models/table.model.js';
import mongoose from 'mongoose';

export const createTable = async (req, res) => {
    const {quantity, time, date, name, phone, email, occasion, specialRequest, tableType} = req.body;
    const table = new Table({quantity, time, date, name, phone, email, occasion, specialRequest, tableType});
    await table.save();
    res.status(201).json(table);
}

export const getTables = async (req, res) => {
    const tables = await Table.find();
    res.status(200).json(tables);
}

export const getTableById = async (req, res) => {
    const {id} = req.params;
    const table = await Table.findById(id);
    res.status(200).json(table);
}

export const updateTable = async (req, res) => {
    const {id} = req.params;
    const {quantity, time, date, name, phone, email, occasion, specialRequest, tableType} = req.body;
    const table = await Table.findByIdAndUpdate(id, {quantity, time, date, name, phone, email, occasion, specialRequest, tableType}, {new: true});
    res.status(200).json(table);
}

export const deleteTable = async (req, res) => {
    const {id} = req.params;
    await Table.findByIdAndDelete(id);
    res.status(200).json({message: 'Table deleted successfully'});
}








