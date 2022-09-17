import React from 'react'
import { FaTrash, FaEdit} from 'react-icons/fa'
import {useState, useEffect, useRef} from 'react'
import '../App03.css'

import {db} from '../firebaseConfig'

import { doc,collection,getDocs,updateDoc,addDoc,deleteDoc} 
from 'firebase/firestore'
import { jsonEval } from '@firebase/util'


function Places() {
//CONSTS STATES
const[currentId, setCurrentId] =useState('')
const[pieces,setPieces] = useState([])
const piecesCollectionRef= collection(db, 'pieces')
//const [loading, setLoading] = useState(true)

//Reffs
//const  [input]
const  inputName=useRef()
const  inputPlace=useRef()
const inputYear=useRef()
const inputImg=useRef()
const inputCoors=useRef()
const inputLat=useRef()
const inputLon=useRef()

//state fields
const [newName,setNewName]=useState('')
const [newPlace,setNewPlace]=useState('')
const [newYear, setNewYear]=useState('')
const[newImg,setNewImg]=useState('')
const [newCoors, setNewCoors]=useState('')
const [newLat,setNewLat]=useState('')
const [newLon,setNewLon]=useState('')
//states, other
const[edit, setEdit]=useState(false)


useEffect(()=>{
    document.title='P L A C E S'
    const getCollection= async()=>{
        const data= await getDocs(piecesCollectionRef)
        setPieces(
             data.docs.map( (doc)=>{
                return ({...doc.data(), id:doc.id})     }        )        
        )
   }
    getCollection();}
    ,[])

const createItm =async ()=>{
    if (!edit){
      await  addDoc(piecesCollectionRef,
            {name:newName,place:newPlace,coors:newCoors,img:newImg,year:newYear,
            lat:newLat,lon:newLon})    }
else{
    console('edit')}
    window.location.reload(false)
}

const deleteItm= async (id)=>{
    const itmDoc= doc(db, 'pieces',id)
    await deleteDoc(itmDoc)
    window.location.reload(false)
}


  return (<>
    <div>Places</div>
    <   div className='formy'>
    <input
        placeholder='name'
        ref={inputName}
        onChange={ (e)=> {setNewName(e.target.value)}}></input>
    <input
        placeholder='place'
        ref={inputPlace}
        onChange={ (e)=> {setNewPlace(e.target.value)}}></input>
    <input
        placeholder='year'
        ref={inputYear}
        onChange={ (e)=> {setNewYear(e.target.value)}}></input>
    <input
        placeholder='coors'
        ref={inputCoors}
        onChange={ (e)=> {setNewCoors(e.target.value)}}></input>
    <input
        placeholder='img'
        ref={inputImg}
        onChange={ (e)=> {setNewImg(e.target.value)}}></input>
    <input
        placeholder='lat'
        ref={inputLat}
        onChange={ (e)=> {setNewLat(e.target.value)}}></input>
    <input
        placeholder='lon'
        ref={inputLon}
        onChange={ (e)=> {setNewLon(e.target.value)}}></input>

<button 
onClick={createItm}>
    { edit? 'edit item': 'create item'}
</button>

    </div>
  <section>
    <div className='cart-container'>
        {pieces.map(  ({id,name,place,img,lat,lon,year,desc}) =>{
            return (<>
        <div className='cart'>
                <p>{name}</p>
                <p>{place}</p>
                <p>{year}</p>
                <img src={img} alt='pict'/>
                <div  >
                    <a href={`https://www.google.ca/maps/@${lat},${lon},250m/data=!3m1!1e3`} 
                     target="blank" >map it</a> 
                        </div>

                <button          >{<FaEdit />}</button>
                <button 
                onClick={()=>{deleteItm(id)}  } > {<FaTrash />}  </button>

                </div>
            </>)
        } ) }
    </div>

  </section>
  <p>  
  {JSON.stringify(pieces)}
  </p>
    </>
  )
}

export default Places