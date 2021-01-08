export default async function Fetcher(url, token) {
	console.log(url, token);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}