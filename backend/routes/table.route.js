import express from 'express';
import { createTable, getTables, getTableById, updateTableDepositStatus, updateTable, updateTableBill, deleteTable, getAvailTbls, getTblConfig, getTblConfigById } from "../controllers/table.controller.js";

const router = express.Router();

router.get('/', getTables);

router.get('/config', getTblConfig);

router.get('/config/:id', getTblConfigById);

router.get('/:id', getTableById);

router.post('/', createTable);

router.put('/:id', updateTableDepositStatus);

router.put('/update/:id', updateTable);

router.put('/bill/:id', updateTableBill);

router.delete('/:id', deleteTable);

router.get('/avail/:date/:time', getAvailTbls);

export default router;