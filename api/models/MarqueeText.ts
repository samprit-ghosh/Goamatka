import mongoose from 'mongoose';

const MarqueeTextSchema = new mongoose.Schema({
  text: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.MarqueeText || mongoose.model('MarqueeText', MarqueeTextSchema);
