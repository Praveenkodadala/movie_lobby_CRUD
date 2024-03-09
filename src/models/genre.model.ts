import mongoose, { Schema, Document } from 'mongoose';

export interface Genre extends Document {
  name: string;
}

const GenreSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
}, {
  timestamps: true
});

export const genreModel = mongoose.model<Genre>('Genre', GenreSchema);
