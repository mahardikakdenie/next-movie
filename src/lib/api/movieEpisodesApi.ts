import { AxiosError, AxiosResponse } from 'axios';
import client from '../http-client';

export const getMovieEpisodes = (
    movie_id: string,
	callback: (response: AxiosResponse) => void,
	err: (error: AxiosError) => void
): void => {
    const url = `anime/${movie_id}/episodes`;
	client
		.get(url)
		.then((res: AxiosResponse) => {
			callback(res);
		})
		.catch((e: AxiosError) => {
			err(e);
		});
};
