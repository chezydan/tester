import React from 'react'
import {useState, useEffect, useRef} from 'react'

import Place from '../components/Place'
import '../App03.css'

import {db} from '../firebaseConfig'

import { doc,collection,getDocs,updateDoc,addDoc,deleteDoc} 
from 'firebase/firestore'


function Places() {
//CONSTS STATES
const[wPieces, setWPieces]  =useState();
const [page, setPage] =useState(1)
    const multi=5

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


//sercher
const [sYearFrom, setSYearFrom] =useState(-20000)
const [sYearTill, setSYearTill] =useState(20000)


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

function handleSearch(){
   if (sYearFrom =" "){
    setSYearFrom(-20000)
   }
    if(sYearFrom=="")
    {
        console.log(sYearFrom)}

    
}

  return (<>
  
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
<button   onClick={createItm}>
    { edit? 'edit item': 'create item'}   </button>   
    </div> <br></br>
   
    <div>
        <input type="text" 
        placeholder='from'
        onChange={ (e)=>{setSYearFrom(e.target.value  )
            if(e.target.value==""){ setSYearFrom(-20000)}        
        }} ></input>
        <button className='btn' name='year from' 
        onClick={handleSearch}></button>

        <input type="text" 
        placeholder='till'
        onChange={ (e)=>{setSYearTill(e.target.value  )
            if(e.target.value==""){ setSYearTill(20000)}        
        }} ></input>


    </div>
    <br></br>

    <section>
    <div className='cart-container'>
        {pieces.filter( (piece)=> piece.year >parseInt(sYearFrom)   )
        .filter(piece => piece.year < parseInt(sYearTill))
        .map(  (piece )   =>{
            return (<>
        <div className='cart'>
{  <>
     {/* piece.year> parseInt(sYearFrom) && piece.year < parseInt(sYearTill) &&  */}
{    <Place piece={piece} updateItm={updateItm} deleteItm={deleteItm}  /> }
</>                  }
    
</div>
            </>)
        } )    
            
         }
    </div>

  </section>

  <p>  
    {/*
  {JSON.stringify(pieces)}
  <br></br>
  <br></br>
  {pieces.map((itm)=> {return JSON.stringify(itm)})}    
    */}
  </p>
    </>
  )
}

export default Places