import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  slot_1_1: String, slot_1_3: String,
  slot_2_1: String, slot_2_3: String,
  slot_3_1: String, slot_3_3: String,
  slot_4_1: String, slot_4_3: String,
  slot_5_1: String, slot_5_3: String,
  slot_6_1: String, slot_6_3: String,
  slot_7_1: String, slot_7_3: String,
  slot_8_1: String, slot_8_3: String,
  slot_9_1: String, slot_9_3: String,
  slot_10_1: String, slot_10_3: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Result || mongoose.model('Result', ResultSchema);
