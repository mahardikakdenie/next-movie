'use client'; // This directive makes the file a client component

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Modal from '@/components/Modal/index';
import MovieDetail from '@/components/MovieDetail';
import { Movie } from '@/lib/movie-detai-types';

const MoviePage = () => {
	const router = useRouter();
	const params = useParams();
	const { id } = params as { id: string };
	const [movie, setMovie] = useState<Movie | null>(null);
	const [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		if (!id) return;

		const fetchMovie = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_API_URL}/anime/${id}`
				);
				const movieData: Movie = await response.json();


				// Update document title dynamically
				if (movieData?.data?.title) {
					document.title = movieData.data.title;
				}
				
				setMovie(movieData);
			} catch (error) {
				console.error('Failed to fetch movie data:', error);
			}
		};

		fetchMovie();
	}, [id]);

	if (!movie) {
		return <div>Loading...</div>;
	}

	return (
		<MovieDetail movie={movie} />
	);
};

export default MoviePage;
