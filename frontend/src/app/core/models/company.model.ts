export interface Company {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  logoUrl?: string;
  linkedinUrl?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCompanyPayload {
  name?: string;
  description?: string;
  linkedinUrl?: string;
  website?: string;
}
