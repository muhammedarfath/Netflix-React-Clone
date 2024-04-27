import React,{useEffect,useState} from 'react'
import { FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';
import BasicMenu from './BasicMenu';

function Header() {

const [isScrolled,setIsScrolled] = useState(false)


  useEffect(()=>{
    
    const handleScroll = () =>{
        if(window.scrollY > 0) {
            setIsScrolled(true)
        }else{
            setIsScrolled(false)
        }

    }

    window.addEventListener('scroll',handleScroll)

    return () => {
        window.removeEventListener('scroll',handleScroll)
    }

  },[])


    return (
        <header className={`${isScrolled && 'bg-[#141414]'} `}>
            {/* left area logo and menu items */}
            <div className='flex items-center space-x-2 md:space-x-10'>
                <img src="/images/favicon.png" width={100} height={100} alt="logo" className='cursor-pointer object-contain' />
               
                <BasicMenu/> 
                <ul className='hidden space-x-4 md:flex'>
                    <li className='headerLink'>Home</li>
                    <li className='headerLink'>Tv Shows</li>
                    <li className='headerLink'>Movies</li>
                    <li className='headerLink'>New & Popular</li>
                    <li className='headerLink'>My List</li>
                </ul>
    
            </div>
            
            {/* right area icons */}
            <div className='flex items-center space-x-4 text-sm font-light'>
               <FaSearch className="hidden h-5 w-5 sm:inline" />
               <p className='hidden lg:inline'>Kids</p>
               <IoMdNotifications className="h-6 w-6"/>
               <Link to='/account' >
                  <img 
                   src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="" className='w-full h-8 cursor-pointer object-contain'/>
                  
               </Link>
            </div>
        </header>
      )
}

export default Header
