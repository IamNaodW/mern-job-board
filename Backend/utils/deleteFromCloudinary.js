// utils/deleteFromCloudinary.js
import cloudinary from '../config/cloudinary.js';

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
  }
};
