import React from 'react'
import { FaTrash,FaEdit } from 'react-icons/fa'
import { useEffect, useState, useRef} from 'react'
import '../App03.css'


import {db} from '../firebaseConfig'

import {
    doc, collection, getDocs, updateDoc, addDoc, deleteDoc}
        from 'firebase/firestore'


function Quotes() {

    const [wholeQuotes, setWholeQuotes]=useState([]);
    const [currentId, setCurrentId] =useState('');
    const [quotes, setQuotes] = useState([]);
    const quotesCollRef= collection(db, 'quotes')
    //const [create, setCreate] =useState(false)
    const [loading, setLoading] = useState(true);
    //REFs
    const inputQuoteText=useRef();
    const inputAuthor= useRef();

    //State Fields
    const [quoteText, setQuoteText ] = useState('')
    const [author, setAuthor] = useState('')
    const [editing, setEditing] = useState(false)
    const [page, setPage] =useState(1)

    const multi=5

    useEffect( ()=>{document.title='A03 Quotes'
    const getCollection= async()=>{
        const data= await getDocs(quotesCollRef)
        setWholeQuotes( data.docs.map(doc=>({
            ...doc.data(), id:doc.id
        }) )  )
    }
    getCollection()}   
    ,[]) 

    useEffect(() => {
        setTimeout( () => {
            if(loading){
            setQuotes(wholeQuotes.slice(0,page*multi))  
            }
            ;
            setLoading(false);
        }, 1500);
    }, [page,[] ]);

    
    const handleScroll =  ()=> {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setLoading(true);
            setPage((prev) => prev + 1);
        }
    };
     useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); 



 const createQuote =async()=>{
    if(!editing) {
        await addDoc (quotesCollRef,
                     { quote:quoteText, author:author})
                     window.location.reload(false)
    } else{
        const newDocFields={
            quote:inputQuoteText.current.value,
            author:inputAuthor.current.value        }
        const quoteDoc=doc(db, 'quotes', currentId);
        await updateDoc (quoteDoc, newDocFields);
        setEditing(false)
        window.location.reload(false)
    }


 }

 const deleteQuote =async(id) =>{
    const quoteDoc = doc(db, 'quotes', id)
    await  deleteDoc( quoteDoc)

    window.location.reload(false)
 }  

const updateQuote = async( id , {quote, author})=>{
    setEditing(true)
    inputQuoteText.current.value= quote
    inputAuthor.current.value = author;
    setCurrentId(id)




}


  return (<div className='st'>
   <h2>Quotes DB</h2>
   <h4>{`${quotes.length}  items in db`} </h4>
    <div className='formy formy-quotes'>
    {loading&&<p>loading</p> }
<textarea 
placeholder='text' 
ref={inputQuoteText} 
onChange={(e)=>{ setQuoteText(e.target.value)  }   }></textarea>
<input 

placeholder='author' type = 'text' 
ref={inputAuthor}
onChange={(e)=>{setAuthor(e.target.value)}} />

<button className={editing && '--btn-edit'   } onClick={createQuote}>  {editing? 'edit': 'add'}</button>


    </div>

    <div className='cart-container'>
    {quotes.map( (itm)=>{
      return (   <div className='cart'>
                <p>{itm.quote}</p>
                <h4> {itm.author}</h4>
               < button    onClick= {()=>deleteQuote(itm.id)}   > {<FaTrash />}</button>


                <button 
                onClick={()=>{updateQuote(itm.id,itm)  }}
                >{<FaEdit /> } </button>
             </div>        )
    })}
</div>










    </div>
  )
}

export default Quotes