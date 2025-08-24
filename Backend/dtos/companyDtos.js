export const companyDTO = (company) => {
  if (!company) return null;

  return {
    id: company._id,
    name: company.name,
    logo: company.logo,
    description: company.description,
    website: company.website,
    industry: company.industry,
    createdAt: company.createdAt,
  };
};
