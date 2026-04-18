import mongoose from 'mongoose';

const ExtraSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  open_1: String,
  open_3: String,
  close_1: String,
  close_3: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Extra || mongoose.model('Extra', ExtraSchema);
