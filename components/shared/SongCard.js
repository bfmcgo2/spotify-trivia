import { Card, Image, Text, Link } from "@geist-ui/react";

const SongCard = ({song}) => {
	// console.log(song);

	return(
		<Card width="400px">
		  <Image src={song.image[0]}
		   height="auto" width="100%" style={{ objectFit: 'cover' }} />
		  <Text h4 style={{ marginBottom: '0' }}>{song.title}</Text>
		  <Text type="secondary" small>{song.artist}</Text>
		  <Card.Footer>
		    <Link block target="_blank" href={song.uri}>Check it out on Spotify</Link>
		  </Card.Footer>
		</Card>
	)
}

export default SongCard;