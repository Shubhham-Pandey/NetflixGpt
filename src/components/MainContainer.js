import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

const MainContainer = () => {
    const { nowPlayingMovies } = useSelector((state) => state.movie);
    if(!nowPlayingMovies) return;
    const { original_title, overview, id } = nowPlayingMovies[0]
    return (
        <div>
            <VideoTitle title={original_title} description={overview}/>
            <VideoBackground movieId={id}/>
        </div>
    )
}

export default MainContainer