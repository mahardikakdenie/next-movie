'use client'; // This directive makes the file a client component

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Modal from '@/components/Modal/index';
import MovieDetail from '@/components/MovieDetail';
import { Movie } from '@/lib/movie-detai-types';
import { getMovieEpisodes } from '@/lib/api/movieEpisodesApi';
import { AxiosError, AxiosResponse } from 'axios';

const MoviePage = () => {
	const router = useRouter();
	const params = useParams();
	const { id } = params as { id: string };
	const [movie, setMovie] = useState<Movie | null>(null);
	const [movieEpisodes, setMovieEpisodes] = useState<any>([]);

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

		const getDataMovieEpisodes = () => {
			const callback = (res: AxiosResponse) => {
				const data = res?.data;
				setMovieEpisodes(data.data);
			};
			const err = (e: AxiosError) => {
				console.log(e);
			};
			getMovieEpisodes(id, callback, err);
		};

		fetchMovie();
		getDataMovieEpisodes();
	}, [id]);

	if (!movie) {
		return <div className='loader' />;
	}

	return (
		<MovieDetail movie={movie} movieEpisodes={movieEpisodes} />
	);
};

export default MoviePage;
