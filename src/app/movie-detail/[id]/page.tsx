'use client'; // This directive makes the file a client component

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Modal from '@/components/Modal/index';
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
		<div className='p-10 bg-gray-100 min-h-screen'>
			<div className='mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
					<div className='relative cursor-pointer' onClick={() => setIsOpenModal(true)}>
						{movie && movie.data && (
							<Image
								src={movie.data.images.jpg.large_image_url}
								alt={movie.data.title}
								className='w-full h-[610px] object-cover rounded-md'
								width={700}
								height={610}
							/>
						)}
					</div>
					<div className='col-span-2 flex flex-col justify-between'>
						<div>
							<h1 className='text-3xl font-bold text-gray-900 mb-4'>
								{movie.data.title}
							</h1>
							<div className='mb-4'>
								<span className='text-xl font-semibold text-gray-700'>
									Type:
								</span>
								<span className='text-xl text-gray-800 ml-2'>
									{movie.data.type}
								</span>
							</div>
							<div className='mb-4'>
								<span className='text-xl font-semibold text-gray-700'>
									Episodes:
								</span>
								<span className='text-xl text-gray-800 ml-2'>
									{movie.data.episodes}
								</span>
							</div>
							<div>
								<span className='text-xl font-semibold text-gray-700'>
									Synopsis:
								</span>
								<p className='text-gray-800 mt-2'>
									{movie.data.synopsis}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={isOpenModal}
				nameMovie={movie.data.title}
				onClose={() => setIsOpenModal(false)}
				trailerUrl={movie.data.trailer.youtube_id}
			/>
		</div>
	);
};

export default MoviePage;
