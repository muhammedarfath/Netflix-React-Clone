import React from 'react'
import { imageUrl } from '../../Constants/Constants';
import { useRecoilValue,useRecoilState } from 'recoil'
import {modalState,movieState} from '../../Atoms/ModalAtom'

function Thumbnail({movie}) {
    
    const [showModal,setShowModal] = useRecoilState(modalState)
    const [currentMovie,setCurrentMovie] = useRecoilState(movieState) 

    return (
        <div className='relative h-28 min-w-[180px]
          cursor-pointer transition duration-200
          ease-out md:h-36 md:min-w-(260px) md:hover:scale-105'
             onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}>
          <img src={`${imageUrl}${movie?.backdrop_path || movie?.poster_path}`}
           alt="" 
           className="rounded-sm object-cover md:rounded" 
           layout="fill"/>
        </div>
      );
}

export default Thumbnail
