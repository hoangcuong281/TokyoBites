import express from 'express';
import { createTable, getTables, getTableById, updateTablePaymentStatus, updateTable, deleteTable, getAvailTbls, getTblConfig, getTblConfigById } from "../controllers/table.controller.js";

const router = express.Router();

router.get('/', getTables);

router.get('/config', getTblConfig);

router.get('/config/:id', getTblConfigById);

router.get('/:id', getTableById);

router.post('/', createTable);

router.put('/:id', updateTablePaymentStatus);

router.put('/update/:id', updateTable);

router.delete('/:id', deleteTable);

router.get('/avail/:date/:time', getAvailTbls);

export default router;