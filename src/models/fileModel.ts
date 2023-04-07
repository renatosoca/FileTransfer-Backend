import { model, Schema } from "mongoose";
import { File } from "../interfaces";


const fileSchema = new Schema<File>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  originalName: {
    type: String,
    required: true,
    trim: true,
  },
  download: {
    type: Number,
    default: 1,
    required: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    default: null,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true, versionKey: false });

export default model<File>( 'File', fileSchema )