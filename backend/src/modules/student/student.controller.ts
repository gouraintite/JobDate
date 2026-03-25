import { Request, Response, NextFunction } from 'express';
import {
  getStudentByUserId,
  getStudentByToken,
  updateStudentProfile,
  updateStudentCv,
  updateStudentAvatar,
} from './student.service';
import { success } from '../../shared/utils/response.utils';

export const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await getStudentByUserId(req.user!.userId);
    success(res, student);
  } catch (err) {
    next(err);
  }
};

export const getPublicProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await getStudentByToken(req.params.token);
    success(res, student);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await updateStudentProfile(req.user!.userId, req.body);
    success(res, student);
  } catch (err) {
    next(err);
  }
};

export const uploadCv = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }
    const cvUrl = `/uploads/${req.file.filename}`;
    const student = await updateStudentCv(req.user!.userId, cvUrl);
    success(res, student);
  } catch (err) {
    next(err);
  }
};

export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }
    const avatarUrl = `/uploads/${req.file.filename}`;
    const student = await updateStudentAvatar(req.user!.userId, avatarUrl);
    success(res, student);
  } catch (err) {
    next(err);
  }
};
