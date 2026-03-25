import { Student } from './student.model';
import { UpdateProfileDto } from './student.schemas';

export const getStudentByUserId = async (userId: string) => {
  const student = await Student.findOne({ userId });
  if (!student) throw Object.assign(new Error('Student not found'), { statusCode: 404 });
  return student;
};

export const getStudentByToken = async (token: string) => {
  const student = await Student.findOne({ qrCodeToken: token });
  if (!student) throw Object.assign(new Error('Profile not found'), { statusCode: 404 });
  return student;
};

export const updateStudentProfile = async (userId: string, dto: UpdateProfileDto) => {
  const student = await Student.findOneAndUpdate({ userId }, { $set: dto }, { new: true });
  if (!student) throw Object.assign(new Error('Student not found'), { statusCode: 404 });
  return student;
};

export const updateStudentCv = async (userId: string, cvUrl: string) => {
  const student = await Student.findOneAndUpdate({ userId }, { $set: { cvUrl } }, { new: true });
  if (!student) throw Object.assign(new Error('Student not found'), { statusCode: 404 });
  return student;
};

export const updateStudentAvatar = async (userId: string, avatarUrl: string) => {
  const student = await Student.findOneAndUpdate({ userId }, { $set: { avatarUrl } }, { new: true });
  if (!student) throw Object.assign(new Error('Student not found'), { statusCode: 404 });
  return student;
};
