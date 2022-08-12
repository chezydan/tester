import {Link,Outlet} from 'react-router-dom'
import Navbar from '../Navbar'

const SharedLayout= ()=>{


    return (
        <>
        <div>
        <Navbar /> </div>
        <Outlet />            
        </>
    )
}

export default SharedLayout