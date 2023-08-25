import cloudinary from "cloudinary";
import * as AWS from "aws-sdk";
import File,{ FileType, IFIle } from "./schema/file";
import * as uuid from 'uuid';
import logger from "../utils/logger";
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
  public uploadFile = async (file: Express.Multer.File,fileType:FileType):Promise<IFIle> => {
    try {
      const response = await cloudinary.v2.uploader.upload(file.path, {});
      const data= new File({
        url: response.url,
        name:  `${file.filename}- ${uuid.v4()}`,
        key: '',
        type: fileType, 

      })
      const newFile = await data.save();
      return newFile.toJSON();
      
    } catch (error) {
      logger.debug(`Error Uploading file: ${error}`);
      throw new Error(`${error}`);
    }
  };
}
