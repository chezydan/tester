
import React from 'react'
import {pieces} from "./../data.js"
import ".././App2"
import  { v4 as uuid } from 'uuid'

export default function List(){
    const uid= uuid();
    return(
        <section>
                

            <h2> list</h2>
        <div >
            {pieces.map((item)=>{
               return (<article >
                <h3 className='card-title'>{item.name}   </h3>
                    <h4 className='year'>{item.place},{item.year}</h4>

                    <img src={item.img} alt={item.name}/>
                <div  >
                    <a href={`https://www.google.ca/maps/@${item.lat},${item.lon},250m/data=!3m1!1e3`} 
                     target="blank" >map it</a> 
                        </div>
                </article>
                
                )
            }  )}
        </div>
        
        </section>
    )
}
 
