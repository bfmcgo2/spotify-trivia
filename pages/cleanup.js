import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Page } from "@geist-ui/react"

import initLyricQuiz from '/hooks/initLyricQuiz';

import Lyric from '/components/Lyric/Lyric.js';
import Scoreboard from '/components/Scoreboard/Scoreboard.js';

const Cleanup = () => {
	const getUser = Cookies.get('userData');
	const { lyrics, setInput, input, endQuiz, score, songDetails, game_details, room_id, current_users } = initLyricQuiz();
	console.log(current_users);

	if(!lyrics) return <div></div>
	return (
		<Page>
			<div>Score: {score}/{lyrics.filter(lyric => !lyric.lyric=== false).length}</div>
			<div>
				<Scoreboard 
					users={ current_users }
					score= { score }
					lyrics = { lyrics }
					room_id = { room_id }/>

			</div>
			{ 
				lyrics.map((lyric, i) => {
					if(lyric.lyric === false) return <br key={i}/>
					return (
						<Lyric 
							lyric={lyric}
							key={i}/>
					)
				}) 
			}
		</Page>
	)
}

export default Cleanup
