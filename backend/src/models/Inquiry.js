import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    inquiryId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Client email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Client phone number is required'],
      trim: true,
    },
    projectType: {
      type: String,
      default: 'Private Residence',
      trim: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['PENDING_REVIEW', 'CONTACTED', 'IN_PROGRESS', 'ARCHIVED'],
      default: 'PENDING_REVIEW',
    },
    receivedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
