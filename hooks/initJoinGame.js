import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useSWR, { SWRConfig } from 'swr';

import fetcher from '../lib/fetcher';
import { getGame, addAnswers, gameRef } from '../lib/firebase';
import { skipTrack } from '../lib/spotify';

const token = Cookies.get('spotifyAuthToken');


const initJoinGame = () => {
	
	const [room_code, setRoomCode] = useState('');
	const [guest, setGuest] = useState({});
	const [disable, setDisable] = useState(true);
	const [game_details, setGameDetails] = useState();
	const [init_lyrics, setInitLyrics] = useState(false);
	const [lyrics, setLyrics] = useState();
	const [input, setInput] = useState('');
	const [current_users ,setCurrentUsers] = useState([])

	useEffect(()=>{
		const code = window.location.search.substr(1).split('&')[0].split("=")[1];
		setRoomCode(code);
	}, []);

	useEffect(()=> {
		if(guest.hasOwnProperty('name') && guest.hasOwnProperty('color')) setDisable(false);
		console.log(guest)
	}, [guest])
	

	useEffect(async()=> {
		if(room_code) {
			let data = await getGame(room_code);
			setGameDetails(data);
			setInitLyrics(true);

			const userWatch = gameRef.doc(room_code).collection('users').onSnapshot(snapshot => {
			  let users = [];
			  snapshot.forEach((snp)=>{
			    console.log(snp)
			    let data = snp.data();
			    users.push({...data, id: snp.id})
			  });
			  setCurrentUsers(users);
			}, err => {
			  console.log(`Encountered error: ${err}`);
			});
		}
	},[room_code])

	useEffect( async () => {
	  if(current_users) {
	    current_users.map((user,i) => {
	      const answerWatch = gameRef.doc(room_code)
	        .collection('users')
	          .doc(user.id)
	            .collection('answers')
	            .orderBy('createdAt', 'desc')
	            .limit(1)
	            .onSnapshot(snapshot => {
	              snapshot.forEach((snp)=>{
	                const data = snp.data()
	                if(data) {
	                  console.log(data, snp)
	                  const matched = getAllIndexes(lyrics, data.answer);
	                  updateAnswers(matched);
	                }
	                
	              });
	      }, err => {
	        console.log(`Encountered error: ${err}`);
	      });
	    })
	    
	    
	  }
	},[current_users]);


	

	useSWR((init_lyrics === true ? `/api/genius/get-song?artist=${game_details.artist}&title=${game_details.title}`: null), fetcher, 
    { 
      onSuccess:(data, error)=>{
        let { artist, title } = data;

        const lyric_answers = []
        let lyrics = data.lyrics.replace(/[\(\[].*?[\)\]]/g, "");
        let formatted = lyrics
                          .replace(/(\r\n)+|\r+|\n+|\t+/g, ' . ')
                          .replace(/\s+/g, ' ').trim()
        let arr = formatted.split(' ')
        
        arr.map(lyric => {
          // console.log(lyric)
          const answer = {}

          if(lyric.match(/^\./g)) {
            console.log(lyric);
            answer.lyric = false;
            answer.formatted_answer = false
            return lyric_answers.push(answer);
          }

          answer.correct = false;
          answer.lyric = lyric;
          answer.formatted_answer = lyric.replace(/[^\w\s]|_/g, '').toLowerCase();

          return lyric_answers.push(answer);
          
        })
        console.log(lyric_answers)
        setInitLyrics(false)
        setLyrics(lyric_answers)
      }
    });


	const getAllIndexes = (arr, val) => {
	  let indexes = []
	  let i;
	      for(i = 0; i < arr.length; i++)
	          if (arr[i].formatted_answer === val)
	              indexes.push(i);
	      return indexes;
	}

	const updateAnswers = (mat) => {
	  const dupl = [...lyrics];
	  const ans = mat.map((mat)=> {
	  	if(dupl[mat].correct === true) return;
	    if(dupl[mat].correct === false) {
			setInput('');

	    }
	    const answer = dupl[mat].formatted_answer
	    dupl[mat].correct = true;
	    setLyrics(dupl);
	    return answer
	  })

	  if(ans[0] === undefined || ans[0] === '') {
	  	return 
	  } else {
	  	console.log(ans[0])
	  	return addAnswers(room_code, guest.id ,ans[0])
	  }
	}

	
	// On input change
	useEffect(()=> {
	  const format = input.replace(/[^\w\s]|_/g, '').toLowerCase();
	  if(lyrics) {
	    const matched = getAllIndexes(lyrics, format);
	    updateAnswers(matched);
	  } 

	},[input]);
	

	return { 
		room_code,
		guest,
		disable,
		lyrics,
		setInput,
		input,
		setGuest
	}
}

export default initJoinGame;