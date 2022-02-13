import Cookies from 'cookies';
import { generateToken } from '@/utils/jwt';


export default function handler(req, res) {

	const cookies = new Cookies(req, res, {
		expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)), // 7 days
		httpOnly: true,
	});


	const data = {
		grant_type: 'authorization_code',
		code: req.query.code,
		client_id: process.env.SPOTIFY_CLIENT_ID,
		client_secret: process.env.SPOTIFY_CLIENT_SECRET,
		redirect_uri: process.env.LOGIN_REDIRECT_URL,
	};


	fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		},
		body: new URLSearchParams(data).toString(),
	})
		.then(res => res.json())
		.then(json => {
			const token = generateToken(json.access_token);

			cookies.set('access_token', token);
			res.redirect('/');
		})
		.catch(err => {
			console.error(err);
			res.send(err);
		})
}