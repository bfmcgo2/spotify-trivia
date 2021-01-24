import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useSWR, { SWRConfig } from 'swr';

import fetcher from '../lib/fetcher';
import { fetchGames } from '../lib/firebase';
import { skipTrack } from '../lib/spotify';

const token = Cookies.get('spotifyAuthToken');


const initAdmin = () => {
	const [init_playlist, setInitPlayList] = useState(false);
	const [get_data, setGetData] = useState(false);
	const [user_challenges, setUserChallenges] = useState({});
	const [radio, setRadio] = useState(null);
	const [modal, setModal] = useState(false);
	const openModal = () => setModal(true);
	const user_data = Cookies.get('userData');

	const setLiveGames = async() => {
		const live_games = await fetchGames();
		console.log(live_games)
	}

	const handler = val => {
	    setRadio(val)
	    console.log(val)
	}

	useSWR((init_playlist === false ? '/api/spotify/a-playlist?access_token='+token : null), fetcher,
	{ 
	  onSuccess:(data, error)=>{
	  	let resolve = data.map(res=> res);
	  	console.log(resolve)
	  	let merge = {...user_challenges, playlist: resolve};
	  	setInitPlayList(true);
	  	setUserChallenges(merge)
	    setGetData(false)
	  }	
	})



	useEffect(()=> {
		console.log(user_challenges)
	  
	},[user_challenges]);


	
	// matching acceptable answers with input field
	

	return { 
		user_challenges,
		radio,
		handler,
		modal,
		setModal,
		openModal,
		user_data
	}
}

export default initAdmin;