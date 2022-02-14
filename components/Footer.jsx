import { useRouter } from 'next/router';

export default function Header() {
	const router = useRouter();

	return (
		<footer className='bg-03dp z-10 w-screen h-16 opacity-70 backdrop-blur-sm fixed bottom-0'></footer>
	);
}
