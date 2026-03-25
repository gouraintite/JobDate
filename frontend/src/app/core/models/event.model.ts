export type ContractType = 'apprenticeship' | 'internship' | 'CDI' | 'CDD';

export interface JobEvent {
  _id: string;
  companyId: {
    _id: string;
    name: string;
    logoUrl?: string;
    linkedinUrl?: string;
    description?: string;
  };
  title: string;
  description: string;
  date: string;
  location: string;
  targetDomains: string[];
  contractTypes: ContractType[];
  linkedinUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  date: string;
  location: string;
  targetDomains: string[];
  contractTypes: ContractType[];
  linkedinUrl?: string;
}
