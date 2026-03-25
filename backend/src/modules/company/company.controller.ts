import { Request, Response, NextFunction } from 'express';
import { getCompanyByUserId, updateCompany, updateCompanyLogo } from './company.service';
import { success } from '../../shared/utils/response.utils';

export const getMyCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const company = await getCompanyByUserId(req.user!.userId);
    success(res, company);
  } catch (err) {
    next(err);
  }
};

export const updateMyCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const company = await updateCompany(req.user!.userId, req.body);
    success(res, company);
  } catch (err) {
    next(err);
  }
};

export const uploadLogo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }
    const logoUrl = `/uploads/${req.file.filename}`;
    const company = await updateCompanyLogo(req.user!.userId, logoUrl);
    success(res, company);
  } catch (err) {
    next(err);
  }
};
