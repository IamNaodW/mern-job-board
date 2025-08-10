import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ['jobseeker', 'employer', 'admin'],
    default: 'jobseeker',
  },

  resume: { type: String },

  companyName: { type: String },

  dateJoined: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
