import Image from 'next/image';
import Link from 'next/link';
import { Key } from 'react';

type MovieListProps = {
	movies: {
		data: Array<any>;
	};
};

const MovieList = ({ movies }: MovieListProps) => {
	return (
		<div className='grid sm:grid-cols-5 grid-cols-2 sm:gap-0 gap-2 h-32'>
			{movies?.data?.map((movie: any | null | undefined) => (
				<Link href={`/movie-detail/${movie?.mal_id}`} key={movie.mal_id} className='rounded-md text-center cursor-pointer p-4'>
					<div className='flex justify-center items-center h-full'>
						<Image
							src={movie.images.jpg.image_url}
							className='rounded-lg'
							width={400}
							height={100}
							alt={`${movie.mal_id}`}
						/>
					</div>
					<h3>{movie.title}</h3>
                    <span>{movie.type ?? 'Tidak ada Type'}</span>
				</Link>
			))}
		</div>
	);
};

export default MovieList;
