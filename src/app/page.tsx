import MovieList from "@/app/components/MoveList/index";

// eslint-disable-next-line @next/next/no-async-client-component
const Home = async () => {

  const responses = await fetch(`${process.env.NEXT_BASE_API_URL}/seasons/upcoming?limit=10`);

  const movies: any = await responses.json();

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-4 font-bold text-center sm:text-start">Paling Populer</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
