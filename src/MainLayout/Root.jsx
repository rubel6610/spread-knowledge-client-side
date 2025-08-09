import React from 'react'
import Navbar from '../Components/Navbar'
import Home from '../Pages/Home'
import { Outlet } from 'react-router'
import Footer from '../Components/Footer'




const Root = () => {
  return (
    <>
      <Navbar/>
      <div className='pt-16'>
          <Outlet />
      </div>
   
     <Footer/>
     
    </>
 
  )
}

export default Root