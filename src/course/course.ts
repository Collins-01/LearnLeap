import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
  title: string;
  description: string;
  instructor: mongoose.Types.ObjectId; // Reference to the User model
  price: number;
}

const courseSchema: Schema<ICourse> = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: [true, 'Please provide an instructor'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
});

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
