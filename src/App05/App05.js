import React from 'react'

import './App05.css'
import Multisheet from './pages/Multisheet'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import Display from './components/Display'
import Footer from './components/Footer'



function App05() {
  return (
    <div>
        <h3>app05</h3>
{/*<Multisheet />*/}

<Router>
  <Routes>
    <Route path="/" element={<Multisheet/>} />
    <Route path="/display" element={<Display/>}  />
  </Routes>
  <Footer />
</Router>


    </div>
  )
}

export default  App05
