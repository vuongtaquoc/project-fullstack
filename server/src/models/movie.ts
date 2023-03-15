import { Schema, Model, model } from 'mongoose';

import { jsonTransform } from './../utils/model-helper';

export interface IMovieMethods {

}

export interface IMovie {
  youtube_id: string;
  title: string;
  description: string;
  created_user?: any;
  thumbnails?: any;
}

export interface IMovieModel extends Model<IMovie, {}, IMovieMethods> {
  verifyPassword(password: string): boolean;
  hashPassword(password: string): string;
}

const schema = new Schema<IMovie, IMovieModel, IMovieMethods>(
  {
    title: { type: String, index: true },
    description: String,
    youtube_id: String,
    created_user: Object,
    thumbnails: Object,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      transform: jsonTransform([]),
    },
  }
);

export const Movie = model<IMovie, IMovieModel>('Movie', schema);
export default Movie;
