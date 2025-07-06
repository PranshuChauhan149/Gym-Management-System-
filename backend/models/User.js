import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {                       // ✅ Add this line
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  address: {
    type: String,
    trim: true
  },

  image: {
    type: String,
    default: ""
  },

  membership: {
    plan: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    paidAmount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: false },
    paymentMode: { type: String, default: "cash" }
  },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",   // 👈 This links to your Admin model
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
export default User;
