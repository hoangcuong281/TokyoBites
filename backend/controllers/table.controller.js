import Table from '../models/table.model.js';
import mongoose from 'mongoose';

export const createTable = async (req, res) => {
    const {quantity, time, date, name, phone, email, occasion, specialRequest, tableType, paymentStatus, tableID} = req.body;
    const table = new Table({quantity, time, date, name, phone, email, occasion, specialRequest, tableType, paymentStatus, tableID});
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
    const fields = ["quantity", "time", "date", "name", "phone", "email", "occasion", "specialRequest", "tableType", "paymentStatus", "tableID"];

    const updateData = {};
    fields.forEach(field => {
      if (req.body[field]) {
        updateData[field] = req.body[field];
      }
    });
    const table = await Table.findOneAndUpdate({tableID: id}, updateData, {new: true});
    res.status(200).json(table);
}

export const deleteTable = async (req, res) => {
    const {id} = req.params;
    await Table.findByIdAndDelete(id);
    res.status(200).json({message: 'Table deleted successfully'});
}








