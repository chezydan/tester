import React from 'react'
import { FaTrash, FaEdit, FaSearchLocation} from 'react-icons/fa'
import {BiPhotoAlbum} from 'react-icons/bi'
import {useState, useEffect, useRef} from 'react'
import '../App03.css'

import {db} from '../firebaseConfig'

import { doc,collection,getDocs,updateDoc,addDoc,deleteDoc} 
from 'firebase/firestore'
import { jsonEval } from '@firebase/util'
import { HashRouter } from 'react-router-dom'


function Places() {
//CONSTS STATES
const[currentId, setCurrentId] =useState('')
const[pieces,setPieces] = useState([])
const piecesCollectionRef= collection(db, 'pieces')
//const [loading, setLoading] = useState(true)

const [enableDel, setEnableDel] = useState(true)
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

    const editedItm={
        name:inputName.current.value,
         place:inputPlace.current.value,
          img:inputImg.current.value,
           year:inputYear.current.value,
            lat: inputLat.current.value,
             lon:inputLon.current.value}
    //build doc obj to db
    const itmDoc = doc(db,'pieces',currentId);
    //updateDoc with editedItm    asynchronically (await)
    await updateDoc(itmDoc, editedItm );
    setEdit(false)
    }
    window.location.reload(false)
}

const deleteItm= async (id)=>{
   if (enableDel ) {
    const itmDoc= doc(db, 'pieces',id)
    await deleteDoc(itmDoc)
    window.location.reload(false) }
else{alert('editing has been disabled'  ) } 
}


const updateItm=(id,name,place,img,lat,lon,year,desc)=>{
    setEdit(true)
    // populate inputREFs with params of origin
    inputName.current.value=name;
    inputPlace.current.value=place;
    inputImg.current.value=img;
    inputYear.current.value=year;
    inputLat.current.value=lat;
    inputLon.current.value=lon;
    
    setCurrentId(id)

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
                <h3 className='itm-title'>{name}</h3>
                <p>{place}</p>
                <p>{year}</p>
                <img src={img} alt='pict'/>
                <div  >
                    <a href={`https://www.google.ca/maps/@${lat},${lon},250m/data=!3m1!1e3`} 
                     target="blank" >map it</a> 
                        </div>
<br></br>
<hr></hr>
                <button 
                onClick={ ()=>{updateItm(id,name,place,img,lat,lon,year )}}
                >{<FaEdit />}</button>
                <button 
                onClick=    {()=>{
                    if (window.confirm('sure on deleting?') ) 
                    deleteItm(id)}  }  > {<FaTrash />}  </button>
             <a href={`https://www.google.ca/maps/@${lat},${lon},250m/data=!3m1!1e3`} 
                     target="blank" >   <button >
                {<    FaSearchLocation />}
                </button>  </a>
                <a href={`https://www.google.com/search?q=${name}+images&client=ubuntu&hs=doN&channel=fs&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjC9IDJ_Z76AhWCuaQKHURyCtgQ_AUoAXoECAEQAw&biw=1209&bih=801&dpr=1`} 
                     target="blank" >   <button >
                {<BiPhotoAlbum/>}
                </button>  </a>
                <a href={`https://en.wikipedia.org/wiki/${name}`} 
                     target="blank" >   <button >
                {'W'}
                </button>  </a>


                

                
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