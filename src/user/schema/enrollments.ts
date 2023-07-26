import mongoose, { Document, Schema } from "mongoose";

export interface IEnrollment extends Document {
  userId: string;
  courseId: string;
  chapterId: string;
  progress: number;
  createdAt: Date;
}

const enrollmentSchema: Schema<IEnrollment> = new Schema({
  userId: {
    type: "string",
    required: [true, "user id is required"],
    ref: "User",
  },

  courseId: {
    type: "string",
    required: [true, "course id is required"],
    ref: "Course",
  },
  chapterId: {
    type: "string",
    required: [true, "chapter id is required"],
    ref: "Chapter",
  },
  progress: {
    type: "number",
    default: 0.0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
