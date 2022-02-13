import nc from 'next-connect';
import { verifyToken } from '@/utils/jwt';
import { getUserProfile } from '@/controllers/userController';

const handler = nc()
	.get(verifyToken, getUserProfile);


export default handler;