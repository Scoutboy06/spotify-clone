import asyncHandler from 'express-async-handler';
import spotifyAPI from '@/functions/spotifyAPI';


export const getUserProfile = asyncHandler(async (req, res) => {
	const data = await spotifyAPI('/me', req.token);
	if (data.error) throw new Error(JSON.stringify(data));
	res.json(data);
});




export const getUsersPlaylists = asyncHandler(async (req, res) => {
	const data = await spotifyAPI('/me/playlists', req.token);
	if (data.error) throw new Error(JSON.stringify(data));
	res.json(data);
});