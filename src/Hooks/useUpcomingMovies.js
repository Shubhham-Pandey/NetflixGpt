import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUpComingMovies } from '../utils/movieSlice';
import { TMDB_API_OPTIONS } from '../utils/constants';

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const { upComingMovies } = useSelector((store) => store.movie);
  const getUpComingMovieList = async () => {
    const movie = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', TMDB_API_OPTIONS);
    const movieData = await movie.json();
    dispatch(addUpComingMovies(movieData?.results));
  }

  useEffect(() => {
    !upComingMovies && getUpComingMovieList();
  }, []);
}

export default useUpcomingMovies;