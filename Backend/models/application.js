import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String, required: true },
  resumeUrl: { type: String, required: true },       // Cloudinary URL
  resumePublicId: { type: String, required: true },  // Cloudinary public ID for delete
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Application', applicationSchema);
