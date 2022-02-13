import asyncHandler from 'express-async-handler';
import spotifyAPI from '@/functions/spotifyAPI';


export const getPlaylistById = asyncHandler(async (req, res) => {
	const { id } = req.query;

	const data = await spotifyAPI('/playlists/' + id, req.token);
	if (data.error) throw new Error(JSON.stringify(data));

	res.json(data);
});