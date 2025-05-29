import axios from "axios";

const upload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "skillexchange"); // Changed to a more specific preset name
    formData.append("cloud_name", "dp6ila0y3");

    // Upload file to Cloudinary
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dp6ila0y3/auto/upload", // Changed to auto for automatic resource type detection
      formData
    );

    return response.data.secure_url; // Return uploaded image URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.response?.data || error);
    throw error;
  }
};

export default upload;
