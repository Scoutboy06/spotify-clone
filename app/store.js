import { configureStore } from '@reduxjs/toolkit';
import musicMetaSlice from '@/features/musicMeta/musicMetaSlice';
import playbackSlice from '@/features/playback/playbackSlice';
import authSlice from '@/features/auth/authSlice';

export default configureStore({
	reducer: {
		playback: playbackSlice,
		musicMeta: musicMetaSlice,
		auth: authSlice,
	},
});