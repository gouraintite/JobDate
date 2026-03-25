export interface Student {
  _id: string;
  userId: string;
  firstName: string;
  lastName?: string;
  school?: string;
  domains: string[];
  interests: string[];
  cvUrl?: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  bio?: string;
  qrCodeToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateStudentPayload {
  firstName?: string;
  lastName?: string;
  school?: string;
  domains?: string[];
  interests?: string[];
  linkedinUrl?: string;
  bio?: string;
}
