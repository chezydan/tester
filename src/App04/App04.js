import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import './App04.css'
import Home from './components/Home'
import Contact from './components/Contact'
import Product from './components/Product'



import Navbar from './components/Navbar'
import Ball01 from './Ball01'
function App04() {
  return (<>
<div className='general'>
 
        <Router >
        <Navbar className="navbar" />
           
            <Routes  className="routes">
            <Route path='/' element={<Home />} />
            <Route path="/product" element={<Product />}/>
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' />
            
            </Routes>

        </Router>








{/*< Ball01 />    */}

</div>
   
  </>)
}

export default App04