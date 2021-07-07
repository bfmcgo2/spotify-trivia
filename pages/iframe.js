import Head from 'next/head'

const Iframe = () => {
	return (
		<div>
			<video width="100%" height="100%" controls autoplay>
			  <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>
			</video>
		</div>
	)
}

export default Iframe;