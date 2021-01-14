import { Page } from "@geist-ui/react"

import Auth from '../components/Auth';
import useAuth from '../hooks/useAuth';
import { signInWithSpotify } from "../lib/firebase";


const AuthPage = () => {
	// <Auth token = { spotifyAuthToken }/>
	const { spotifyAuthToken } = useAuth();
	
	return (
	<Page>		
		<Auth token = { spotifyAuthToken }/>
	</Page>
	)
}

export default AuthPage
