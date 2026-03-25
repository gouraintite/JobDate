import QRCode from 'qrcode';
import { Student } from '../student/student.model';

export const generateQrBuffer = async (token: string, baseUrl: string): Promise<Buffer> => {
  const profileUrl = `${baseUrl}/profile/${token}`;
  return QRCode.toBuffer(profileUrl, { type: 'png', width: 300, margin: 2 });
};

export const getStudentQrToken = async (userId: string): Promise<string> => {
  const student = await Student.findOne({ userId }, 'qrCodeToken');
  if (!student) throw Object.assign(new Error('Student not found'), { statusCode: 404 });
  return student.qrCodeToken;
};
