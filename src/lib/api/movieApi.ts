import client from '../http-client';
import { AxiosResponse, AxiosError } from 'axios';

export const getData = (
    params: Record<string, any>,
    callback: (response: AxiosResponse) => void,
    err: (error: AxiosError) => void
): void => {
    client.get('/top/anime', { params })
        .then((res: AxiosResponse) => {
            callback(res);
        })
        .catch((e: AxiosError) => {
            err(e);
        });
};
