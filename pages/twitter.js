import Head from 'next/head'

const Twitter = () => {
	return (
		<div>
			<Head>
				<meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
				
				<meta name="twitter:card" content="player" />
					<meta name="twitter:site" content="@rchoi" />
					<meta name="twitter:title" content="Sample Player Card" />
					<meta name="twitter:description" content="This is a sample video. When you implement, make sure all links are secure." />
					<meta name="twitter:player" content="https://spotify-trivia.vercel.app/iframe" />
					<meta name="twitter:player:width" content="480" />
					<meta name="twitter:player:height" content="480" />
					<meta name="twitter:player:stream" content="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
			</Head>
		</div>
	)
}

export default Twitter;