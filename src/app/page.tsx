'use client';

import { useState, useEffect } from 'react';
import MovieList from '@/components/MovieList/index';
import { getData } from '@/lib/api/movieApi';
import { AxiosResponse, AxiosError } from 'axios';

const Home = () => {
	const [isLoading, setIsLoading] = useState<Boolean>(true);
	const [movies, setMovies] = useState<any>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		const fetchMovies = () => {
			setIsLoading(true);
			const params = {
				limit: 16,
				page,
			};

			const callback = (res: AxiosResponse) => {
				setIsLoading(false);
				const data = res?.data?.data ?? [];
				console.log('page -> ', page);

				if (page === 1) {
					setMovies(data); // Jika page 1, set data baru
				} else {
					setMovies((prevMovies: any) => [...prevMovies, ...data]); // Jika page > 1, gabungkan data baru dengan data sebelumnya
				}
			};

			const err = (e: AxiosError) => {
				console.error(e);
				setIsLoading(false);
			};

			getData(params, callback, err);
		};

		fetchMovies();
	}, [page]);

	const loadMore = () => {
		setPage((previus) => previus + 1);
		console.log('page -> ', page);
	};

	if (isLoading && page === 1) {
		return <div className='loader' />;
	}

	return (
		<div className='p-10'>
			<h1 className='text-4xl mb-4 font-bold text-center sm:text-start'>
				Paling Populer
			</h1>
			<MovieList movies={movies} />

      {
        isLoading && page > 1 && (
          <div className='loader' />
        )
      }

			{!isLoading && movies.length > 0 && (
				<div className='my-6 flex justify-center'>
					<button
						className='px-5 py-2 border rounded hover:bg-indigo-200 hover:text-indigo-500'
						onClick={() => loadMore()}>
						Load More
					</button>
				</div>
			)}
		</div>
	);
};

export default Home;
