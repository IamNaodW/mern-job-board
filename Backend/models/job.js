import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },

  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, // optional

  location: { type: String, required: true },

  description: { type: String, required: true },

  skillsRequired: [{ type: String }],

  salary: { type: Number },

  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],

  postedAt: { type: Date, default: Date.now },

  deadline: { type: Date },

  status: { type: String, enum: ['open', 'closed'], default: 'open' },
});

export default mongoose.model('Job', jobSchema);
