import Image from 'next/image';
import Link from 'next/link';

type Movie = {
	mal_id: number;
	title: string;
	type: string;
	images: {
		jpg: {
			image_url: string;
		};
	};
};

type MovieListProps = {
	movies: Movie[],
};

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

// Main Content
const MovieList = ({ movies }: MovieListProps) => {
	return (
		<div className='grid sm:grid-cols-8 grid-cols-2 gap-6 p-6'>
			{movies?.map((movie) => (
				<Link
					href={`/movie-detail/${movie.mal_id}`}
					key={movie.mal_id}
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
	);
};

export default MovieList;
