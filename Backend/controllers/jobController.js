import Job from '../models/job.js';
import mongoose from 'mongoose';

// Helper to check valid ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getJobs = async (req, res) => {
  try {
    const { search, location, skills, salaryMin, salaryMax, page = 1, limit = 10 } = req.query;

    const query = { status: 'open' };

    if (search) {
      // For company, we can only filter by ObjectId if search is exact
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim());
      query.skillsRequired = { $all: skillsArray };
    }

    if (salaryMin || salaryMax) {
      query.salary = {};
      if (salaryMin) query.salary.$gte = Number(salaryMin);
      if (salaryMax) query.salary.$lte = Number(salaryMax);
    }

    const jobs = await Job.find(query)
      .populate('company', 'name description') // populate company info
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ postedAt: -1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name companyName')
      .populate('company', 'name description'); // populate company info
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const { company: companyId } = req.body;

    // Validate company if provided
    if (companyId) {
      if (!mongoose.Types.ObjectId.isValid(companyId)) {
        return res.status(400).json({ message: 'Invalid company ID' });
      }
      const companyExists = await Company.findById(companyId);
      if (!companyExists) {
        return res.status(404).json({ message: 'Company not found' });
      }
    }

    const jobData = { ...req.body, postedBy: req.user.userId };
    const job = new Job(jobData);
    await job.save();

    const populatedJob = await Job.findById(job._id).populate('company', 'name description');
    res.status(201).json(populatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Not authorized' });

    const { company: companyId } = req.body;

    // Validate company if being updated
    if (companyId) {
      if (!mongoose.Types.ObjectId.isValid(companyId)) {
        return res.status(400).json({ message: 'Invalid company ID' });
      }
      const companyExists = await Company.findById(companyId);
      if (!companyExists) {
        return res.status(404).json({ message: 'Company not found' });
      }
    }

    Object.assign(job, req.body);
    await job.save();

    const populatedJob = await Job.findById(job._id).populate('company', 'name description');
    res.json(populatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Not authorized' });

    await job.remove();
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchJobs = async (req, res) => {
  try {
    const { title, company, location, skills, salaryMin, salaryMax, status, page = 1, limit = 10, sortBy = 'postedAt', order = 'desc' } = req.query;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim());
      filter.skillsRequired = { $all: skillsArray };
    }
    if (salaryMin || salaryMax) {
      filter.salary = {};
      if (salaryMin) filter.salary.$gte = salaryMin;
      if (salaryMax) filter.salary.$lte = salaryMax;
    }
    if (status) filter.status = status;

    // If company filter is provided, try to find matching company ObjectId(s)
    if (company) {
      const companies = await mongoose.model('Company').find({ name: { $regex: company, $options: 'i' } }).select('_id');
      filter.company = { $in: companies.map(c => c._id) };
    }

    const sortOrder = order === 'asc' ? 1 : -1;

    const jobs = await Job.find(filter)
      .populate('company', 'name description')
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(filter);

    res.json({
      page: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
      jobs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/jobs/my
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.userId }).sort({ postedAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
