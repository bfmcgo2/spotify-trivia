import { getUserData } from '../../../lib/spotify';

export default async (_, res) => {
  const access_token = _.query.access_token
  const response = await getUserData(access_token);
  const user = await response.json();
  // console.log(user);


  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json( user );
};