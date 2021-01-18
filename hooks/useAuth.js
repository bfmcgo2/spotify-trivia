import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import * as db from '../lib/firebase';

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [spotifyAuthToken, setSpotifyAuthToken] = useState(null);

	useEffect(() => {
	  return db.checkAuth(user => {
	  	console.log(user);
	    setLoading(false);
	    setUser(user);
	  });
	}, [])

	useEffect(() => {
	  return setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
	}, [Cookies.get('spotifyAuthToken')])

	return { user, loading, spotifyAuthToken, setSpotifyAuthToken }
}

export default useAuth;