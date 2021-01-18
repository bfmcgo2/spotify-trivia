import querystring from 'querystring';
import Cookies from 'js-cookie'

import { signInWithSpotify } from "./firebase";

const USER_DATA = `https://api.spotify.com/v1/me`;
const USER_PLAYBACK = `https://api.spotify.com/v1/me/player`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const NEW_MUSIC_ENDPOINT = `https://api.spotify.com/v1/browse/new-releases?country=US`
const MY_PLAYLISTS = `https://api.spotify.com/v1/me/playlists`
const SKIP_TRACK = `https://api.spotify.com/v1/me/player/next`
const ACCESS_TOKEN = `https://accounts.spotify.com/api/token`

const auth_token = Cookies.get('spotifyAuthToken');
const refresh_token = Cookies.get('spotifyRefreshToken');
const root = 'http://localhost:3000'
const redirect_uri = `${root}/auth`;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

export const login = (dispatch, redirect) =>{
  // console.log(redirect_uri)
  const getLoginURL = (scopes) =>{
    return 'https://accounts.spotify.com/authorize?client_id=' + client_id +
      '&redirect_uri=' + encodeURIComponent(redirect_uri) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=code&show_dialog=true';
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
  const popup = window.open(url, 'Spotify', 'height=600,width=400');

  window.spotifyCallback = async(payload) => {
    
    popup.close()
    const response = await getAccessToken(payload)
    const tokens = await response.json();

    console.log("spotify Call back", payload, tokens)
    Cookies.set('spotifyRefreshToken', tokens.refresh_token);
    Cookies.set('spotifyAuthToken', tokens.access_token);
    setUserTokens(tokens, dispatch);
    // window.location.href = `${root}${redirect}`;
  }
}


// SWR FETCH CONFLICT
const setUserTokens = async({ access_token }, dispatch) => {
  const get_user = await getUserData(access_token);
  const user_data = await get_user.json();

  Cookies.set('userData', JSON.stringify(user_data));
  console.log( JSON.stringify(user_data))
  return signInWithSpotify(user_data, dispatch);
}

const postRequest = async(auth, ...args) => {
  if(auth) {
    const { url, body } = args[0];
    // console.log(url, body)
    return fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify( body )
    }); 
  }
  const { url, token} = args[0]
  const post_data = fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      }
  })

  const res = await post_data;
  // console.log(res);

  if(res.status === 401) {
    console.log('refresh please')
    // refreshAuthToken()
    console.log(res, token)
    return post_data;
  }
}

const refreshAuthToken = async(callback) => {
  const grant_type= 'refresh_token';
  const refresh = await postRequest(true, {url: ACCESS_TOKEN, body: {grant_type, refresh_token}})
  const new_tokens = await refresh.json();
  // setUserTokens(new_tokens)
}

const getRequest = async(url, token) => {
  const get_data = fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
  })
  const data = await get_data
  return data;
}

export const getAccessToken = (code) => {
  const grant_type= 'authorization_code';
  return postRequest(true, {url: ACCESS_TOKEN, body: {code, redirect_uri, grant_type}});
}

export const getUserPlayback = () => {
  return getRequest(USER_PLAYBACK, token)
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
  return postRequest(false, {url: SKIP_TRACK, token})
}
  





