const debug = require("debug");
const log = debug("syncSpotifyToYTMusic");
const SpotifyWebApi = require('spotify-web-api-node');
const User = require("../model/User");
const connectDb = require("../service/mongo");
const user_id = process.env.USER_ID;

const spotifyApi = new SpotifyWebApi({
    clientId: '5c3ee13c03bd4d16a22313a34ebac4bb',
    clientSecret: '477b87dd80db4faca97a00d7a2cffc63',
    redirectUri: 'https://music-playlist-sync-service.onrender.com/spotify/callback',
});

async function main() {
    try {
        if (!user_id) {
            throw "No User ID Set";
        }

        await connectDb();
        await authenticateUser();

        const spotify_playlists = await getSpotifyPlaylists();
        
        for (let i = 0; i < spotify_playlists.length; i++) {
            
        }

        log("hello");
    } catch (error) {
        log(error.message);
        process.exit(0);
    }
}

async function getSpotifyPlaylists() {
    const data = await spotifyApi.getUserPlaylists();
    return data.body.items || [];
}

async function authenticateUser() {
    try {
        
        const user = await User.findOne({
            name: "Siddhesh Patil",
        })
        let access_token = user.api_config.access_token;
        const refresh_token = user.api_config.refresh_token;
        const expires_at = user.api_config.expires_in;

        if (!access_token || !refresh_token) {
            throw "no user or token found";
        }

        spotifyApi.setRefreshToken(refresh_token);
        spotifyApi.setAccessToken(access_token);

        // Check if access token is expired
        const now = new Date().getTime();
        if (now >= expires_at) {
            // Access token expired, refresh it
            const data = await spotifyApi.refreshAccessToken();
            access_token = data.body.access_token;

            // Update user's access token in the database
            await User.updateOne({ userId: user_id }, {
                api_config: {
                    accessToken: access_token,
                }
            });

            // Set the new access token in the SpotifyWebApi instance
            spotifyApi.setAccessToken(newAccessToken);
        }
        log("user is authenticated and ready to use");
    } catch (error) {
        throw error;
    }
}

main();
