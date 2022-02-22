import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setState,
	setBulkStates,
	setPlayback,
	togglePlayback,
	toggleShuffleState,
	setShuffleState,
	cycleRepeatState,
	setRepeatState,
	setCurrentTrack,
} from '@/features/musicMeta/musicMetaSlice';
import {
	seek,
	updateProgress,
	setIsSeeking,
	setProgress,
	setDuration,
	setIsPlaying as setIsPlaying_Playback,
} from '@/features/playback/playbackSlice';

export default function WebPlayback() {
	const { isSeeking } = useSelector(state => state.playback);
	const { isPlaying } = useSelector(state => state.musicMeta);
	const dispatch = useDispatch();
	const interval = useRef();

	useEffect(() => {
		if ((isSeeking || !isPlaying) && interval.current) {
			clearInterval(interval.current);
			interval.current = null;
		} else if (!isSeeking && !interval.current && isPlaying) {
			interval.current = setInterval(() => {
				dispatch(updateProgress(1000));
			}, 1000);
		}
	}, [isSeeking, interval, isPlaying]);

	useEffect(() => {
		async function initSpotifyPlayer() {
			if (window.player) return;

			const script = document.createElement('script');
			script.src = 'https://sdk.scdn.co/spotify-player.js';
			script.id = 'SpotifyPlaybackSDK';
			script.async = true;

			document.body.appendChild(script);

			window.onSpotifyWebPlaybackSDKReady = () => {
				console.log('onSpotifyWebPlaybackSDKReady');
				const player = new window.Spotify.Player({
					name: 'Web Playback SDK',
					getOAuthToken: cb => {
						fetch('/api/auth/token')
							.then(res => res.text())
							.then(cb)
							.catch(console.error);
					},
					volume: 1,
				});

				player.addListener('ready', async ({ device_id }) => {
					console.log('Ready with Device ID', device_id);
					// player.getCurrentState().then(stateUpdate);
					const state = await fetch('/api/me/player')
						.then(res => res.json())
						.catch(console.error);

					console.log(state);
					if (!state) return;

					dispatch(
						setBulkStates({
							currentTrack: state.item,
							isPlaying: state.is_playing,
							shuffle: state.shuffle_state ? 'on' : 'off',
							repeat: state.repeat_state,
							volumePercent: state.device.volume_percent,
							device: state.device,
						})
					);

					dispatch(setProgress(state.progress_ms));
					dispatch(setDuration(state.item.duration_ms));
				});

				player.addListener('not_ready', ({ device_id }) => {
					console.log('Device ID has gone offline', device_id);
				});

				player.addListener('player_state_changed', stateUpdate);

				player.connect();

				window.player = player;
			};
		}

		function stateUpdate(state) {
			if (!state) return;

			console.log(state);

			dispatch(
				setBulkStates({
					shuffle: state.shuffle ? 'on' : 'off',
					repeat: ['off', 'context', 'track'][state.repeat_mode],
					isPlaying: !state.paused,
					currentTrack: state.track_window.current_track,
				})
			);

			dispatch(setDuration(state.duration));
			dispatch(setProgress(state.position));
			dispatch(setIsPlaying_Playback(!state.paused));
		}

		initSpotifyPlayer();
	}, []);

	return null;
}
