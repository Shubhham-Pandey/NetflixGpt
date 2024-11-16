import React from 'react'
import { FaPlay } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";

const VideoTitle = ({title, description}) => {
    return (
        <div className="absolute aspect-video pt-[20%] px-10 text-white bg-gradient-to-r from-black">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-lg w-1/2">{description}</p>     
            <div className="flex pt-5">
                <button className="flex bg-white p-3 px-10 text-black rounded-lg hover:bg-opacity-75">
                <span className='pt-[4px] mx-[3px]'><FaPlay /></span> Play
                </button>
                <button className="flex bg-gray-500 p-3 px-10 mx-2 text-white bg-opacity-50 rounded-lg">
                <span className='pt-[4px] mx-[3px]'><FaInfo /></span>More Info
                </button>
            </div>
        </div>
    )
}

export default VideoTitle