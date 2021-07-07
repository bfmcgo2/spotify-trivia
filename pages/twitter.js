import Head from 'next/head'

const Twitter = () => {
	return (
		<div>
			<Head>
				<meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
				<meta name="twitter:card" content="player" />
				<meta name="twitter:title" content="Testing for Fenty" />
				<meta name="twitter:site" content="@BradleyFrancis_"/>
				<meta name="twitter:player" content="https://spotify-trivia.vercel.app/twitter" />
				<meta name="twitter:player:width" content="360" />
				<meta name="twitter:player:height" content="200" />
				<meta name="twitter:image" content="https://solutions.brightcove.com/bcls/twittercards/bison.jpg" />
			</Head>
			<div style={{position: 'relative', display: 'block', maxWidth: '640px'}}>
				<div style={{paddingTop: "56.25%"}}>
					<iframe src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" allowfullscreen="" allow="encrypted-media" frameborder="0" style={{
						position: "absolute",
						top: "0px",
						right:"0px",
						bottom:"0px",
						left:"0px",
						width: "100%",
						height: "100%"
					}}></iframe>
				</div>
			</div>
		</div>
	)
}

export default Twitter;