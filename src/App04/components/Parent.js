import  React,{createContext,useState} from 'react'
import Home from './Home'
import Product from './Product'


export const FirstContext= createContext()
function Parent( {  children} ){
    const [mycolor, setMycolor]= useState('blue')
    const name="contextName"

    return(
 <FirstContext.Provider value={
   [mycolor,
   setMycolor]
   } >
    <div>
   
     </div>

     {children}
</FirstContext.Provider>
)
}
export default Parent

