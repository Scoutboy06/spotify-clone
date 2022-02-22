import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const musicMetaSlice = createSlice({
	name: 'musicMeta',
	initialState: {
		isPlaying: false, // boolean
		currentTrack: {}, // object with song metadata
		shuffle: 'off', // 'on', 'off'
		repeat: 'off', // 'off', 'context', 'track'
		volumePercent: 100, // 0-100
		device: null,
	},
	reducers: {
		setState: (state, action) => {
			state[action.payload[0]] = action.payload[1];
		},
		setBulkStates: (state, { payload }) => {
			for (const key of Object.keys(payload)) {
				state[key] = payload[key];
			}
		},
		setPlayback: (state, action) => {
			state.isPlaying = action.payload;
		},
		togglePlayback: state => {
			state.isPlaying = !state.isPlaying;
		},
		toggleShuffleState: state => {
			state.shuffleState = (state.shuffleState === 'on' ? 'off' : 'on');
		},
		setShuffleState: (state, action) => {
			state.shuffleState = action.payload;
		},
		cycleRepeatState: state => {
			const v = state.repeatState;
			state.repeatState = (v === 'off' ? 'context' : v === 'context' ? 'track' : 'off')
		},
		setRepeatState: (state, action) => {
			state.repeatState = action.payload;
		},
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload;
		},
		setHasInited: (state, action) => {
			state.hasInited = action?.payload || true;
		},
	},
});

export const {
	setState,
	setBulkStates,
	setPlayback,
	togglePlayback,
	toggleShuffleState,
	setShuffleState,
	cycleRepeatState,
	setRepeatState,
	setCurrentTrack,
	setHasInited,
} = musicMetaSlice.actions;

export default musicMetaSlice.reducer;