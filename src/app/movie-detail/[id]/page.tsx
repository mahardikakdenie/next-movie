import { Metadata } from 'next';

import Image from 'next/image';
import { Movie } from '@/lib/movie-detai-types';

// Define types for the params and movie objects
type Params = {
	id: string;
};

type Images = {
	jpg: {
		image_url: string;
		small_image_url: string;
		large_image_url: string;
	};
};

// Define the type for the metadata function argument
export async function generateMetadata({
	params,
}: {
	params: Params;
}): Promise<Metadata> {
	const { id } = params;

	// Fetch the data server-side
	const response = await fetch(
		`${process.env.NEXT_BASE_API_URL}/anime/${id}`
	);
	const movie: Movie = await response.json();

	return {
		title: movie.data.title,
		openGraph: {
			title: movie?.data?.title,
			images: [
				{
					url: movie.data.images.jpg.large_image_url, // Use the URL for large image
					width: 1200, // Set the width of the image
					height: 630, // Set the height of the image
				},
			],
		},
	};
}

// Define the type for the page component argument
const MoviePage = async ({ params }: { params: Params }) => {
	const { id } = params;

	// Fetch the data server-side
	const response = await fetch(
		`${process.env.NEXT_BASE_API_URL}/anime/${id}`
	);
	const movie: Movie = await response.json();

	return (
		<div className='p-10 bg-gray-100 min-h-screen'>
			<div className='mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
					<div className='relative'>
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
		</div>
	);
};

export default MoviePage;
