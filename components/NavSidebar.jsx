import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function PlaylistsSidebar() {
	const { data } = useSWR('/api/me/playlists', fetcher);

	return (
		<nav
			className='bg-01dp h-full w-64 flex flex-col overflow-y-auto'
			style={{ gridArea: 'nav-bar' }}
		>
			<div className='py-8'></div>

			{data?.items &&
				data.items.map(playlist => (
					<Link href={'/playlist/' + playlist.id} key={playlist.id}>
						<a className='text-gray-200 text-sm hover:text-white px-3 py-1 hover:bg-04dp cursor-pointer'>
							{playlist.name}
						</a>
					</Link>
				))}
		</nav>
	);
}
