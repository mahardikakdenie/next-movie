'use client';

import { getMovieSearch } from '@/lib/api/movieApi';
import { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MovieList from '@/components/MovieList';
import Link from 'next/link';
import Image from 'next/image';

interface Movie {
	type: string;
	images: any;
	mal_id: number;
	title: string;
	url: string;
	// Add other properties you want to display
}

type ImageMovieProps = {
	movie: Movie;
};

const ImageMovie = ({ movie }: ImageMovieProps) => {
	if (!movie || !movie.images || !movie.images.jpg) {
		return <div className='bg-gray-200 rounded-lg w-full h-[300px]'></div>;
	}

	return (
		<Image
			src={movie?.images?.jpg?.image_url}
			className='rounded-lg w-full object-cover transition-transform duration-300 transform hover:scale-105'
			width={200}
			height={300}
			alt={movie.title}
			placeholder='blur'
			blurDataURL={movie.images.jpg.image_url}
		/>
	);
};

const Page = () => {
	const { search }: { search: string } = useParams();
	const [movies, setMovies] = useState<Array<Movie>>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [page, setPage] = useState<Number>(1);

	useEffect(() => {
		document.title = `Search movie with keyword : ${search}`;
		const getSearch = () => {
			setIsLoading(true);
			const params = {
				q: search,
				limit: 16,
				page,
			};
			const callback = (res: AxiosResponse) => {
				const data = res?.data;
				setMovies(data.data);
				setIsLoading(false);
			};

			const err = (e: AxiosError) => {
				console.log(e);
			};

			getMovieSearch(params, callback, err);
		};

		getSearch();
	}, [search, page]);

	return (
		<div>
			<div className='mt-6 px-4'>
				<div className='border p-3 w-full text-center rounded-md'>
					<span className='text-sm'>Search movie with keyword : <b>{search}</b></span>
				</div>
				<div className='text-center mt-4'>
					{ !isLoading && movies.length === 0 && (
						<b>No Movie with this keyword</b>
					)}
				</div>
			</div>
			{isLoading && (
				<div className='loader'></div>
			)}
			<div className='grid sm:grid-cols-8 grid-cols-2 gap-6 p-6'>
				{ !isLoading && movies?.map((movie, index) => (
					<Link
						href={`/movie-detail/${movie.mal_id}`}
						key={index}
						className='relative group rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-300 hover:shadow-2xl hover:scale-105'>
						<ImageMovie movie={movie} />
						<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 transition-opacity duration-300 opacity-100 group-hover:opacity-100'>
							<h3 className='text-white text-lg font-bold truncate'>
								{movie.title}
							</h3>
							<span className='text-sm text-gray-200'>
								{movie.type ?? 'Unknown Type'}
							</span>
						</div>
					</Link>
				))}
			</div>
			{!isLoading && movies.length > 0 && (
				<div className='my-6 flex justify-center'>
					<button className='px-5 py-2 border rounded hover:bg-indigo-200 hover:text-indigo-500'>
						Load More
					</button>
				</div>
			)}
		</div>
	);
};

export default Page;
