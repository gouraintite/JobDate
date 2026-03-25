import { User } from './auth.model';
import { Student } from '../student/student.model';
import { Company } from '../company/company.model';
import { hashPassword, comparePassword } from '../../shared/utils/hash.utils';
import { signToken } from '../../shared/utils/jwt.utils';
import { RegisterDto, LoginDto } from './auth.schemas';
import { v4 as uuidv4 } from 'uuid';

export const registerUser = async (dto: RegisterDto) => {
  const existing = await User.findOne({ email: dto.email });
  if (existing) throw Object.assign(new Error('Email already in use'), { statusCode: 409 });

  const passwordHash = await hashPassword(dto.password);
  const user = await User.create({ email: dto.email, passwordHash, role: dto.role, name: dto.name });

  if (dto.role === 'student') {
    await Student.create({ userId: user._id, firstName: dto.name, qrCodeToken: uuidv4() });
  } else {
    await Company.create({ userId: user._id, name: dto.name });
  }

  const token = signToken({ userId: user._id.toString(), role: user.role });
  return { token, role: user.role };
};

export const loginUser = async (dto: LoginDto) => {
  const user = await User.findOne({ email: dto.email });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });

  const valid = await comparePassword(dto.password, user.passwordHash);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });

  const token = signToken({ userId: user._id.toString(), role: user.role });
  return { token, role: user.role };
};
