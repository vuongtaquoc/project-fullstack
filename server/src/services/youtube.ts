import axios from 'axios';
import * as RestifyErrors from 'restify-errors';

import {
  YOUTUBE_API_KEY,
} from '../common/env';

export function youtubeParser(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);

  return (match && match[7].length === 11)? match[7] : false;
}

export async function getVideoInfo(videoId: string) {
  const googleAPI = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`;

  const resp = await axios.get(googleAPI);

  if (resp.status !== 200) throw new RestifyErrors.InternalServerError();

  const [ item ] = resp.data.items;

  return item;
}
