import mongoose, { Document, Schema } from "mongoose";
import { ICourse } from "../course/schema/course";
import { IUser } from "../user/schema/user";
export interface IComment extends Document {
  comment: string;
  createdAt: Date;
  course: ICourse;
  user: IUser;
}

const commentSchema = new Schema<IComment>({
  comment: {
    type: "string",
    required: [true, "Comment is required"],
  },
});
