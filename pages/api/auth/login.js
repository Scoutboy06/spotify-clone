export default function handler(req, res) {
	const scopes = [
		// Images
		// 'ugc-image-upload',

		// Spotify Connect
		'user-read-playback-state',
		'user-modify-playback-state',
		'user-read-currently-playing',

		// Users
		'user-read-private',
		'user-read-email',

		// Follow
		// 'user-follow-modify', // Following deprecated?
		// 'user-follow-read', // Following deprecated?

		// Library
		'user-library-modify',
		'user-library-read',

		// Playback
		'streaming',
		// 'app-remote-control', // only for iOS SDK and Android SDK

		// Listening history
		'user-read-playback-position',
		'user-top-read',
		'user-read-recently-played',

		// Playlists
		'playlist-modify-private',
		'playlist-read-collaborative',
		'playlist-read-private',
		'playlist-modify-public',
	].join(' ');

	res.redirect('https://accounts.spotify.com/authorize?' + new URLSearchParams({
		response_type: 'code',
		client_id: process.env.SPOTIFY_CLIENT_ID,
		scope: encodeURIComponent(scopes),
		redirect_uri: process.env.LOGIN_REDIRECT_URL,
	}));
}