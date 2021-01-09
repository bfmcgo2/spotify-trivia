import { getNowPlaying } from '../../lib/spotify';

export default async (_, res) => {
  const access_token = _.query.access_token
  const response = await getNowPlaying(access_token);
  console.log(response)
  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const now_playing = await response.json()
  console.log(now_playing)
  // const song = await response.json();
  // console.log(song);
  // const isPlaying = song.is_playing;
  // const title = song.item.name;
  // const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
  // const album = song.item.album.name;
  // const albumImageUrl = song.item.album.images[0].url;
  // const songUrl = song.item.external_urls.spotify;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json(now_playing);
};