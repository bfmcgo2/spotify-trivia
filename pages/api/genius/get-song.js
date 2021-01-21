import { getLyrics, getSong } from 'genius-lyrics-api';

export default async (_, res, a) => {
	const apiKey = process.env.GENIUS_API_TOKEN;
	const options = {
		apiKey: process.env.GENIUS_API_TOKEN,
		title: 'Hey Mama',
		artist: 'Kanye',
		optimizeQuery: true
	};

	const lyrics = await getLyrics(options)
	console.log(lyrics);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ lyrics });
};

