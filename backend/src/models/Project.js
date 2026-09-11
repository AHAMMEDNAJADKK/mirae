import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    num: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    tagline: { type: String, default: '' },
    category: { type: String, required: true },
    primaryCategory: { type: String, default: 'Residential' },
    filterCategories: [{ type: String }],
    year: { type: String, default: '2024' },
    location: { type: String, default: 'Kerala, India' },
    area: { type: String, default: '' },
    scope: { type: String, default: '' },
    description: { type: String, required: true },
    secondaryText: { type: String, default: '' },
    image: { type: String, required: true },
    fallbackImage: { type: String, default: '' },
    gallery: [{ type: String }],
    features: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
