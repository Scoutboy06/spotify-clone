import Cookies from 'cookies';

export default function handler(req, res) {
	const cookies = new Cookies(req, res);
	const access_token = cookies.get('access_token');
	if (access_token) res.status(200).send(access_token);
	else res.status(401).json({ error: 'Unauthorized' });
}