import jwt from 'jsonwebtoken';
import Cookies from 'cookies';



export function generateToken(token) {
	return jwt.sign({ token }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
}



export function verifyToken(req, res, next) {
	const cookies = new Cookies(req, res);
	const token = cookies.get('access_token')//.trim();
	// console.log(token);

	// jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
	// 	if (error) return res.status(401).json({ error });

	// 	// Token is valid
	// 	if (decoded) {
	// 		req.token = decoded.token;
	// 		next();
	// 	}

	// 	else res.sendStatus(401);
	// });
	req.token = token;
	next();
}