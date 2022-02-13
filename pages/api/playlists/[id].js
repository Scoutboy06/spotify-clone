import nc from 'next-connect';
import { verifyToken } from '@/utils/jwt';
import { getPlaylistById } from '@/controllers/playlistController';

const handler = nc()
	.get(verifyToken, getPlaylistById);


export default handler;