import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
	const router = useRouter();
	const [value, setValue] = useState('');

	return (
		<div className='h-8 w-96 bg-06dp bg-opacity-60 pl-2 rounded-full flex flex-row items-center'>
			<span className='m-icon text-gray-400 text-xl select-none mr-1'>
				search
			</span>
			<input
				type='text'
				className='h-full w-full bg-transparent outline-none text-gray-200 text-sm'
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder='Search'
			/>
		</div>
	);
}
