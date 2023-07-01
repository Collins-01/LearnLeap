import mongoose, { Schema, Document } from "mongoose";

export interface IEnrollment extends Document {
  userId: string; // Reference to the User model
  courseId: string; // Reference to the Course model
  enrolledAt: Date;
}

const enrollmentSchema: Schema<IEnrollment> = new Schema({
  userId: {
    type: String,
    ref: "User", // Reference the User model
    required: [true, "Please provide a user"],
  },
  courseId: {
    type: String,
    ref: "Course", // Reference the Course model
    required: [true, "Please provide a course"],
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment = mongoose.model<IEnrollment>("Enrollment", enrollmentSchema);

export default Enrollment;
