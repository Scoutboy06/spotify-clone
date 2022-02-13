export default async function spotifyAPI(path, token) {
	const raw = await fetch('https://api.spotify.com/v1' + path, {
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
	});
	const json = await raw.json();
	return json;
}