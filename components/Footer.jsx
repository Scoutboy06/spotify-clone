/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	togglePlayback,
	toggleShuffleState,
	cycleRepeatState,
} from '@/features/musicMeta/musicMetaSlice';
import { togglePlay } from '@/features/playback/playbackSlice';

import SongProgressBar from '@/components/SongProgressBar';
import DeviceList from '@/components/DeviceList';

export default function Footer() {
	const {
		isPlaying,
		progress,
		songDuration,
		currentTrack,
		shuffle,
		repeat,
		volumePercent,
		hasInited,
	} = useSelector(state => state.musicMeta);
	const dispatch = useDispatch();

	const [showDeviceList, setDeviceListVisibility] = useState(false);

	return (
		<footer
			className='bg-02dp h-20 w-full flex items-center justify-between relative z-10'
			style={{ gridArea: 'now-playing-bar' }}
		>
			{/* Left */}
			<div className='flex flex-row h-full w-[30%] items-center'>
				<div className='h-14 w-14 bg-24dp ml-2 mt-1'>
					{currentTrack?.album && (
						<img src={currentTrack.album.images[1].url} alt='Album cover' />
					)}
				</div>
				<div className='flex flex-col justify-center ml-4'>
					<p className='text-white'>{currentTrack?.name}</p>
					<span className='text-gray-500 text-xs'>
						{currentTrack?.artists
							? currentTrack.artists.map(artist => artist.name).join(', ')
							: ''}
					</span>
				</div>
			</div>

			{/* Mid */}
			<div className='flex flex-row align-center text-2xl'>
				<button className='m-icon text-gray-300 hover:text-white'>
					skip_previous
				</button>
				<button
					className='m-icon mx-4 ring-2 ring-white rounded-full text-white h-8 w-8 active:scale-100 hover:scale-105 focus:scale-105'
					onClick={() => {
						window.player.togglePlay();
					}}
				>
					{isPlaying ? 'pause' : 'play_arrow'}
				</button>
				<button className='m-icon text-gray-300 hover:text-white'>
					skip_next
				</button>
			</div>

			{/* Right */}
			<div className='flex flex-row w-[30%] justify-end text-gray-400 text-xl'>
				<button
					className={
						'm-icon-round mr-4 ' +
						(repeat !== 'off' ? 'text-spotify-green' : 'hover:text-white')
					}
					onClick={() => dispatch(cycleRepeatState())}
				>
					{repeat !== 'track' ? 'repeat' : 'repeat_one'}
				</button>
				<button
					className={
						'm-icon-round mr-4 ' +
						(shuffle === 'on' ? 'text-spotify-green' : 'hover:text-white')
					}
					onClick={() => dispatch(toggleShuffleState())}
				>
					shuffle
				</button>
				<button className='m-icon-round hover:text-white mr-4'>
					volume_up
				</button>
				<div
					className='mr-6'
					// onFocus={() => setDeviceListVisibility(true)}
					// onBlur={() => setDeviceListVisibility(false)}
				>
					<button className='m-icon-round hover:text-white mr-6'>
						devices
					</button>
					{/* {showDeviceList && <DeviceList />} */}
					<DeviceList />
				</div>
			</div>

			<SongProgressBar />
		</footer>
	);
}
