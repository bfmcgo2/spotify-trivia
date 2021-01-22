import { useEffect, useContext } from 'react';
import { Page, Grid, Button } from "@geist-ui/react"
import Cookies from 'js-cookie';

import SongQuiz from '../../components/SongQuiz';
import SongCard from '../../components/shared/SongCard';

import useAuth from '../../hooks/useAuth';
import { User } from '../../context/UserContext';
import { signOutSpotify } from "../../lib/firebase";


const Dashboard = () => {
	const { state } = useContext(User);
	const { user, loading, spotifyAuthToken } = useAuth();
	const getUser = Cookies.get('userData');
	const token = spotifyAuthToken;
	
	const logout = () => {
	  Cookies.remove('spotifyAuthToken');
	  Cookies.remove('userData');
	  signOutSpotify();
	}
	console.log(getUser)
	if(!getUser) return <div></div>
	const userData = JSON.parse(getUser);
	return (
	<Page>	
		<div>User: {userData.display_name}</div>	
		<Button auto size="small" onClick={logout}>Logout</Button>
		<Grid.Container gap={2} justify="center">
			<SongQuiz token = {token} />
		</Grid.Container>
	</Page>
	)
}

export default Dashboard
