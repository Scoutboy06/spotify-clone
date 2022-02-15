import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';

import NavSidebar from '@/components/NavSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
	const router = useRouter();
	const { isLoggedIn, isLoading } = useUser();

	// if (error) return <p>Failed to load</p>;
	// if (isLoading) return <p>Loading...</p>;
	// if (!isLoading && !isLoggedIn) {
	// 	router.push('/login');
	// 	return <p className='text-white'>Redirecting...</p>;
	// }
	useEffect(() => {
		if (!isLoading && !isLoggedIn) router.push('/login');
	}, [isLoggedIn, isLoading, router]);

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
			{!isLoading && isLoggedIn && (
				<>
					<NavSidebar />
					<Header />
					<main
						className='overflow-y-auto w-full relative pt-12'
						style={{ gridArea: 'main-view' }}
						aria-label='Main'
					>
						Main!
					</main>
					<Footer />
				</>
			)}
		</div>
	);
}
