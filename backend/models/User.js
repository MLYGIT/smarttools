import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  purchases: [{
    toolId: String,
    toolName: String,
    licenseKey: String,
    amount: Number,
    purchasedAt: Date,
    paymentId: String
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);