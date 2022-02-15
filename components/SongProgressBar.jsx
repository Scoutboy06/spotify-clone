import { useSelector, useDispatch } from 'react-redux';
import { seek, setIsSeeking } from '@/redux/slices/playbackSlice';

export default function SongProgressBar() {
	const { progress, duration } = useSelector(state => state.playback);
	const dispatch = useDispatch();

	const handleMouseDown = e => {
		dispatch(setIsSeeking(true));

		const percent =
			Math.min(Math.max(e.pageX, 0), window.innerWidth) / window.innerWidth;
		dispatch(seek(percent));

		window.addEventListener('mousemove', mouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};

	const handleMouseUp = () => {
		dispatch(setIsSeeking(false));
		window.removeEventListener('mousemove', mouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	};

	const mouseMove = e => {
		e.preventDefault();
		const percent =
			Math.min(Math.max(e.pageX, 0), window.innerWidth) / window.innerWidth;
		dispatch(seek(percent));
	};

	return (
		<div
			className='absolute top-0 w-full h-3 cursor-pointer group'
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			<div className='w-full bg-06dp absolute top-0'>
				<div
					className='h-1 bg-spotify-green'
					style={{ width: `calc(100vw * ${progress / duration})` }}
				></div>
			</div>
			<div
				className='w-3 h-3 bg-white rounded-full absolute -top-1 -translate-x-1.5 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity'
				style={{ left: `calc(100vw * ${progress / duration})` }}
			></div>
		</div>
	);
}
