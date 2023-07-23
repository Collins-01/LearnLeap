import mongoose, { Schema, Document } from "mongoose";

export interface IChapter extends Document {
  index: number;
  courseId: string;
  title: string;
  content: string;
  backgroundImage?: string | null | undefined;
  createdAt: Date;
}

const chapterSchema: Schema<IChapter> = new Schema({
  courseId: {
    type: String,
    ref: "Course",
    required: [true, "Please provide the course id "],
  },
  title: {
    type: String,
    required: [true, "Please provide a title for this chapter"],
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
  },
  backgroundImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Chapter = mongoose.model<IChapter>("Chapter", chapterSchema);

export default Chapter;
