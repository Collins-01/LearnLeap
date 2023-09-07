import mongoose, { Document, Schema } from "mongoose";
import { ICourse } from "../course/schema/course";
import { IUser } from "../user/schema/user";
export interface IComment extends Document {
  comment: string;
  createdAt: Date;
  courseId: string;
  authorId: string;
}

const commentSchema: Schema<IComment> = new Schema<IComment>({
  comment: {
    type: "string",
    required: [true, "Comment is required"],
  },

  authorId: {
    type: "string",
    ref: "User",
    required: [true, "Please provide an instructorId"],
  },
  courseId: {
    type: "string",
    ref: "Course",
    required: [true, "Please provide an instructorId"],
  },

  createdAt: {
    type: "Date",
    default: Date.now(),
  },
});
