import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
