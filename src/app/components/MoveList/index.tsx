import Image from 'next/image';
import { Key } from 'react';

type MovieListProps = {
	movies: {
		data: Array<any>;
	};
};

const MovieList = ({ movies }: MovieListProps) => {
	return (
		<div className='grid grid-cols-3 gap-2 h-32 mx-auto'>
			{movies.data.map((movie: any | null | undefined) => (
				<div key={movie.mal_id} className='rounded-md text-center'>
					<div className='flex justify-center'>
						<Image
							src={movie.images.jpg.image_url}
							className='rounded-lg'
							width={600}
							height={400}
							alt={`${movie.mal_id}`}
						/>
					</div>
					<h3>{movie.title}</h3>
				</div>
			))}
		</div>
	);
};

export default MovieList;
