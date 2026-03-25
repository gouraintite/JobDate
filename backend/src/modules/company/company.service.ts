import { Company } from './company.model';
import { UpdateCompanyDto } from './company.schemas';

export const getCompanyByUserId = async (userId: string) => {
  const company = await Company.findOne({ userId });
  if (!company) throw Object.assign(new Error('Company not found'), { statusCode: 404 });
  return company;
};

export const updateCompany = async (userId: string, dto: UpdateCompanyDto) => {
  const company = await Company.findOneAndUpdate({ userId }, { $set: dto }, { new: true });
  if (!company) throw Object.assign(new Error('Company not found'), { statusCode: 404 });
  return company;
};

export const updateCompanyLogo = async (userId: string, logoUrl: string) => {
  const company = await Company.findOneAndUpdate({ userId }, { $set: { logoUrl } }, { new: true });
  if (!company) throw Object.assign(new Error('Company not found'), { statusCode: 404 });
  return company;
};
