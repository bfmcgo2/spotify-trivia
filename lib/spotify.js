import querystring from 'querystring';

import { signInWithSpotify } from "./firebase";

const USER_DATA = `https://api.spotify.com/v1/me`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const NEW_MUSIC_ENDPOINT = `https://api.spotify.com/v1/browse/new-releases?country=US`
const MY_PLAYLISTS = `https://api.spotify.com/v1/me/playlists`
const SKIP_TRACK = `https://api.spotify.com/v1/me/player/next`

const redirect_uri = 'http://localhost:3000';


export const login = (client_id) =>{
  const getLoginURL = (scopes) =>{
    return 'https://accounts.spotify.com/authorize?client_id=' + client_id +
      '&redirect_uri=' + encodeURIComponent(redirect_uri) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token&show_dialog=true';
  }


  const url = getLoginURL([
    'user-read-email',
    'user-read-private',
    'user-top-read',
    'user-read-currently-playing',
    'user-modify-playback-state',
    'user-read-playback-state'
  ]);


    // Show spotify auth popup
  let popup = window.open(url, 'Spotify', 'height=600,width=400');
  window.spotifyCallback = async(payload) => {
    popup.close()
    let get_user = await getUserData(payload)
    let user_data = await get_user.json();
    console.log(user_data);
    signInWithSpotify(user_data);
  }
}

const getRequest = (url, token) => {
  console.log('check: ',url, token)
  return fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });  
}

const postRequest = (url, token) => {
  return fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
    }); 
}


export const getNowPlaying = async (token) => {
  return getRequest(NOW_PLAYING_ENDPOINT, token)
};

export const getUserData = async (token) => {
  return getRequest(USER_DATA, token)
};

export const getTopTracks = async (token) => {
  return getRequest(TOP_TRACKS_ENDPOINT, token) 
};

export const getNewMusic = async (token) => {
    return getRequest(NEW_MUSIC_ENDPOINT, token)
};

export const getMyPlaylists = async (token) => {
  return getRequest(MY_PLAYLISTS, token)
};

export const skipTrack = async (token) => {
  return postRequest(SKIP_TRACK, token)
}
  





