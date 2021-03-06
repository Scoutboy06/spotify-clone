import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import useUser from '@/hooks/useUser';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NavSidebar from '@/components/NavSidebar';
import PlaylistSong from '@/components/PlaylistSong';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function PlaylistView() {
	const router = useRouter();
	const { isLoggedIn, isLoading, error } = useUser();
	const { data: playlist } = useSWR(
		'/api/playlists/' + router.query.id,
		fetcher
	);

	if (error) return <p>Failed to load</p>;
	if (isLoading) return <p>Loading...</p>;
	if (!isLoading && !isLoggedIn) {
		router.push('/login');
		return <p className='text-white'>Redirecting...</p>;
	}

	return (
		<div
			className='w-screen h-screen overflow-hidden grid relative'
			style={{
				gridTemplateAreas: `
					"nav-bar main-view"
					"now-playing-bar now-playing-bar"`,
				gridTemplateColumns: 'auto 1fr',
				gridTemplateRows: '1fr auto',
			}}
		>
			<Head>
				<title>{playlist?.name || 'Loading...'}</title>
			</Head>
			<Header />

			<NavSidebar />
			<Footer />

			<main
				className='overflow-y-auto w-full relative pt-12'
				style={{ gridArea: 'main-view' }}
				aria-label='Main'
			>
				<header className='p-6 flex flex-row'>
					<div className='w-64 h-64 bg-03dp'>
						{playlist?.images && (
							<Image
								src={
									playlist?.images[0]?.url || 'https://via.placeholder.com/256'
								}
								alt='Cover art'
								width={256}
								height={256}
							/>
						)}
					</div>

					{playlist && (
						<div className='flex flex-col ml-4 h-full'>
							<h1 className='text-xs text-white font-semibold mb-2'>
								Playlist
							</h1>
							<h1 className='text-5xl text-white font-bold'>{playlist.name}</h1>
							<p className='text-sm text-gray-400 mt-3'>
								{playlist.description}
							</p>
						</div>
					)}
				</header>

				<section className='px-6 pb-4 grid'>
					<div
						className='text-gray-500 text-xs text-left grid gap-4 px-4 mb-2'
						style={{
							gridTemplateColumns: '24px 6fr 4fr 3fr minmax(120px, 1fr)',
						}}
					>
						<div>#</div>
						<div>TITLE</div>
						<div>ALBUM</div>
						<div>DATE ADDED</div>
						<div className='m-icon justify-self-end'>schedule</div>
					</div>
					{playlist?.tracks?.items &&
						playlist.tracks.items.map((song, index) => {
							if (song?.track)
								return (
									<PlaylistSong
										data={song.track}
										index={index}
										key={song?.track?.id || index}
									/>
								);
						})}
				</section>
			</main>
		</div>
	);
}
