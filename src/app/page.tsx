'use client';

import { useState, useEffect } from 'react';
import MovieList from "@/components/MovieList/index";
import { getData } from "@/lib/api/movieApi";
import { AxiosResponse, AxiosError } from 'axios';

const Home = () => {
  const [movies, setMovies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      const callback = (res: AxiosResponse) => {
        setIsLoading(false);
        setMovies(res.data);
      };
      
      const err = (e: AxiosError) => {
        console.error(e);
      };

      getData({ limit: 15 }, callback, err);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className='loader' />;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-4 font-bold text-center sm:text-start">
        Paling Populer
      </h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
