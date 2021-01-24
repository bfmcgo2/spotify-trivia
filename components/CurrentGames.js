import { useEffect, useState } from 'react';
import { PlusCircle } from '@geist-ui/react-icons'

import { fetchGames } from '../lib/firebase';

import Cards from './shared/Cards';



const CurrentGames = ({ openModal }) => {
  
    let live_games = fetchGames();
    console.log(live_games)

    const joinGame = (id) => {
      window.location.href = `/dashboard/lyric-quiz?room_token=${id}`
    }
    if(!live_games) return <div></div>
  return( 
    <div style={{
      display: 'flex',
    }}>
      <Cards action = {openModal}>
        <h2>Create Game</h2>
        <PlusCircle color='white' size={36}/>
      </Cards>
      {
        live_games.map((game,i)=> (
            <Cards key={i} action={()=> joinGame(game.id)}>
              <h2>{game.title}</h2>
            </Cards>
          )
        )
        
      }
    </div>
  )
}

export default CurrentGames;