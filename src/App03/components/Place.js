import React from 'react'
import { FaTrash, FaEdit, FaSearchLocation} from 'react-icons/fa'
import {BiPhotoAlbum} from 'react-icons/bi'

function Place({piece,
    updateItm, deleteItm} ) {

        const {id,name,place,img,lat,lon,year,desc} =piece 
  return (    <div>
 


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

  )
}

export default Place