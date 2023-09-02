import cloudinary from "cloudinary";
import * as AWS from "aws-sdk";
import File, { FileType, IFIle } from "./schema/file";
import * as uuid from "uuid";
import logger from "../utils/logger";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { S3Client } from "@aws-sdk/client-s3";
import { request } from "express";

export default class FileService {
  private s3Client: S3Client = new S3Client();

  private upload = multer({
    storage: multerS3({
      s3: this.s3Client,
      bucket: process.env.AWS_PUBLIC_BUCKET_NAME ?? "",
      key: (req, file, cb) => {
        logger.debug(
          `Uploading File ${file.filename}, with size ${file.size}......`
        );
        const uniqueSuffix = uuid.v4();
        const filename =
          file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
        cb(null, filename);
      },
    }),
  });

  public getUploadMiddleware = () => {
    return this.upload.single("file");
  };

  saveFileMetadata() {}
  /**
   * Upload a file to cloudinary, and retrun the url
   */
  public uploadFile = async (
    file: Express.Multer.File,
    fileType: FileType
  ): Promise<IFIle> => {
    try {
      const response = await new AWS.S3()
        .upload({
          Bucket: process.env.AWS_PUBLIC_BUCKET_NAME!,
          Key: `${file.originalname}-${uuid.v4()}`,
          Body: file.path,
        })
        .promise();
      const data = new File({
        url: response.Location,
        key: response.Key,
        type: fileType,
        name: file.originalname,
      });
      const newFile = await data.save();
      return newFile.toJSON();
    } catch (error) {
      logger.debug(`Error Uploading file: ${JSON.stringify(error)}`);
      console.error(`Error Uploading file: ${JSON.stringify(error)}`);
      throw new Error(`${error}`);
    }
  };
}
