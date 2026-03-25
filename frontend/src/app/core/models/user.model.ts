export type UserRole = 'student' | 'company';

export interface AuthResponse {
  token: string;
  role: UserRole;
}

export interface RegisterPayload {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
