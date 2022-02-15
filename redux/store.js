import { configureStore } from '@reduxjs/toolkit';
import musicMetaSlice from '@/redux/slices/musicMetaSlice';
import playbackSlice from '@/redux/slices/playbackSlice';

export default configureStore({
	reducer: {
		playback: playbackSlice,
		musicMeta: musicMetaSlice,
	},
});