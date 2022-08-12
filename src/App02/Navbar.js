import React from 'react'
import {Link} from  'react-router-dom'

export default  function Navbar({propName}){



    return (
        <>
        <nav className='--nav'>
<h5>navbar</h5>
           <Link to='/list' > List</Link>
           <Link to='/form' >Insert</Link>
           <h4>  { propName}  </h4>
           
           </nav>
        </>
    )
}