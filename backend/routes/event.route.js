import {createEvent, getEvents, updateEvent, deleteEvent} from '../controllers/event.controller.js';
import express from 'express';

const router = express.Router();

router.post('/create', createEvent);
router.get('/', getEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;

