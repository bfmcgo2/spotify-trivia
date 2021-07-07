import Head from 'next/head'

const Twitter = () => {
	return (
		<div>
			<Head>
				<meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
				<meta name="twitter:card" content="player" />
				<meta name="twitter:site" content="@wakeyio" />
				<meta name="twitter:title" content="Hemopure ~ Wakey Wakey #26" />
				<meta name="twitter:description" content="Hemopure is an artificial blood (HBOC) that’s saving lives in South Africa. It’s shelf stable and 100% compatible with all blood types." />
				<meta name="twitter:image" content="https://wakey.io/public/img/thumbs/26.png" />
				<meta name="twitter:player" content="https://wakey.io/embed/26" />
				<meta name="twitter:player:width" content="720" />
				<meta name="twitter:player:height" content="720" />
				<meta name="twitter:player:stream" content="https://wakey.io/public/vid/26.mp4" />
				<meta name="twitter:player:stream:content_type" content="video/mp4" />

			</Head>
		</div>
	)
}

export default Twitter;