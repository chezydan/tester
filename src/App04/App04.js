import React from 'react'
import {useState} from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import './App04.css'
import Home from './components/Home'
import Contact from './components/Contact'
import Product from './components/Product'
import About from './components/About'


import Navbar from './components/Navbar'
import Ball01 from './Ball01'
import Parent from './components/Parent'


function App04() {


const [name,setName] =useState('myName');



  return (<>


<div className='general'>
<Parent >           
        <Router >
        <Navbar className="navbar" />


            <Routes  className="routes">
            <Route path='/' element={<Home />} />
            <Route path="/product" element={<Product />}/>
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About n={name}/>}/>
            <Route path='/ball' element={<Ball01 />} />
            
            </Routes>

        </Router>


       </Parent>





{/*< Ball01 />    */}

</div>
   
  </>)
}

export default App04