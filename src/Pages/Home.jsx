import React from "react";
import Banner from "./../Components/Banner";
import FeaturedArticles from "./../Components/FeaturedArticles";
import Categories from "./../Components/Categories";
import EditorChoice from "./../Components/EditorChoice";
import TopContributors from "./../Components/TopContributors";
import Stats from "./../Components/Stats";
import Testimonials from "./../Components/Testimonials";
import Features from "./../Components/Features";

const Home = () => {
  return (
    <div>
      <Banner />
      <Stats />
      <Features />
      <FeaturedArticles />
      <Categories />
      <EditorChoice />
      <TopContributors />
      <Testimonials />
   
    </div>
  );
};

export default Home;
