import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		isSuccess: false,
		isLoading: true,
		isError: false,
		message: '',
	},
	reducers: {
		reset: (state) => {
			state.user = null;
			state.isSuccess = false;
			state.isLoading = true;
			state.isError = false;
			state.message = '';
		},
	},
	extraReducers: {}
});

export const {
	reset,
	init,
} = authSlice.actions;

export default authSlice.reducer;