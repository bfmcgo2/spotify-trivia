import Head from 'next/head'

const Twitter = () => {
	return (
		<div>
			<Head>
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@nytimesbits" />
				<meta name="twitter:creator" content="@nickbilton" />
				<meta name="twitter:player:stream" content="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
				<meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
				<meta property="og:title" content="A Twitter for My Sister" />
				<meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />

			</Head>
		</div>
	)
}

export default Twitter;