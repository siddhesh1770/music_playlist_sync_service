
const SpotifyWebApi = require('spotify-web-api-node');

// Set up Spotify API authentication
const spotifyApi = new SpotifyWebApi({
    clientId: '5c3ee13c03bd4d16a22313a34ebac4bb',
    clientSecret: '477b87dd80db4faca97a00d7a2cffc63',
    redirectUri: 'http://localhost:8888/callback',

});

async function getSpotifyPlaylist(playlistId) {
    try {
        // const data = await spotifyApi.getPlaylist(playlistId);
        const authorizeURL = spotifyApi.createAuthorizeURL(['user-read-private', 'playlist-read-private'], 'state');
        const data = await spotifyApi.clientCredentialsGrant();
        const accessToken = data.body.access_token;
        spotifyApi.setAccessToken(accessToken);
        const result = await spotifyApi.getUserPlaylists({});
        console.log("hello");
        // return data.body.tracks.items;
    } catch (error) {
        console.log('Error getting Spotify playlist:', error);
        return null;
    }
}
async function main() {
    try {
        await getSpotifyPlaylist();
    } catch (error) {

    }
}


main();
