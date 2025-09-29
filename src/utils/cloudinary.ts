import fs from 'fs';

import { cloudinary, CLOUDINARY_FOLDER_NAME } from '../config';
import { InternalServerError } from '../utils';

export const uploadToCloudinary = async (
  filePath: string,
  subfolder?: string,
): Promise<{
  url: string;
  publicId: string;
}> => {
  try {
    const subfolderToSave =
      typeof subfolder === 'undefined'
        ? CLOUDINARY_FOLDER_NAME
        : `${CLOUDINARY_FOLDER_NAME}/${subfolder}`;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: subfolderToSave,
      resource_type: 'image',
      transformation: [{ quality: 'auto' }, { format: 'webp' }],
    });

    console.log('✅ File uploaded to Cloudinary:', result.secure_url);

    // local file cleanup
    cleanupLocalFile(filePath);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('❌ Error uploading to Cloudinary:', error);

    // Ensure local file cleanup even if upload fails
    cleanupLocalFile(filePath);

    throw new InternalServerError('Failed to upload image to cloud storage');
  }
};

export const deleteFromCloudinary = async (
  publicId: string,
  resourceType = 'image',
) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    console.log(`🗑️ Image deleted from Cloudinary: ${publicId}`);
  } catch (error) {
    console.error('❌ Error deleting from Cloudinary:', error);
  }
};

const cleanupLocalFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('🗑️ Local file cleaned up:', filePath);
    } else {
      console.warn('⚠️ Local file not found for cleanup:', filePath);
    }
  } catch (error) {
    console.warn('⚠️ Failed to cleanup local file:', filePath, error);
  }
};
