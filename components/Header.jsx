import { useRouter } from 'next/router';
import Image from 'next/image';
import useUser from '@/hooks/useUser';
import SearchBar from '@/components/SearchBar';

export default function Header() {
	const { user } = useUser();
	const router = useRouter();

	return (
		<header className='w-full h-14 top-0 flex flex-row items-center sticky px-6 justify-between z-10'>
			<div className='flex items-center'>
				<button className='bg-black text-white rounded-full w-8 h-8 text-2xl'>
					<span className='m-icon'>chevron_left</span>
				</button>
				<button className='bg-black text-white rounded-full w-8 h-8 text-2xl mx-2'>
					<span className='m-icon'>chevron_right</span>
				</button>
				<SearchBar />
			</div>
			<div>
				<div className='flex items-center cursor-pointer'>
					<Image
						src={user?.images[0]?.url}
						alt='Profile'
						width={32}
						height={32}
						className='rounded-full'
						draggable={false}
					/>
					{/* <span className='m-icon text-white'>arrow_drop_down</span> */}
				</div>
			</div>
		</header>
	);
}
