import type { Request, Response, NextFunction } from 'express';
import {
  createEvent,
  getEvent,
  listEvents,
  updateEvent,
  deleteEvent,
} from '../../service/admin/eventService.js';
import type { EventCreateDto, EventUpdateDto } from '../../dto/AdminLoginDto.js';

export const createEventController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body as EventCreateDto;
    const result = await createEvent(dto);
    res.status(201).json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const listEventsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await listEvents();
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const getEventController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const result = await getEvent(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const updateEventController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const dto = req.body as EventUpdateDto;
    const result = await updateEvent(id, dto);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const deleteEventController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const result = await deleteEvent(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};