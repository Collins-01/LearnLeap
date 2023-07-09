import cloudinary from "cloudinary";
export default class FileService {
  private initializeCloudinary = async () => {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
    });
  };
  constructor() {
    this.initializeCloudinary();
  }
  /**
   * Upload a file to cloudinary, and retrun the url
   */
  public uploadFile = async (file: Express.Multer.File) => {
    try {
      const response = await cloudinary.v2.uploader.upload(file.path, {});
    } catch (error) {
        throw new Error('')
    }
  };
}
