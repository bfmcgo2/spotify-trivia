import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Page, Modal, Collapse, Text } from "@geist-ui/react";
import { PlusCircle } from '@geist-ui/react-icons'
import useSWR, { SWRConfig } from 'swr';


import fetcher from '../../lib/fetcher';

import Cards from '../../components/shared/Cards';



const Admin = ({live_games}) => {
	const [modal, setModal] = useState(false)

	const openModal = () => setModal(true);

	return (
		<Page>
			<Modal open={modal} onClose={()=> setModal(false)}>
				<Modal.Title>Create A Game</Modal.Title>
				<Modal.Subtitle>Add a Challenge</Modal.Subtitle>
				<Modal.Content>
					<Collapse.Group>
					  <Collapse title="New Music Friday">
					    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
					  </Collapse>
					  <Collapse title="Fill the Lyrics">
					    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
					  </Collapse>
					  <Collapse title="Name the Song">
					    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
					  </Collapse>
					</Collapse.Group>
				</Modal.Content>
				<Modal.Action passive onClick={() => setModal(false)}>Cancel</Modal.Action>
				<Modal.Action>Submit</Modal.Action>
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
