import React from 'react'
import {useState} from 'react'

const Insert=()=>{
const [item, setItem]  = useState({
    name:"",  year:0, place:"",img:"",lat:0,lon:0
    });

   
function handleChange(event){
   
    setItem( (prevData) =>{
        return( {
            ...prevData,
            [event.target.name]:event.target.value
        }  )
  
    } )
   
}

const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(item)
}

return (
<div className="formy">
    <h1> Form Element</h1>
   <form className='frm' onSubmit={handleSubmit}>
        <input className='frm-inp' type="text" 
        name="name" placeholder="name"
      onChange= {handleChange}
      value={item.name}
        />

        <input type="text" className='frm-inp'  
        name="year" placeholder="year"
        onChange= {handleChange}
        value={item.year}/> 

        <input type="text"    className='frm-inp'  
        name="place" placeholder="place" 
        onChange= {handleChange}
        value={item.place} /> 

        <input type="text"    className='frm-inp'  
        name="img" placeholder="img" 
        onChange= {handleChange}
        value={item.img} /> 

        <input type="text"    className='frm-inp'  
        name="lat" placeholder="lat" 
        onChange= {handleChange} 
        value={item.lat}/> 

        <input type="text"    className='frm-inp'  
        name="lon" placeholder="lon" 
        onChange= {handleChange} 
        value={item.lon}/> 

        <button type="submit" 
        className='btn'> submit  </button>
   </form>    
</div>)


}

export default Insert

/*
name:'Palais Stoclet',
place: 'Brussels',
coors: 'default',
year: 1911,
img: "https://upload.wikimedia.org/wikipedia/commons/2/22/20120923_Brussels_PalaisStoclet_Hoffmann_DSC06725_PtrQs.jpg",
  lat: 50.835278 ,
lon : 4.416111  */