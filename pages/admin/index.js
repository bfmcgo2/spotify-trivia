import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Page, Modal, Collapse, Text, Checkbox, Spacer, Radio, Button } from "@geist-ui/react";
import { PlusCircle } from '@geist-ui/react-icons'
import useSWR, { SWRConfig } from 'swr';

import initAdmin from '../../hooks/initAdmin';
import fetcher from '../../lib/fetcher';

import Cards from '../../components/shared/Cards';

const Admin = ({live_games}) => {
	const [modal, setModal] = useState(false)
	const { user_challenges, radio, handler } = initAdmin();
	const playlist = () => {
		if(!user_challenges.playlist){
			return <div></div>
		}
		let tracks = user_challenges.playlist.map((tracks, i)=> {
			return(
				<div key={i}>
					<Radio value={i}>{tracks.title} by {tracks.artist}</Radio>
					<Spacer y={.5} />
				</div>
			)
		})

		return tracks
	}

	const openModal = () => setModal(true);
	if(!user_challenges.playlist)return <div></div>
	return (
		<Page>
			<Modal open={modal} onClose={()=> setModal(false)}>
				<Modal.Title>Create A Game</Modal.Title>
				<Modal.Subtitle>Add Challenges</Modal.Subtitle>
				<Modal.Content>
					<Collapse.Group>
						<Collapse title="New Music Friday">
							<Text>Guess the artist from the most recent New Music Friday!</Text>
							<Button type="success">Start Now</Button>
					  	</Collapse>
					  <Collapse title="Fill the Lyrics">
					  	<Radio.Group value={radio} onChange={handler}>
					  		<Text>Fill out the lyrics to some of these classics!</Text>
				    	{
				    		user_challenges.playlist.map((tracks, i)=> {
				    					return(
				    						<div key={i}>
				    							<Radio value={i}>{tracks.title} by {tracks.artist}</Radio>
				    							<Spacer y={.5} />
				    						</div>
				    					)
				    				})
				    	}
				    	{(radio === null ? <div></div> : <Button type="success">Start Now</Button>)}
					    </Radio.Group>
					  </Collapse>
					</Collapse.Group>
				</Modal.Content>
			</Modal>
			<Cards action = {openModal}>
				<h2>Create Game</h2>
				<PlusCircle color='white' size={36}/>
			</Cards>
			{
				live_games ? live_games.map((game)=> {
					return (
						<Cards>
							<h2>{game.title}</h2>
							<span>{game.teams}</span>
							<span>{game.id}</span>
						</Cards>
					)
				}) : <div></div>
			}
		</Page>
	)
}

export default Admin
