import nc from 'next-connect';
import spotifyAPI from '@/functions/spotifyAPI';
import protect from '@/middlewares/protect';


const routes = nc()
	.get('/playlists/:id', spotifyAPI)
	.get('/me', spotifyAPI)
	.get('/me/player', spotifyAPI)
	.put('/me/player', spotifyAPI)
	.get('/me/player/devices', spotifyAPI)
	.get('/me/playlists', spotifyAPI);


const handler = nc()
	.use('/api', protect, routes);


export default handler;