import React from "react";
import { BrowserRouter,Routes, Route, HashRouter } from "react-router-dom";
import  List from "./pages/List"
import SharedLayout from './pages/SharedLayout'
import Insert from './pages/Insert'
import Home from './pages/Home'
import "./App02.css"
import Navbar from './Navbar'

export default function App02(){
    const [pname, setpName]= React.useState("Archi")

    return(
    <section>
   

    <HashRouter>
        <Routes>

            <Route path="/" element={<SharedLayout />} >
                <Route index element={<Home />} />
                <Route path="list" element={<List />}   />
                <Route path="form" element={<Insert />} />

            </Route>
        </Routes>    
    </HashRouter>    
          
         
    </section>)
}