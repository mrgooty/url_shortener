import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAuthToken(): Promise<string>;
  }
  

// Interface for the model to include custom static methods
interface IUserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): Promise<IUser>;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Implement findByCredentials static method
userSchema.statics.findByCredentials = async function(email: string, password: string): Promise<IUser> {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};
userSchema.methods.generateAuthToken = async function(): Promise<string> {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'secretKey');
    // You might want to store the token in your database here
    return token;
  };
// Create the model and export it
const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;
