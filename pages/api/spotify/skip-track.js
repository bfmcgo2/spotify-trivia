import { skipTrack } from '../../../lib/spotify';

export default async (_, res) => {
  const access_token = _.query.access_token
  const response = await skipTrack(access_token);
  // const user = await response.json();
  console.log(response)
if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  };
  


  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json( user );
};