import React from 'react'
import {useState, useEffect,useRef} from 'react'
import {db} from '../firebaseConfig'
import {collection,doc,getDocs,addDoc,deleteDoc,updateDoc }from'firebase/firestore'
import {FaEdit,FaTrash} from 'react-icons/fa'
import {Link } from 'react-router-dom'

import Display from '../components/Display'


function Multisheet() {

    const collectionRef = collection(db, 'multisheet')

    const [multisheetCol, setMultisheetCol] = useState([]);
    const [edit, setEdit] =useState(false);
    const [currentId,setCurrentId]=useState();
    const [newName, setNewName] =useState("");
    const [newExcel, setNewExcel]=useState("");
    const [newVba, setNewVba]=useState("");
    const [newJavascript,setNewJavascript]=useState();
    const [printed , setPrinted] =useState();

//REFFS
const inputName= useRef();
const inputExcel=useRef();
const inputVBA = useRef();
const inputJavascript=useRef();


useEffect(   ()=>  {  
    document.title="multisheet"
    const  getCollection = async ()=>{
        const data = await getDocs(collectionRef)
        setMultisheetCol(data.docs.map( ( doc) => ({ ...doc.data(), id:doc.id} )  ) )
        
}
        getCollection()
}
    ,[]   )

const createItem= async()=>{

    if(!edit) {
      //  alert("accessed no edit")
        await addDoc(collectionRef,{name:newName, vba:newVba,excel:newExcel,
            javascript:newJavascript} )
    }else{ //field
        const newField={
        name:inputName.current.value,
        vba:inputVBA.current.value,
        excel:inputExcel.current.value,
        javascript:inputJavascript.current.value         }
        //organize Doc
        const itemsDoc= doc(db,'multisheet', currentId);
        await updateDoc(itemsDoc, newField)
        setEdit('false')
        }

//    alert("accessed 2")
    window.location.reload(false)
    

}
const updateItem = async( id , {name,vba,javascript,excel} )=>{
    setEdit(true)
    inputName.current.value= name;
    if(vba!=null)inputVBA.current.value = vba;
    if(excel!=null)inputExcel.current.value=excel;
    if(javascript!=null)inputJavascript.current.value=javascript;
    setCurrentId(id)



}
const deleteItem =async(id)=>{
    const itemDoc= doc(db , 'multisheet' , id);
    await deleteDoc(itemDoc)
    window.location.reload(false)
}

const Display = (itm)=>{
    //const item=multisheetCol.filter((itm)=>{return itm.id ===id} )  ;
    alert (itm.name)
    
    window.open( "/display" ,"_blank_")   
    
}


  return (    <div>
<div className='formy'>
    <input type="text" placeholder='name'
    ref={inputName} 
    onChange={(e)=>{setNewName(e.target.value) }}
    ></input>
    <textarea placeholder='vba'
    ref={inputVBA}
    onChange= {(e)=>{setNewVba(e.target.value) }}
    ></textarea>
    <textarea 
    placeholder='excel'
    ref={inputExcel} 
    onChange={(e)=>{setNewExcel(e.target.value) }}></textarea>
    <textarea 
    placeholder='javascript'
    ref={inputJavascript}
    onChange={(e)=>{setNewJavascript(e.target.value) }}></textarea>
    
    <button className='formy-btn'
    onClick={createItem}>
        {edit? `edit` :`create item`}
    </button>


</div> {/*formy */}

     <div className='cart-container'>
        
       {multisheetCol.map( (itm)=>{
        return (
       
          <div className='cart'>
            <h3 className='cart-title'>  {itm.name}{itm.nme} </h3>
            <table className='cart-table'>
         {itm.excel &&(<tr><td className='prog-lang'>excel</td><td> {itm.excel}</td></tr> )}
            { itm.vba &&(<tr> <td className='prog-lang'>vba </td> <td className='monospace'>{itm.vba}</td></tr> ) }
            { itm.javascript &&(<tr> <td className='prog-lang'>js </td> <td className='monospace'>{itm.javascript}</td></tr> ) }
            </table>
            <br></br>
             <button
            onClick={ ()=> deleteItem(itm.id)}>{<FaTrash/>}</button>
            <button
            onClick={()=>{ updateItem(itm.id, itm)}} >{<FaEdit/>}</button>
            <button onClick={()=>{Display(itm )}}>disp</button>
          
            <Link className='lnk' to="/display"  target="_blank" 
            itm="city">display</Link>
          </div>  )
      } )        }  
        
      </div>  </div>
  )
}

export default Multisheet