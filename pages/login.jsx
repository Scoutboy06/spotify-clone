export default function Login() {
	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center fixed'>
			<h1 className='text-3xl text-white'>You need to log in</h1>
			<p className='my-3 text-white'>
				This site required you to sign in to Spotify to work
			</p>
			{/*eslint-disable-next-line @next/next/no-html-link-for-pages*/}
			<a href='/api/login'>
				<button className='bg-spotify-green p-2 rounded transition-colors hover:bg-[#16a34a]'>
					Log in to Spotify
				</button>
			</a>
		</div>
	);
}
