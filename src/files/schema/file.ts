import mongoose, { Document, Schema } from "mongoose";

export enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  DOCUMENT = "document",
}
export interface IFIle extends Document {
  url: string;
  name: string;
  key: string;
  type: FileType;
  createdAt: Date;
}
export const fileSchema: Schema<IFIle> = new Schema({
  url: {
    type: "string",
    required: [true, "A url to the file is needed"],
  },
  name: {
    type: "string",
    required: [true, "a name to the file is required."],
  },
  key: {
    type: "string",
    required: [true, "a name to the file is required."],
    unique: true,
  },
  type: {
    type: "string",
    enum: Object.values(FileType),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const File = mongoose.model<IFIle>("File",fileSchema);
export default File