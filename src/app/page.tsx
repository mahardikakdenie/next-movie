import MovieList from "@/app/components/MoveList/index";

// eslint-disable-next-line @next/next/no-async-client-component
const Home = async () => {

  const responses = await fetch(`${process.env.NEXT_BASE_API_URL}/seasons/upcoming`);

  const movies: any = await responses.json();

  console.log('movies => ', movies.data);

  return (
    <div>
      <h1 className="text-2xl">Paling Populer</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
