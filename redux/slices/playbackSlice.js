import { createSlice } from '@reduxjs/toolkit';

export const playbackSlice = createSlice({
	name: 'playback',
	initialState: {
		progress: 1000 * 20, // int in milliseconds
		duration: 1000 * 90, // int in milliseconds
		isSeeking: false, // boolean
	},
	reducers: {
		seek: (state, action) => {
			state.progress = action.payload * state.duration;
		},
		setIsSeeking: (state, action) => {
			state.isSeeking = action.payload;
		},
	},
});

export const {
	seek,
	setIsSeeking,
} = playbackSlice.actions;

export default playbackSlice.reducer;