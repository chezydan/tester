import React from 'react'
import './App03.css'
import {useState, useEffect} from 'react';
import {db} from './firebaseConfig'
import { collection,
    doc,
    getDocs,
    }       from 'firebase/firestore'


    

function App03() {
    const [ books, setBooks] = useState([]);
    const booksCollectionRef = collection(db,'booksMed')


    useEffect( 
        ()=>{
            const getCollection = async() =>{
                const data= await getDocs(booksCollectionRef)
                setBooks(  data.docs.map( (doc)  =>
                ( {...doc.data() , id: doc.id} ))  )
            }
            getCollection();
        }
        
        
        ,[])



  return (    <div>
    <h2>App03 firebase crud on books </h2>

    {books.map( (book)=>
    { return(<section className='cart'>
            <h4> {book.title}</h4>
            <p>{book.author}</p>
            <p>{book.desc}</p>
            <p>{book.temas}</p>
            <p>{book.lang}</p>

</section>
    )

    }
    )}

    </div>
  )
}

export default App03