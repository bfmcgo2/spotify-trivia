const path = require('path');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production'
/*
 * Gets the BASE_PATH from the command used to start this app.
 * If BASE_PATH is specified but it does not start with a "/" 
 * then add it. 
 */
function getBasePath() {
    var basePath = ''

    if (isProd && process.env.BASE_PATH){
        if (process.env.BASE_PATH.startsWith("/") ){
            basePath = process.env.BASE_PATH;
        } else {
            basePath = "/" + process.env.BASE_PATH;
        }
    } 

    console.log("getBasePath() : isProd = " + isProd);
    console.log("getBasePath() : basePath = " + basePath);

    return basePath
}


module.exports = {
    publicRuntimeConfig: {
        basePath: getBasePath() ,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "main.scss";`
    },
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    },
    env: {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
        GENIUS_API_TOKEN : process.env.GENIUS_API_TOKEN
  },
};