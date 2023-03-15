import * as RestifyErrors from 'restify-errors';

import { Movie } from '../models/movie';

import { getVideoInfo, youtubeParser } from '../services/youtube';
import { formatResponse } from '../utils/api-helper';

export async function insert(req, res, next) {
  const { videoUrl } = req.body;
  const videoId = youtubeParser(videoUrl);

  const movieExist = await Movie.findOne({
    youtube_id: videoId,
  }).exec();

  if (movieExist) {
    throw new RestifyErrors.UnauthorizedError('video url already exists');
  }

  const videoInfo = await getVideoInfo(videoId);

  const movie = new Movie({
    youtube_id: videoInfo.id,
    title: videoInfo.snippet.title,
    description: videoInfo.snippet.description,
    thumbnails: videoInfo.snippet.thumbnails,
    created_user: req.user,
  });

  await movie.save();

  res.send(formatResponse(movie));
  return next();
}

export async function findAll(req, res, next) {
  const movies = await Movie.find();

  res.send(formatResponse(movies));
  return next();
}
