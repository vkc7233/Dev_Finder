import { supabase } from './supabase';

// Upload image and return public URL
export const uploadProfileImage = async (file, userId) => {
  try {
    // Validate file
    if (!file) throw new Error('No file provided');
    
    // Check file type
    const fileExt = file.name.split('.').pop().toLowerCase();
    const validTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    if (!validTypes.includes(fileExt)) {
      throw new Error('Invalid file type. Please upload a JPG, PNG, Webp or GIF file.');
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }

    // Create unique filename
const fileName = `public/${userId}/${userId}-${Date.now()}.${fileExt}`;

    // Upload file
    const { error: uploadError } = await supabase.storage
      .from('user-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('user-images')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
};

// Get public URL for an existing image
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  const { data: { publicUrl } } = supabase.storage
    .from('user-images')
    .getPublicUrl(imagePath);
    
  return publicUrl;
};

// Delete an existing profile image
export const deleteProfileImage = async (imagePath) => {
  if (!imagePath) return;

  try {
    const { error } = await supabase.storage
      .from('user-images')
      .remove([imagePath]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting image:', error.message);
    throw error;
  }
};

// Update profile image (delete old one if exists and upload new one)
export const updateProfileImage = async (file, userId, oldImagePath) => {
  try {
    // Upload new image
    const newImageUrl = await uploadProfileImage(file, userId);
    
    // If successful, delete old image
    if (oldImagePath) {
      await deleteProfileImage(oldImagePath);
    }

    return newImageUrl;
  } catch (error) {
    console.error('Error updating profile image:', error.message);
    throw error;
  }
};