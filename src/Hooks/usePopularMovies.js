import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPopularMovies } from '../utils/movieSlice';
import { TMDB_API_OPTIONS } from '../utils/constants';

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const { popularMovies } = useSelector((store) => store.movie);
  const getPopularMovieList = async () => {
    const movie = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', TMDB_API_OPTIONS);
    const movieData = await movie.json();
    dispatch(addPopularMovies(movieData?.results));
  }

  useEffect(() => {
    !popularMovies && getPopularMovieList();
  }, []);
}

export default usePopularMovies;