import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  instructorId: string; // Reference to the User model
  price: number;
  type: string;
  createdAt: Date;
  rating: number;
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
    required: [true, "Please provide an instructorId"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  type: {
    type: String,
    required: [true, "Please provide a type"],
    enum: [
      "Computer Science",
      "Engineering",
      "Mathematics",
      "Physics",
      "Chemistry",
    ],
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

courseSchema.methods.toJSON = function () {
  const courseObject = this.toObject();
  return courseObject;
};

const Course = mongoose.model<ICourse>("Course", courseSchema);

export default Course;
