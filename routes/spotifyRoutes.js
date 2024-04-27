const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const User = require("../model/User");


router.route('/callback').get(async (req, res) => {
    const { code } = req.query;
    try {
        if (!code) {
            throw new Error("failed");
        }
        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT,
            clientSecret: process.env.SPOTIFY_SECRET,
            redirectUri: 'https://music-playlist-sync-service.onrender.com/spotify/callback',
        });
        const data = await spotifyApi.authorizationCodeGrant(code);
        const accessToken = data.body.access_token;
        const refreshToken = data.body.refresh_token;
        spotifyApi.setAccessToken(accessToken);
        const me = await spotifyApi.getMe();
 
        await User.create({
            api_config: data.body,
            name: me.body.display_name,
            spotify_id: me.body.id,
            id: me.body.id,
        });

        res.send('Authorization successful!');
    } catch (error) {
        res.status(500).send('Authorization error');
    }
});

module.exports = router;