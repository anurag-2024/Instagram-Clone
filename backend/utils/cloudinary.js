import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (base64Image) => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: process.env.FOLDER_NAME,
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
      transformation: { width: 1000, height: 1000, crop: 'limit' },
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

export default { uploadImage };
