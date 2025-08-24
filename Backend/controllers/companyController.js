import Company from '../models/company.js';
import { companyDTO } from '../dtos/company.dto.js';
import Job from '../models/job.js';
import { jobDTO } from '../dtos/job.dto.js';

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies.map(companyDTO));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single company with jobs
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    const jobs = await Job.find({ company: company._id }).populate('postedBy');
    res.json({
      ...companyDTO(company),
      jobs: jobs.map(jobDTO),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

