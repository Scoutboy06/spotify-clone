import nc from 'next-connect';
import { verifyToken } from '@/utils/jwt';
import { getUsersPlaylists } from '@/controllers/userController';

const handler = nc()
	.get(verifyToken, getUsersPlaylists);


export default handler;