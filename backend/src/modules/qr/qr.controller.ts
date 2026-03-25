import { Request, Response, NextFunction } from 'express';
import { generateQrBuffer, getStudentQrToken } from './qr.service';

export const getMyQrCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await getStudentQrToken(req.user!.userId);
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const buffer = await generateQrBuffer(token, baseUrl);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline; filename="qr-profile.png"');
    res.send(buffer);
  } catch (err) {
    next(err);
  }
};
