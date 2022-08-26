import React from 'react'
import './App03.css'
import {useState, useEffect, useRef} from 'react';
import {db} from './firebaseConfig'
import { collection,
    doc,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    }       from 'firebase/firestore'


    

function App03() {
    const [currentId, setCurrentId] = useState();
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

    const inputTitle= useRef()    
    const inputAuthor= useRef()
    const inputDesc = useRef()
    const inputImg = useRef()
    const inputUrl = useRef()
    const inputTemas = useRef()
    const inputLang = useRef()


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
        if (!edit){
        await addDoc(booksCollectionRef, 
            {title:newTitle,   author:newAuthor ,  desc: newDesc, 
                 img: newImg   ,
            url: newUrl     ,  temas:  newTemas  ,  lang: newLang      })
            window.location.reload(false)
        }else{
            const newFields= {title:inputTitle.current.value,
                   author:inputAuthor.current.value,
                   desc:inputDesc.current.value,
                   img:inputImg.current.value,
                   url:inputUrl.current.value,
                   temas:inputTemas.current.value,
                   lang:inputLang.current.value
                  }
                const bookDoc =doc(db,'booksMed',currentId)
                await updateDoc(bookDoc, newFields);
                setEdit(false)
                window.location.reload(false)
       }
        
          
    }

    const deleteBook =async(id)=>{
        const bookDoc= doc(db , 'booksMed' , id);
        await deleteDoc(bookDoc)
        window.location.reload(false)

    }

    const updateBook = async(id, {title, author,desc,url,img,temas,lang}) =>{
        setEdit(true)
        //console.log('auth : '+ author)
        inputTitle.current.value = title;
        inputAuthor.current.value = author;
        inputDesc.current.value = desc;
        inputUrl.current.value = url;
        inputImg.current.value = img;
        inputTemas.current.value = temas;
        inputLang.current.value = lang;
        setCurrentId(id);
        //const bookDoc =doc(db,'booksMed',id)
       // createBook()
//        const newFields= {author:author}
  //      await updateDoc(bookDoc, newFields);

    }

  return (    <div>
    <h2>App03 firebase crud on books </h2>
    <div className='formy'>
    
    <input  
        placeholder='title'
        ref={inputTitle}
        onChange={(e)=>{setTitle(e.target.value)}}
    ></input>
        <input  
        placeholder='author'
        ref={inputAuthor}
        onChange={(e)=>{
            setAuthor(e.target.value)}}
    ></input>
      <textarea 
       placeholder='desc'
       ref={inputDesc}
        onChange={(e)=>{setDesc(e.target.value)}}
    ></textarea >

        <input  
        placeholder='img'
        ref={inputImg}
        onChange={(e)=>{setImg(e.target.value)}}
    ></input>
      <input  
        placeholder='url'
        ref={inputUrl}
        onChange={(e)=>{setUrl(e.target.value)}}
    ></input>
    <input  
        placeholder='temas'
        ref={inputTemas}
        onChange={(e)=>{setTemas(e.target.value)}}
    ></input>
     <input  
        placeholder='lang'
        ref={inputLang}
        onChange={(e)=>{setLang(e.target.value)}}
    ></input>
    <button  
        onClick={createBook}
    >{ edit? 'edit book' : 'create book' }</button>
    </div> {/*formy */}
    <h4> {books.length>0 ? `${books.length} books in list`: 'no books' } </h4>

    {books.map( (book)=>
    { return(<section className='cart'>
            <h4 className='book-title'> {book.title}</h4>
            <p>{book.author}</p>
            <p>{book.desc}</p>
            <img src={book.img} alt={"no img for "+book.title }/>
            <p>{book.temas}</p>
            <p>{book.lang}</p>
            <button
            onClick={ ()=> deleteBook(book.id)}>delete</button>
            <button 
            onClick={ ()=> updateBook(book.id, book)}>
                    edit</button>

</section>
    )

    }
    )}

    </div>
  )
}

export default App03