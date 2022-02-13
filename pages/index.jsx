import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import PlaylistsSidebar from '@/components/PlaylistsSidebar';

export default function Home() {
	const router = useRouter();
	const { isLoggedIn, isLoading, error } = useUser();

	if (error) return <p>Failed to load</p>;
	if (isLoading) return <p>Loading...</p>;
	if (!isLoading && !isLoggedIn) {
		router.push('/login');
		return <p className='text-white'>Redirecting...</p>;
	}

	return (
		<div className='w-screen h-screen overflow-hidden'>
			<PlaylistsSidebar />
		</div>
	);
}
