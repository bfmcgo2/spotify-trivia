import { getNowPlaying } from '../../../lib/spotify';

export default async (_, res) => {
  const access_token = _.query.access_token;
  const response = await getNowPlaying(access_token);
  console.log('now-playing log', response)
  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = await response.json()
  console.log('here it is>>>>>><><><>>', song)
  const acceptable_answers = [];
  const isPlaying = song.is_playing,
  image= song.item.album.images[0],
  uri= song.item.uri,
  artists= song.item.artists.map((artist) => artist.name),
  title= song.item.name,
  id = song.item.id

  song.item.artists.map(ans => {
    let { name } = ans
    const format = name.toLowerCase();
    const remove_punc = format.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    acceptable_answers.push(format.replace(/\s/g, ''));
    if(format.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g)) {
      acceptable_answers.push(remove_punc);
    }
  });
  console.log(acceptable_answers);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    id,
    isPlaying,
    image,
    uri,
    artists,
    title,
    isPlaying,
    acceptable_answers
  });
};