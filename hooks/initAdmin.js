import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useSWR, { SWRConfig } from 'swr';

import fetcher from '../lib/fetcher';
import { skipTrack } from '../lib/spotify';

const token = Cookies.get('spotifyAuthToken');


const initAdmin = () => {

	const [get_data, setGetData] = useState(false);
	const [user_challenges, setUserChallenges] = useState({});
	const [radio, setRadio] = useState(null)
	
	const handler = val => {
	    setRadio(val)
	    console.log(val)
	}

	useSWR('/api/spotify/a-playlist?access_token='+token, fetcher,
	{ 
	  onSuccess:(data, error)=>{
	  	console.log(data)
	  	setUserChallenges({ ...user_challenges, playlist: data })
	   //  setGetData(false)
	  }	
	})



	// useEffect(()=> {
	// 	setGetData(true);
	  
	// },[]);


	
	// matching acceptable answers with input field
	

	return { 
		user_challenges,
		radio,
		handler
	}
}

export default initAdmin;