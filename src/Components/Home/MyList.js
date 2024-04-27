import React,{useEffect,useState,useRef, useLayoutEffect} from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Thumbnail from './Thumbnail';
import { db } from '../../firebase/firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import useAuth from '../../Hooks/useAuth';

function MyList({mylist}) {

    const [isMoved,setIsMoved] = useState(false)
    const rowRef = useRef(null)
    

    

    const handleClick = (direction) => { 
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
    
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    }

    return (
    <div className="h-40 space-y-0.5 md:space-y-2 ">
        <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white
        md:text-2xl'>My List</h2>
        <div className='group relative md:-ml-2'>
            <BsChevronLeft  className={`absolute top-0 bottom-7 left-2 z-40 m-auto h-9 w-9 
                cursor-pointer opacity-0 transition hover: scale-125
                group-hover:opacity-100 ${!isMoved && 'hidden'}`}
            onClick={()=> handleClick('left')} />

            <div ref={rowRef} className="flex scrollbar-hide items-center space-x-0.5
            overflow-x-scroll md:space-x-2.5 md:p-2">
 
                    {mylist.map((movie) => (
                        <Thumbnail key={movie.id} movie={movie} />
                    ))}                
            </div>

            <BsChevronRight className='absolute top-0 bottom-7 right-2 z-40 m-auto h-9 w-9 
            cursor-pointer opacity-0 transition hover:scale-125 
            group-hover:opacity-100'
            onClick={()=> handleClick('right')}/>
        </div>
    </div>
    );
}

export default MyList;
