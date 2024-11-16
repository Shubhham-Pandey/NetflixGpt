import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';
import { TMDB_API_OPTIONS } from '../utils/constants';

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const { nowPlayingMovies } = useSelector((store) => store.movie);
  const getNowPlayingMovieList = async () => {
    const movie = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', TMDB_API_OPTIONS);
    const movieData = await movie.json();
    dispatch(addNowPlayingMovies(movieData?.results));
  }

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovieList();
  }, []);
}

export default useNowPlayingMovies;