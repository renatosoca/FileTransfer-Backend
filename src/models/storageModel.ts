import { model, Schema } from 'mongoose';
import { Storage } from '../interfaces';

const storageSchema = new Schema<Storage>({
  originalName: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
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

export default model<Storage>( 'Storage', storageSchema )