import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from './../Components/Banner';
import FeaturedArticles from './../Components/FeaturedArticles';
import EditorChoice from './../Components/EditorChoice';


const Root = () => {
  return (
    <>
      <Navbar/>
      <Banner/>
      <FeaturedArticles/>
      <EditorChoice/>
  
    </>
 
  )
}

export default Root