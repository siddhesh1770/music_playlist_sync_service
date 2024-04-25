
const SpotifyWebApi = require('spotify-web-api-node');

// Set up Spotify API authentication
const spotifyApi = new SpotifyWebApi({
    clientId: '5c3ee13c03bd4d16a22313a34ebac4bb',
    clientSecret: '477b87dd80db4faca97a00d7a2cffc63',
    redirectUri: 'https://music-playlist-sync-service.onrender.com/spotify/callback',
});

async function getSpotifyPlaylist(playlistId) {
    try {
        // const data = await spotifyApi.getPlaylist(playlistId);
        const authorizeURL = spotifyApi.createAuthorizeURL(['user-read-private', 'playlist-read-private'], 'state');
        const data = await spotifyApi.authorizationCodeGrant("AQDuK-Ti52kgY5FyZvnljia0kQSeaFG1BBiG3Hn-x1DkxkUvPwbO75xXq_suB2_Ri0tNle6c-meFcRKbcNFtv3_3xyINdJtGBUglbCnO4FKer-tsX0wKp4hrDkm1u0xfDTBSnHrPK3FgYwMmrsGPwoxNJFY9Iohv3sMrBed_XLBafuxVQvsX8De8kTFXzFAig7fsF0NrUg85GV1USurK2dn_T3Ql21OsOKwYMw");
        const accessToken = data.body.access_token;
        spotifyApi.setAccessToken(accessToken);
        const result = await spotifyApi.getUserPlaylists({});
        const me = await spotifyApi.getMe();
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
