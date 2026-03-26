import mongoose, { Schema, Document, Model } from "mongoose";

export interface IArtist extends Document {
  name: string;
  slug: string;
  order: number;
  title: string;
  bio: string;
  shortDescription: string;
  coverImage: string;
  images: string[];
  imageAlts: string[];
  videos: string[];
  genres: string[];
  location: string;
  availableIn: string[];
  rating: number;
  totalBookings: string;
  badges: string[];
  pricing: {
    type: string;
    price: number;
  }[];
  priceIndicator: string;
  originalPriceIndicator: string;
  bookingAmount: string;
  status: "approved" | "pending" | "rejected";
  bestFor: {
    category: string;
    events: string[];
  }[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ArtistSchema = new Schema<IArtist>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    title: { type: String, default: "" },
    bio: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    images: [{ type: String }],
    imageAlts: [{ type: String }],
    videos: [{ type: String }],
    genres: [{ type: String }],
    location: { type: String, default: "Bangalore" },
    availableIn: [{ type: String }],
    rating: { type: Number, default: 4.5 },
    totalBookings: { type: String, default: "0" },
    badges: [{ type: String }],
    pricing: [
      {
        type: { type: String },
        price: { type: Number },
      },
    ],
    priceIndicator: { type: String, default: "" },
    originalPriceIndicator: { type: String, default: "" },
    bookingAmount: { type: String, default: "" },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },
    bestFor: [
      {
        category: { type: String },
        events: [{ type: String }],
      },
    ],
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

// Prevent recompile error in dev
const Artist: Model<IArtist> =
  mongoose.models.Artist || mongoose.model<IArtist>("Artist", ArtistSchema);

export default Artist;
