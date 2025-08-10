import Application from '../models/application.js';
import Job from '../models/job.js';

export const applyToJob = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const { jobId } = req.params;
    const { coverLetter } = req.body;

    if (!coverLetter) {
      return res.status(400).json({ message: 'Cover letter is required' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const application = new Application({
      job: job._id,
      applicant: req.user.userId,  // From verifyToken middleware
      coverLetter,
      resumeUrl: req.file.path,
      resumePublicId: req.file.filename,
    });

    await application.save();

    job.applications.push(application._id);
    await job.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('applyToJob error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      populate: { path: 'applicant', select: 'name email' },
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job.applications);
  } catch (error) {
    console.error('getApplicants error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // TODO: optionally delete from Cloudinary here using resumePublicId

    await application.remove();

    // Remove from job's applications array
    await Job.findByIdAndUpdate(application.job, { $pull: { applications: application._id } });

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('deleteApplication error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
