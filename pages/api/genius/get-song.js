import { getLyrics, getSong } from 'genius-lyrics-api';

export default async (_, res, a) => {
	const apiKey = process.env.GENIUS_API_TOKEN;
	const options = {
		apiKey: process.env.GENIUS_API_TOKEN,
		title: 'Crash Into Me',
		artist: 'Dave Matthews Band',
		optimizeQuery: true
	};

	const lyrics = await getLyrics(options)
	
	const combined = {...options, lyrics}
	console.log('hey >>>>>>>>>>', combined);
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json(combined);
};

