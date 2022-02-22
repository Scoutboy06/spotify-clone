import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (...args) =>
	fetch(args)
		.then(res => res.json())
		.catch(console.error);

export default function DeviceList() {
	// const [devices, setDevices] = useState([]);
	const { data: devices, isLoading } = useSWR(
		'/api/me/player/devices',
		fetcher
	);
	const [activeDeviceId, setActiveDeviceId] = useState(null);

	const transferPlayback = deviceId => {
		fetch('/api/me/player', {
			body: JSON.stringify({ device_ids: [deviceId] }),
			method: 'PUT',
		})
			.then(() => setActiveDeviceId(deviceId))
			.catch(console.error);
	};

	return (
		<div className='absolute bottom-24 right-4 bg-08dp select-none'>
			{isLoading ? (
				<h1 className='text-xl'>isLoading...</h1>
			) : devices?.length > 0 ? (
				<>
					{/* <h1 className='text-white text-2xl mb-8 text-center'>Your devices</h1> */}

					{devices.map(device => (
						<div
							key={device.id}
							className={
								'w-full px-6 py-3 hover:bg-16dp flex flex-row ' +
								(device.id === activeDeviceId
									? 'text-spotify-green'
									: 'text-white')
							}
							onClick={() => transferPlayback(device.id)}
						>
							<div className='m-icon-round text-4xl mr-4'>
								{device.type.toLowerCase()}
							</div>
							<div className='flex flex-col content-center'>
								<p className='text-sm'>{device.name}</p>
								<p className='text-xs flex flex-row'>
									<span className='m-icon mr-1'>volume_up</span>
									Spotify Connect
									{/* {device.is_active ? 'This Web Browser' : 'Spotify Connect'} */}
								</p>
							</div>
						</div>
					))}
				</>
			) : (
				<h1 className='text-white'>No devices available</h1>
			)}
		</div>
	);
}
