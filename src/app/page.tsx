'use client';

import { useState, useEffect } from 'react';
import MovieList from "@/components/MovieList/index";
import { getData } from "@/lib/api/movieApi";

const Home = () => {
  const [movies, setMovies] = useState<any>([]);

  useEffect(() => {
    const fetchData = () => {
      const callback = (res: any) => {
        setMovies(res.data);
      };
      
      const err = (e: any) => {
        console.error(e);
      };

      getData({ limit: 15 }, callback, err);
    };

    fetchData();
  }, []);

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
