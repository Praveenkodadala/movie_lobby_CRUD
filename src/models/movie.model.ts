import mongoose, { Schema, Document } from "mongoose";

export interface Movie extends Document {
  title: string;
  genres: mongoose.Types.ObjectId[];
  rating: number;
  streamingLink: string;
}

const MovieSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    rating: { type: Number, required: true, default: 1, min: 1, max: 10 },
    streamingLink: {
      type: String,
      required: true,
      default: "https://www.youtube.com/watch?v=D0UnqGm_miA",
    },
  },
  {
    timestamps: true,
  }
);

MovieSchema.pre<Movie>('save', function(next) {
    if (this.isModified('title')) {
      this.title = this.title.toLowerCase().trim();
    }
    next();
  });

export const movieModel = mongoose.model<Movie>("Movie", MovieSchema);
