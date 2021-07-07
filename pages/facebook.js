import Head from 'next/head'

const Facebook = () => {
	return (
		<div>
			<Head>
				<meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
				<meta property="og:url"                content="https://spotify-trivia.vercel.app/facebook" />
				<meta property="og:type"               content="website" />
				<meta property="og:title"              content="Fenty" />
				<meta property="og:video"              content="https://spotify-trivia.vercel.app/facebook" />
				<meta property="og:video:secure_url"   content="https://spotify-trivia.vercel.app/facebook" />
				<meta property="og:video:type"         content="video/mp4" />
				<meta property="og:video:width"        content="360" />
				<meta property="og:video:height"       content="200" />
				<meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />

			</Head>
			<div style={{position: 'relative', display: 'block', maxWidth: '640px'}}>
				<div style={{paddingTop: "56.25%"}}>
					<video style={{
						position: "absolute",
						top: "0px",
						right:"0px",
						bottom:"0px",
						left:"0px",
						width: "100%",
						height: "100%"
					}}
					width="100%" height="100%" controls autoplay>
					  <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>
					</video>
				</div>
			</div>
		</div>
	)
}

export default Facebook;