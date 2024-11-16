import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TMDB_API_OPTIONS } from '../utils/constants';
import { addTrailerMeta } from '../utils/movieSlice';

const useTrailerVideoMeta = (movieId) => {
    const dispatch = useDispatch();

    const { trailerVideoMeta } = useSelector((state) => state.movie); 
    const getMovieTrailerById = async () => {
        const movieTrailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, TMDB_API_OPTIONS);
        const movieTrailerData = await movieTrailerResponse.json();

        const filterTrailer = movieTrailerData.results.find((item) => {
            return item.type === "Trailer"
        });
        dispatch(addTrailerMeta(filterTrailer));
    }

    useEffect(() => {
        !trailerVideoMeta && getMovieTrailerById(); 
    }, []);
}

export default useTrailerVideoMeta