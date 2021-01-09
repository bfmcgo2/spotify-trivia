import Slider from "react-slick";
import useSWR, { SWRConfig } from 'swr';
import { Button, Row, Grid, Input, Spacer } from "@geist-ui/react"

import fetcher from '../lib/fetcher';
import { getNowPlaying, skipTrack, getUserData, getTopTracks, getMyPlaylists } from '../lib/spotify';

import SongCard from './shared/SongCard';

const SongQuiz = ({token}) => {
  const { data, error } = useSWR('/api/new-music?access_token='+token, fetcher);
  console.log(data);
  
  return(
      <div>
          <Button onClick={ async()=> {
            let getSong = await getNowPlaying(token);
            let song = await getSong.json();
            console.log(song)
          }}>what are you listening to?</Button>
          <SongCard song={data.tracks[0]} />
          <Spacer y={1} />
          <Input size="large" placeholder="Who Is The Artist?" width="100%" />
      </div>
  )
}

export default SongQuiz;