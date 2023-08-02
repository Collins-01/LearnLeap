import mongoose, { Schema } from "mongoose";

export interface IVirtualClass extends Document {
  name: string;
  description: string;
  date: Date;
  creatorId: string;
  duration: number;
  // participants: string[];
  createdAt: Date;
}

const virtualClassSchema: Schema<IVirtualClass> = new Schema(
  {
    name: {
      type: "string",
      required: [true, "Please provide a name for the virtual class."],
      minlength: 3,
      unique: true,
    },
    description: {
      type: "string",
      required: [true, "Please provide a description for the virtual class."],
      minlength: 10,
    },
    date: {
      type: "date",
      required: [true, "Please provide a description for the virtual class."],
    },
    creatorId: {
      ref: "User",
      type: "string",
      required: [true, "Please provide a description for the virtual class."],
    },
    duration: {
      type: "number",
      required: [true, "please provide a duration for the virtual class."],
    },
    createdAt: {
      type: "date",
      default: Date.now()
    }
  },
  { timestamps: true }
);

const VirtualClass = mongoose.model<IVirtualClass>(
  "VirtualClass",
  virtualClassSchema
);

export default VirtualClass;
