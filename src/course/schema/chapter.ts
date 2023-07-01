import mongoose, { Schema, Document } from "mongoose";

export interface IChapter extends Document {
  courseId: string;
  title: string;
  content: string;
}

const chapterSchema: Schema<IChapter> = new Schema({
  courseId: {
    type: String,
    ref: "Course",
    required: [true, "Please provide a course"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
  },
});

const Chapter = mongoose.model<IChapter>("Chapter", chapterSchema);

export default Chapter;
