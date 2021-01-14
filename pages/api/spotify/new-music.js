import { getNewMusic } from '../../../lib/spotify';

export default async (_, res, a) => {
  // console.log(_.query.access_token);
  const access_token = _.query.access_token
  const response = await getNewMusic(access_token);
  const json = await response.json();
  // console.log(json.albums)

  const tracks = json.albums.items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: track.images.map((_image)=>_image.url),
    uri: track.uri
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ tracks });
};