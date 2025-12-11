import mongoose, { Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  thumbnail?: string;
  author: string;
  authorId: string;
  excerpt?: string;
  status: "published" | "draft";
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    excerpt: { type: String, default: "" },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
