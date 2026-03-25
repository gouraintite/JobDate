import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from './auth.service';
import { success } from '../../shared/utils/response.utils';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerUser(req.body);
    success(res, result, 201);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await loginUser(req.body);
    success(res, result);
  } catch (err) {
    next(err);
  }
};
