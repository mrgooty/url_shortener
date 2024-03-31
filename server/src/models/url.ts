import mongoose, { Document, Schema } from 'mongoose';

export interface IUrl extends Document {
  longUrl: string;
  shortUrl: string;
  urlCode: string; 
  user: mongoose.Schema.Types.ObjectId; // Reference to User model
  createdAt: Date;
  visits: number;
  visitDetails:[{
    timestamp: Date,
    ip: string,
    userAgent: string
  }]
}

const urlSchema: Schema = new Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  urlCode: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  visits: { type: Number, required: true, default: 0 },
  visitDetails: [{
    timestamp: { type: Date, default: Date.now },
    ip: { type: String, required: false},
    userAgent: { type: String, required: false},
  }]
});

export default mongoose.model<IUrl>('Url', urlSchema);
