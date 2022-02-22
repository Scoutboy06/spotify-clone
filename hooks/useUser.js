import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());


export default function useUser() {
	const { data, error, mutate } = useSWR('/api/me', fetcher);

	return {
		isLoading: !error && !data,
		isLoggedIn: !error && data && !data?.error,
		user: data,
		error,
		mutate,
	};
}