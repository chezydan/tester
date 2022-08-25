import React from 'react'
import './App03.css'
import {useState, useEffect} from 'react';
import {db} from './firebaseConfig'
import { collection,
    doc,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    }       from 'firebase/firestore'


    

function App03() {
    const [ books, setBooks] = useState([]);
    const booksCollectionRef = collection(db,'booksMed')
    const [create, setCreate] =useState(false)

    const [newTitle, setTitle] = useState('');
    const [newAuthor, setAuthor] = useState('');
    const [newDesc, setDesc] = useState('');
    const [newImg, setImg] =useState('');
    const [newUrl, setUrl] =useState('');
    const [newTemas, setTemas] =useState('');
    const [newLang, setLang ] =useState('');
    const [edit, setEdit] = useState(false)



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

    const createBook = async()=>{
        await addDoc(booksCollectionRef, 
            {title:newTitle,   author:newAuthor ,  desc: newDesc, 
                 img: newImg   ,
            url: newUrl     ,  temas:  newTemas  ,  lang: newLang      })
            
            window.location.reload(false)
    }

    const deleteBook =async(id)=>{
        const bookDoc= doc(db , 'booksMed' , id);
        await deleteDoc(bookDoc)
        window.location.reload(false)

    }

  return (    <div>
    <h2>App03 firebase crud on books </h2>
    <div className='formy'>
    
    <input  
        placeholder='title'
        onChange={(e)=>{setTitle(e.target.value)}}
    ></input>
        <input  
        placeholder='author'
        onChange={(e)=>{setAuthor(e.target.value)}}
    ></input>
      <textarea 
       placeholder='desc'
        onChange={(e)=>{setDesc(e.target.value)}}
    ></textarea >

        <input  
        placeholder='img'
        onChange={(e)=>{setImg(e.target.value)}}
    ></input>
      <input  
        placeholder='url'
        onChange={(e)=>{setUrl(e.target.value)}}
    ></input>
    <input  
        placeholder='temas'
        onChange={(e)=>{setTemas(e.target.value)}}
    ></input>
     <input  
        placeholder='lang'
        onChange={(e)=>{setLang(e.target.value)}}
    ></input>
    <button  
        onClick={createBook}
    >create book</button>
    </div> {/*formy */}
    <h4> {books.length>0 ? `${books.length} books in list`: 'no books' } </h4>

    {books.map( (book)=>
    { return(<section className='cart'>
            <h4> {book.title}</h4>
            <p>{book.author}</p>
            <p>{book.desc}</p>
            <img src={book.img} alt={book.title} />
            <p>{book.temas}</p>
            <p>{book.lang}</p>
            <button
            onClick={ ()=> deleteBook(book.id)}>delete</button>
            <button>edit</button>

</section>
    )

    }
    )}

    </div>
  )
}

export default App03