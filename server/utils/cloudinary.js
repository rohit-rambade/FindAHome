import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dfyr4uvgc",
  api_key: "195675648321569",
  api_secret: "n_fW0StL-T8_woxc75aKBDxRP78",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const uploadOptions = { folder: "SHF" }; // Customize folder name if needed

    // Use cloudinary.uploader.upload to upload the image directly from the URL
    const result = await cloudinary.uploader.upload(imageUrl, uploadOptions);

    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
