import Job from '../models/job.js';

export const getJobs = async (req, res) => {
  try {
    const { search, location, skills, salaryMin, salaryMax, page = 1, limit = 10 } = req.query;

    const query = { status: 'open' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
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
    const job = await Job.findById(req.params.id).populate('postedBy', 'name companyName');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const jobData = { ...req.body, postedBy: req.user.userId };
    const job = new Job(jobData);
    await job.save();
    res.status(201).json(job);
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

    Object.assign(job, req.body);
    await job.save();

    res.json(job);
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
    if (company) filter.company = { $regex: company, $options: 'i' };
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

    const sortOrder = order === 'asc' ? 1 : -1;

    const jobs = await Job.find(filter)
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

