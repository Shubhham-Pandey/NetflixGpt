import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const { nowPlayingMovies, popularMovies, topRatedMovies, upComingMovies } = useSelector((state) => state.movie);
    if(!nowPlayingMovies && !popularMovies && !topRatedMovies && !upComingMovies) return;
    return (
        <div className="bg-black">
            <div className=" mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
                <MovieList title={"Now Playing"} movies={nowPlayingMovies}/>
                <MovieList title={"Top Rated"} movies={topRatedMovies}/>
                <MovieList title={"Popular Movies"} movies={popularMovies}/>
                <MovieList title={"Up Coming"} movies={upComingMovies}/>
            </div>
        </div>    
    )
}

export default SecondaryContainer