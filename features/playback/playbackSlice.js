import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const togglePlay = async () => {
// 	await window.player.togglePlay();
// 	console.log('Toggled play');
// };

// export const seek = async (ms) => {
// 	await window.player.seek(ms);
// 	console.log('Seek completed');
// };

export const playbackSlice = createSlice({
	name: 'playback',
	initialState: {
		progress: 0, // milliseconds
		duration: 1000 * 30, // milliseconds
		isPlaying: false,
		isSeeking: false,
	},
	reducers: {
		seek: (state, action) => {
			state.progress = action.payload * state.duration;
		},
		updateProgress: (state, action) => {
			state.progress += action.payload;
		},
		setIsSeeking: (state, action) => {
			state.isSeeking = action.payload;
		},
		setProgress: (state, action) => {
			state.progress = action.payload;
		},
		setDuration: (state, action) => {
			state.duration = action.payload;
		},
		setIsPlaying: (state, action) => {
			state.isPlaying = action.payload;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(togglePlay.fulfilled, (state, action) => {
	// 			// state.isPlaying = !state.isPlaying;
	// 		})
	// },
});

export const {
	seek,
	updateProgress,
	setIsSeeking,
	setProgress,
	setDuration,
	setIsPlaying,
} = playbackSlice.actions;

export default playbackSlice.reducer;