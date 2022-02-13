import Image from 'next/image';

export default function PlaylistSong({ data: track, index }) {
	// const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div
			className='w-full focus:bg-06dp hover:bg-02dp px-4 h-10 rounded-md grid gap-4 text-gray-300'
			style={{ gridTemplateColumns: '24px 6fr 4fr 3fr minmax(120px, 1fr)' }}
		>
			<div className='text-gray-400 flex items-center text-sm'>
				{/* <button onClick={() => {}} className='mr-4'>
					<Icon name='play_arrow' fill='#fff' size={18} />
					<span className='m-icon text-white'>play_arrow</span>
				</button> */}
				{index + 1}
			</div>
			<div className='flex flex-col justify-center'>
				<p className='text-xs text-white whitespace-nowrap overflow-hidden overflow-ellipsis'>
					{track.name}
				</p>
				<span className='text-xxs text-gray-400 whitespace-nowrap overflow-hidden overflow-ellipsis'>
					{track.artists.map(artist => artist.name).join(', ')}
				</span>
			</div>
			<div className='text-xs flex items-center text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
				{track.album.name}
			</div>
			<div className='text-xs flex items-center text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
				1 week
			</div>
			<div className='text-xs flex items-center justify-self-end'>
				{parseDuration(track.duration_ms)}
			</div>
		</div>
	);
}

function parseDuration(ms) {
	const hours = Math.floor(ms / 1000 / 60 / 60);
	const minutes = Math.floor(ms / 1000 / 60) - 60 * hours;
	const seconds = Math.floor(ms / 1000) - 60 * hours - 60 * minutes;

	return `${hours > 0 ? hours + ':' : ''}${minutes}:${doubleDigit(seconds)}`;
}

function doubleDigit(n) {
	if (n < 10) return '0' + n;
	return n;
}

function parseDateAdded(date) {
	return '14 days ago';
}
