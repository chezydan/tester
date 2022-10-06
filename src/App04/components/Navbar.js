
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../App04.css'


function Navbar() {

const         [extendNavbar, setExtendNavbar]   =useState(false)

  return (<div>
    <div className='nav-container'>

        <div className='inner-container' >
            <div className='left-container' > 
                <div className='link-container'  >
                <Link to="/" className='linky'>Home  </Link>               
                <Link to="/product" className='linky'>Product  </Link>               
                <Link to="/contact" className='linky'>Contact  </Link>               
                <Link to="/about" className='linky'>About  </Link>  

</div>
<div className='open-link-button'
onClick={()=>{ setExtendNavbar((cur)=>!cur)   } }>
  {extendNavbar? <>&#10005;</> : <> &#8801;</>} 

</div>
</div>


            <div className='right-container' > 
            <input type='text' placeholder='search'></input>
            <button>search</button></div>
    </div>

{ extendNavbar &&(
<div className='extended-container' 

onClick={()=>{ setExtendNavbar((cur)=>!cur)   } } >

                <Link to="/" className='link-extended-container'>Home  </Link>               
                <Link to="/product" className='link-extended-container'>Product  </Link>               
                <Link to="/contact" className='link-extended-container'>Contact  </Link>               
                <Link to="/about" className='linky'>About  </Link>  


   
</div> )}

  
    
    
    
    </div>
    </div>
  )
}

export default Navbar