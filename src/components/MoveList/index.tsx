import { StaticImport } from 'next/dist/shared/lib/get-img-props';
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
	movies: {
		data: Movie[];
	};
};

type ImageMovieProps = {
	movie: Movie;
};

const ImageMovie = ({ movie }: ImageMovieProps) => {
	let content = (<div></div>)
	if (movie && movie.images && movie.images.jpg) {
		content = (
			<Image
				src={movie.images.jpg.image_url}
				className='rounded-lg'
				width={400}
				height={100}
				alt={`${movie.mal_id}`}
			/>
		);
	}
	return content;
};



// Main Content
const MovieList = ({ movies }: MovieListProps) => {
	return (
		<div className='grid sm:grid-cols-5 grid-cols-2 sm:gap-0 gap-2 h-32'>
			{movies?.data?.map((movie) => (
				<Link
					href={`/movie-detail/${movie.mal_id}`}
					key={movie.mal_id}
					className='rounded-md text-center cursor-pointer p-4 mt-5'
				>
					<ImageMovie movie={movie} />
					<div className='my-4'>
						<h3>{movie.title}</h3>
						<span>{movie.type ?? 'Tidak ada Type'}</span>
					</div>
				</Link>
			))}
		</div>
	);
};

export default MovieList;
