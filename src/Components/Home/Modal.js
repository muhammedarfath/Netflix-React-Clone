import React, { useEffect, useState } from 'react';
import MuiModal from '@mui/material/Modal';
import { modalState, movieState } from '../../Atoms/ModalAtom';
import { useRecoilState } from 'recoil';
import toast, { Toaster } from 'react-hot-toast';
import { API_KEY, baseUrl } from '../../Constants/Constants';
import { IoClose } from 'react-icons/io5';
import { FaRegThumbsUp } from 'react-icons/fa';
import { IoMdVolumeOff } from 'react-icons/io';
import ReactPlayer from 'react-player/lazy';
import { FaPlay } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { FaVolumeUp } from 'react-icons/fa';
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import useAuth from '../../Hooks/useAuth';

function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [movie, setMovies] = useRecoilState(movieState);
    const [trailer, setTrailer] = useState('');
    const [genres, setGenres] = useState([]);
    const [muted, setMuted] = useState(true);
    const [addedToList, setAddedToList] = useState(false);
    const { user } = useAuth();
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;


    const toastStyle = {
        background: 'white',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '15px',
        borderRadius: '9999px',
        maxWidth: '1000px',
    };

    useEffect(() => {
        if (!user) return;

        const checkIfInList = async () => {
            const docRef = doc(db, 'users', parsedUser.uid, 'myList', movie?.id.toString());
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setAddedToList(true);
            } else {
                setAddedToList(false);
            }
        };

        checkIfInList();
    }, [parsedUser, movie]);

    useEffect(() => {
        if (!movie) return;

        async function fetchMovie() {
            const data = await fetch(
                `${baseUrl}/${
                    movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movie?.id}?api_key=${
                    API_KEY
                }&language=en-US&append_to_response=videos`
            )
                .then((response) => response.json())
                .catch((err) => console.log(err.message));

            if (data?.videos) {
                const index = data.videos.results.findIndex(
                    (element) => element.type === 'Trailer'
                );
                setTrailer(data.videos?.results[index]?.key);
            }
            if (data?.genres) {
                setGenres(data.genres);
            }
        }

        fetchMovie();
    }, [movie]);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleList = async () => {
        if (addedToList) {
            await deleteDoc(doc(db, 'users', parsedUser.uid, 'myList', movie?.id.toString()));
            setAddedToList(false);
            toast(`${movie?.title || movie?.original_name} has been removed from My List`, {
                duration: 8000,
                style: toastStyle,
            });
        } else {
            await setDoc(doc(db, 'users', parsedUser.uid, 'myList', movie?.id.toString()), { ...movie });
            setAddedToList(true);
            toast(`${movie?.title || movie?.original_name} has been added to My List`, {
                duration: 8000,
                style: toastStyle,
            });
        }
    };

    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className="fixex !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
        >
            <>
                {/* <Toaster position="bottom-center" /> */}
                <button
                    onClick={handleClose}
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                >
                    <IoClose className="h-6 w6" />
                </button>

                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}
                    />
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-2">
                            <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                                <FaPlay className="h-7 w-7 text-black" />
                                Play
                            </button>

                            <button className="modalButton" onClick={handleList}>
                                {addedToList ? <FaCheck className="h-7 w-7" /> : <FaPlus className="h-7 w-7" />}
                            </button>

                            <button className="modalButton">
                                <FaRegThumbsUp className="h-7 w-7" />
                            </button>
                        </div>
                        <button className="modalButton" onClick={() => setMuted(!muted)}>
                            {muted ? <IoMdVolumeOff className="h-6 w-6" /> : <FaVolumeUp className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 text-sm">
                            <p className="font-semibold text-green-400">{!movie.vote_average * 10}% Match</p>
                            <p className="font-light">{movie?.release_date || movie?.first_air_date}</p>
                            <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                                HD
                            </div>
                        </div>

                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                            <p className="w-5/6">{movie?.overview}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className="text-[gray]">Genres: </span>
                                    {genres.map((genre) => genre.name).join(', ')}
                                </div>

                                <div>
                                    <span className="text-[gray]">Original language: </span>
                                    {movie?.original_language}
                                </div>

                                <div>
                                    <span className="text-[gray]">Total votes: </span>
                                    {movie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    );
}

export default Modal;
