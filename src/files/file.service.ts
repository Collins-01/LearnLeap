import cloudinary from "cloudinary";
import * as AWS from "aws-sdk";
import File, { FileType, IFile } from "./schema/file";
import * as uuid from "uuid";
import logger from "../utils/logger";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { S3Client } from "@aws-sdk/client-s3";

import HttpException from "../errors/base-http-exception";

export default class FileService {
  private s3Client: S3Client = new S3Client();
  constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_KEY_SECRET!,
    });
  }

  private storage = multer.memoryStorage();
  private upload = multer({ storage: this.storage });

  public uploadSingle = (fieldName: string) => {
    return this.upload.single(fieldName);
  };

  public uploadForCourse = () => {
    return this.upload.fields([
      {
        name: "files",
        maxCount: 2,
      },
      
    ]);
  };

  saveFileMetadata() {}
  /**
   * Upload a file to cloudinary, and retrun the url
   */

  public uploadFile = async (
    file: Express.Multer.File,
    fileType: FileType
  ): Promise<IFile> => {
    return new Promise<IFile>((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto" },
        async (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            reject(
              new HttpException(500, "Failed to upload file to Cloudinary.")
            );
            return;
          }

          // Result contains Cloudinary file information
          if (!result) {
            reject(new HttpException(500, "File not available."));
            return;
          }

          const { url, public_id } = result;
          const data = new File({
            url: url,
            name: file.originalname,
            key: public_id,
            type: fileType,
          });

          try {
            const metadata = await data.save();
            resolve(metadata);
          } catch (err) {
            console.error("Error saving file metadata:", err);
            reject(new HttpException(500, "Failed to save file metadata."));
          }
        }
      );
    });
  };
}
