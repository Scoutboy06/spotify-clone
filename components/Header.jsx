import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useUser from '@/hooks/useUser';
import SearchBar from '@/components/SearchBar';

export default function Header() {
	const { user } = useUser();
	const router = useRouter();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const mainEl = document.querySelector('[aria-label=Main]');
		// setIsScrolled(mainEl.scrollTop > 0);

		const scrollListener = mainEl.addEventListener('scroll', () => {
			if (scrollListener) mainEl.removeEventListener(scrollListener);

			const y = mainEl.scrollTop;

			if (y > 18) setIsScrolled(true);
			else setIsScrolled(false);
		});

		return () => {
			mainEl.removeEventListener('scroll', scrollListener);
		};
	}, []);

	return (
		<header
			className={
				'w-full h-14 top-0 flex flex-row items-center absolute pl-4 pr-6 justify-between z-10 transition-colors' +
				(isScrolled ? ' bg-00dp bg-opacity-80 backdrop-blur-sm' : '')
			}
			style={{ gridArea: 'main-view' }}
		>
			<div className='flex items-center'>
				<button
					className='bg-black text-white rounded-full w-8 h-8 text-2xl'
					onClick={() => window.history.back()}
				>
					<span className='m-icon'>chevron_left</span>
				</button>
				<button
					className='bg-black text-white rounded-full w-8 h-8 text-2xl mx-2'
					onClick={() => window.history.forward()}
				>
					<span className='m-icon'>chevron_right</span>
				</button>
				<SearchBar />
			</div>
			<div>
				<div className='flex items-center cursor-pointer'>
					<Image
						src={user.images[0].url}
						alt='Profile'
						width={32}
						height={32}
						className='rounded-full'
						draggable={false}
					/>
					<span className='m-icon text-white text-xl'>arrow_drop_down</span>
				</div>
			</div>
		</header>
	);
}
