import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';

import NavSidebar from '@/components/NavSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
		<div className='w-screen h-screen overflow-hidden grid grid-cols-root'>
			<NavSidebar />
			<div className=''>
				<Header />
				<main className='text-white'>Main!</main>
			</div>
			<Footer />
		</div>
	);
}
