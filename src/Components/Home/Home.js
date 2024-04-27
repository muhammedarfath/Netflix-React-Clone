import React, { useEffect,useLayoutEffect,useState } from 'react'
import Header from '../../Layout/Header'
import Banner from './Banner'
import requests from '../../urls'
import Row from './Row'
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {modalState} from '../../Atoms/ModalAtom'
import { useRecoilValue } from 'recoil'
import Modal from './Modal'
import MyList from './MyList'
import useAuth from '../../Hooks/useAuth'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function Home() {


  const storedUser = localStorage.getItem('user');
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  const showModal = useRecoilValue(modalState)
  const [myList, setMyList] = useState([]);


  useEffect(() => {
      if (parsedUser && parsedUser.email) {
        const fetchMyList = async () => {
          try {
              
              const myListRef = collection(db, 'users', parsedUser.uid, 'myList');
              const snapshot = await getDocs(myListRef);
              
      
              const myListMovies = snapshot.docs.map(doc => doc.data());
  
              setMyList(myListMovies);
          } catch (error) {
              console.error('Error fetching My List movies:', error);
          }
      };
        navigate('/');
        fetchMyList();
      }else{
          navigate("/login")
      }
    }, []);
  



  return (
  
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
        <Toaster/>
        <Header/>
        <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>

          <Banner url={requests.fetchTrending}/>
            <section className='md:space-y-20'>
              <Row url={requests.fetchHorrorMovies} title='Trending Now'   />
              <Row url={requests.fetchNetflixOriginals} title='Netflix Originals'  />
              <Row url={requests.fetchActionMovies} title='Action Thriller'  />
               { myList.length > 0 && <MyList mylist={myList} />}
              <Row url={requests.fetchComedyMovies} title='Comedies'  />
              <Row url={requests.fetchHorrorMovies} title='Scary Movies'   />
              <Row url={requests.fetchRomanceMovies} title='Romance Movies'  />
              <Row url={requests.fetchDocumentaries} title='Top Rated'  />
            </section>
            {showModal && <Modal/>}
        </main>
      
    </div>
    
    
  )
}

export default Home
