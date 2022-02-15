import { createSlice } from '@reduxjs/toolkit';

export const musicMetaSlice = createSlice({
	name: 'musicMeta',
	initialState: {
		isPlaying: false,  // boolean
		songDuration: 1000 * 90,  // int in milliseconds
		currentSong: {
			name: 'Losing You',
			artists: ['Laura Brehm'],
		}, // object with song metadata
		shuffleState: 'on', // 'on', 'off'
		repeatState: 'track', // 'off', 'context', 'track'
		volumePercent: 80, // 0-100
	},
	reducers: {
		setPlayback: (state, action) => {
			state.isPlaying = action.payload.isPlaying;
		},
		togglePlayback: state => {
			state.isPlaying = !state.isPlaying;
		},

		toggleShuffleState: state => {
			state.shuffleState = (state.shuffleState === 'on' ? 'off' : 'on');
		},

		cycleRepeatState: state => {
			const v = state.repeatState;
			state.repeatState = (v === 'off' ? 'context' : v === 'context' ? 'track' : 'off')
		},
		setRepeatState: (state, action) => {
			state.repeatState = action.payload;
		},
	},
});

export const {
	setPlayback,
	togglePlayback,
	toggleShuffleState,
	cycleRepeatState,
	setRepeatState,
} = musicMetaSlice.actions;

export default musicMetaSlice.reducer;