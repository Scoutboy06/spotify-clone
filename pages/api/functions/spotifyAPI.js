export default async function handler(req, res) {
	try {
		const raw = await fetch('https://api.spotify.com/v1' + req.url, {
			headers: {
				'Authorization': 'Bearer ' + req.token,
				'Content-Type': 'application/json',
			},
			method: req.method || 'GET',
			body: req.body || null,
		});
		const json = await raw.text();
		res.json(json);
	} catch (error) {
		res.status(error.status || 500).json({ error });
	}
}