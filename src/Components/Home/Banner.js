import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {imageUrl } from '../../Constants/Constants';
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { useRecoilState } from 'recoil'
import {modalState,movieState} from '../../Atoms/ModalAtom'


function Banner({url}) {

  const [movie, setMovies] = useState(null);
  const [showModal,setShowModal] = useRecoilState(modalState)
  const [currentMovie,setCurrentMovie] = useRecoilState(movieState) 

  useEffect(() => {
    axios.get(url).then((res) => {
      if (res.data.results && res.data.results.length > 0) {
        setMovies(res.data.results[Math.floor(Math.random() * res.data.results.length)]);
      } else {
        console.error("No movies found in response");
      }
    });
  }, [url]);


    return (
      <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
 
        <div className="absolute top-0 -z-10 left-0 h-[95vh] w-screen">
          <img src={`${imageUrl}${movie?.backdrop_path || movie?.poster_path}`}  alt="" layout='fill'/>
        </div>

              <h1 className='text-2xl font-bold md:text-4xl lg:text-7xl'>
                {movie?.original_title || movie?.original_name}
              </h1>
              <p className="text-shadow-md max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                {movie?.overview}
              </p>
              <div className="flex space-x-3">
                <button className="bannerButton bg-white text-black"
                  onClick={() => {
                    setCurrentMovie(movie)
                    setShowModal(true)
                  }}>
                  <FaPlay className='h-4 w-4 text-black md:h-7 md:w-7'/>
                  Play
                </button>
                <button
                  className="bannerButton bg-[gray]/70"
                >
                  More Info <IoIosInformationCircle className='h-5 w-5 md:h-8 md:w-8'/>
                </button>
              </div>
    

      </div>  
      );
}

export default Banner
