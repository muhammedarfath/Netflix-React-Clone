import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

function useList(uid) {
    const [list, setList] = useState([])
  
    useEffect(() => {
      if (!uid) return
  
      const unsubscribe = onSnapshot(
        collection(db, 'users', uid, 'myList'),
        (snapshot) => {
          setList(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(), 
            }))
          )
        }
      )
  
      return () => unsubscribe()
    }, [db, uid])
  
    return list
  }
  

export default useList
