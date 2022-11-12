import React, {useContext} from 'react'
import { FirstContext } from './Parent'


function Home() {
  const [mycolor, setMycolor]= useContext(FirstContext)


    setMycolor('green')
  //const name=useContext(name)  
  
  return (<>
    <div>Home</div>
<p> from the conte-t</p>

<p>    {mycolor} </p>



    </>
  )
}

export default Home


