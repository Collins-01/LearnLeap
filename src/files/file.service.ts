import cloudinary from "cloudinary";
import * as AWS from "aws-sdk";
export default class FileService {
  private s3Bucket: AWS.S3 = new AWS.S3();
  private initializeCloudinary = async () => {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
    });
  };

  private initializeAWS3 = async () => {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION, // e.g., 'us-east-1'
    });
  };
  constructor() {
    this.initializeCloudinary();
    this.initializeAWS3();
  }
  /**
   * Upload a file to cloudinary, and retrun the url
   */
  public uploadFile = async (file: Express.Multer.File) => {
    try {
      // const response = await cloudinary.v2.uploader.upload(file.path, {});
    } catch (error) {
      throw new Error("");
    }
  };
}
