import mongoose, { Schema, Document } from "mongoose";

interface ICourse extends Document {
  title: string;
  description: string;
  instructorId: string; // Reference to the User model
  price: number;
  type: string;
}

const courseSchema: Schema<ICourse> = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  instructorId: {
    type: String,
    ref: "User", // Reference the User model
    required: [true, "Please provide an instructor"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  type: {
    type: String,
    required: [true, "Please provide a type"],
    enum: ["Computer Science", "Engineering", "Mathematics", "Physics", "Chemistry"],
  },
});

const Course = mongoose.model<ICourse>("Course", courseSchema);

export default Course;
