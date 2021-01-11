import { Card, Image, Text, Link } from "@geist-ui/react";

import styles from '../../styles/SongCard.module.css'

const SongCard = ({song}) => {
	// console.log(song);

	return(
		<Card width="400px">
			<Image src={!song ? 'https://via.placeholder.com/550':song.image.url}	
			height="auto" width="100%" style={{ objectFit: 'cover' }} />
			<Text h4 style={{ marginBottom: '0' }}>{!song ? "Title" : song.title}</Text>
			<Text type="secondary" small>{!song ? "Artist" : song.artists.map(artist => artist)}</Text>
			<Card.Footer>
				<Link block target="_blank" href={!song ? "" : song.uri}>Check it out on Spotify</Link>
			</Card.Footer>
		</Card>
	)
}

export default SongCard;