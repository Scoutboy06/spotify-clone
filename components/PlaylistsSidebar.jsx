import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import useUser from '@/hooks/useUser';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function PlaylistsSidebar() {
	const { user } = useUser();
	const { data, error } = useSWR('/api/user/playlists', fetcher);

	return (
		<aside className='bg-01dp h-full w-64 flex flex-col overflow-y-auto'>
			<div className='px-3 pt-3 pb-4 flex items-center'>
				<Image
					src={user.images[0].url}
					height={30}
					width={30}
					alt='Your profile'
					className='rounded-full'
				/>

				<p className='text-white ml-2'>{user.display_name}</p>
			</div>

			{data &&
				data.items.map(playlist => (
					<Link href={'/playlist/' + playlist.id} key={playlist.id}>
						<a className='text-gray-200 text-sm hover:text-white px-3 py-1 hover:bg-04dp cursor-pointer'>
							{playlist.name}
						</a>
					</Link>
				))}
		</aside>
	);
}
