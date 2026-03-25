import { Request, Response, NextFunction } from 'express';
import {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getCompanyEvents,
} from './event.service';
import { success } from '../../shared/utils/response.utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { domain, contractType } = req.query as Record<string, string>;
    const events = await listEvents({ domain, contractType });
    success(res, events);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await getEventById(req.params.id);
    success(res, event);
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await createEvent(req.user!.userId, req.body);
    success(res, event, 201);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await updateEvent(req.user!.userId, req.params.id, req.body);
    success(res, event);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteEvent(req.user!.userId, req.params.id);
    success(res, null, 204);
  } catch (err) {
    next(err);
  }
};

export const myEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await getCompanyEvents(req.user!.userId);
    success(res, events);
  } catch (err) {
    next(err);
  }
};
