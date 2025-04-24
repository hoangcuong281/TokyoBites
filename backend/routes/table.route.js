import express from 'express';
import { createTable, getTables, getTableById, updateTable, deleteTable } from "../controllers/table.controller.js";

const router = express.Router();

router.get('/', getTables);

router.get('/:id', getTableById);

router.post('/', createTable);

router.put('/:id', updateTable);

router.delete('/:id', deleteTable);

export default router;