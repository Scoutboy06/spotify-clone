import Cookies from 'cookies';

export default async function handler(req, res, next) {
	const cookies = new Cookies(req, res);
	const token = cookies.get('access_token');

	if (token) {
		req.token = token;
		next();
	}
	else res.status(401).json({ error: 'Unauthorized' });
}