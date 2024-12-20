import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTopRatedMovies } from '../utils/movieSlice';
import { TMDB_API_OPTIONS } from '../utils/constants';

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const { topRatedMovies } = useSelector((store) => store.movie);
  const getTopRatedMovieList = async () => {
    const movie = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', TMDB_API_OPTIONS);
    const movieData = await movie.json();
    console.log("top rated",movieData?.results);
    dispatch(addTopRatedMovies(movieData?.results));
  }

  useEffect(() => {
    !topRatedMovies && getTopRatedMovieList();
  }, []);
}

export default useTopRatedMovies;