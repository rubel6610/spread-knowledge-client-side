import React from 'react'
import Navbar from '../Components/Navbar'
import Home from '../Pages/Home'
import { Outlet } from 'react-router'
import Footer from '../Components/Footer'




const Root = () => {
  return (
    <>
      <Navbar/>
     <Outlet/>
     <Footer/>
    </>
 
  )
}

export default Root