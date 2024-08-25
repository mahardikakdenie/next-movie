'use client';
import { Movie } from '@/lib/movie-detai-types';
import Image from 'next/image';
import { useState } from 'react';
import Modal from '@/components/Modal/index';
import Link from 'next/link';
import dayjs from 'dayjs';

interface Props {
	movie: Movie;
	movieEpisodes?: any;
	openModal?: () => void;
}

const ImageMovie: React.FC<Props> = ({ movie, openModal }) => {
	return (
		movie && (
			<div className='relative cursor-pointer w-ful' onClick={openModal}>
				{movie && movie.data && (
					<Image
						src={movie.data.images.jpg.large_image_url}
						alt={movie.data.title}
						className='w-full h-[610px] object-cover rounded-md'
						width={1000}
						height={610}
					/>
				)}
			</div>
		)
	);
};

// const EpisodeSection: React.FC<Props> = ({}) => {};

const MovieDetail: React.FC<Props> = ({ movie, movieEpisodes }) => {
	const [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<div className='p-10 bg-gray-100 min-h-screen'>
			<div className='mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
					<div className='mx-auto bg-white shadow-lg rounded-lg overflow-hidden w-full'>
						<ImageMovie
							movie={movie}
							openModal={() => setIsOpenModal(true)}
						/>
					</div>
					<div className='col-span-2 flex flex-col justify-between'>
						{movie.data && movie && (
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
								{movie.data && movie.data.broadcast && (
									<div className='mb-4'>
										<span className='text-xl font-semibold text-gray-700'>
											Brodcast:
										</span>
										<span className='text-xl text-gray-800 ml-2'>
											{movie.data.broadcast.string}
										</span>
									</div>
								)}
								<div>
									<span className='text-xl font-semibold text-gray-700'>
										Synopsis:
									</span>
									<p className='text-gray-800 mt-2'>
										{movie.data.synopsis}
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
				{/* Episodes */}
				{movie.data.episodes > 1 && (
					<div className='p-6'>
						<div className='my-4'>
							<h3 className='text-2xl font-bold'>
								Episodes {movie.data.title}
							</h3>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
							{movieEpisodes?.map(
								(episode: any, index: number) => (
									<div
										key={index}
										className='bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
										<div className='p-4'>
											<h3 className='text-lg font-semibold text-gray-800 mb-2 truncate'>
												#{index + 1} {episode.title}
											</h3>
											<p className='text-sm text-gray-600'>
												Aired:{' '}
												{dayjs(episode.aired).format(
													'dddd, DD MMMM YYYY'
												)}
											</p>
											<p className='text-sm text-gray-600'>
												Score: {episode.score}
											</p>
											<p className='text-sm text-gray-600'>
												Forum Url:{' '}
												<Link
													href={episode.forum_url}
													target='_blank'
													className='underline text-indigo-600'>
													{episode.forum_url}
												</Link>
											</p>
											<p className='text-sm text-gray-600'>
												{episode.filler
													? 'Filler'
													: 'Canon'}
											</p>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				)}
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

export default MovieDetail;
