import Cookies from 'cookies';


export default function handler(req, res) {
	const cookies = new Cookies(req, res);

	if (cookies.get('access_token'))
		cookies.set('access_token');

	res.redirect('/');
}