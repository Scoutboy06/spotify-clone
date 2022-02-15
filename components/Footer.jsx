// import usePlayback from '@/hooks/usePlayback';
import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setPlayback,
	togglePlayback,
	toggleShuffleState,
	cycleRepeatState,
	setRepeatState,
	// seek,
} from '@/redux/slices/musicMetaSlice';

import SongProgressBar from '@/components/SongProgressBar';

export default function Footer() {
	const {
		isPlaying,
		progress,
		songDuration,
		currentSong,
		shuffleState,
		repeatState,
		volumePercent,
	} = useSelector(state => state.musicMeta);
	const dispatch = useDispatch();

	return (
		<footer
			className='bg-02dp h-20 w-full flex items-center justify-between relative z-10'
			style={{ gridArea: 'now-playing-bar' }}
		>
			{/* Left */}
			<div className='flex flex-row h-full w-[30%]'>
				<div className='h-20 w-20 bg-24dp'></div>
				<div className='flex flex-col justify-center ml-4'>
					<p className='text-white'>{currentSong.name}</p>
					<span className='text-gray-500 text-xs'>
						{currentSong.artists.join(', ')}
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
					onClick={() => dispatch(togglePlayback())}
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
						(repeatState !== 'off' ? 'text-spotify-green' : 'hover:text-white')
					}
					onClick={() => dispatch(cycleRepeatState())}
				>
					{repeatState !== 'track' ? 'repeat' : 'repeat_one'}
				</button>
				<button
					className={
						'm-icon-round mr-4 ' +
						(shuffleState === 'on' ? 'text-spotify-green' : 'hover:text-white')
					}
					onClick={() => dispatch(toggleShuffleState())}
				>
					shuffle
				</button>
				<button className='m-icon-round hover:text-white mr-4'>
					volume_up
				</button>
				<button className='m-icon-round hover:text-white mr-6'>devices</button>
			</div>

			<SongProgressBar />
		</footer>
	);
}
