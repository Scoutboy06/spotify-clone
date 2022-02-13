export default function handler(req, res) {
	const scopes = [
		'user-read-private',
		'user-read-email',
		'playlist-read-private',
		'playlist-modify-private',
		// 'user-library-read',
		// 'user-library-modify'
	].join(' ');

	res.redirect('https://accounts.spotify.com/authorize?' + new URLSearchParams({
		response_type: 'code',
		client_id: process.env.SPOTIFY_CLIENT_ID,
		scope: encodeURIComponent(scopes),
		redirect_uri: process.env.LOGIN_REDIRECT_URL,
	}));
}