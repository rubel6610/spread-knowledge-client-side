import React from 'react';
import { useNavigate } from 'react-router';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/all-articles');
  };

  return (
    <div className="">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
      >
        {/* Slide 1 */}
        <div className="h-[80vh] bg-cover bg-center relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
          <div className="absolute inset-0  bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-5xl font-bold mb-4">Share Your Knowledge</h1>
            <p className="text-lg mb-6 max-w-xl">
              Dive into a world of articles, insights, and shared experiences. Start learning and contributing today!
            </p>
            <button onClick={handleExplore} className="btn btn-primary  px-6 py-2 rounded-lg hover:bg-indigo-700">
              Explore Articles
            </button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="h-[80vh] bg-cover bg-center  relative" style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661767552224-ef72bb6b671f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
          <div className="absolute inset-0  bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-5xl font-bold mb-4">Inspire Others</h1>
            <p className="text-lg mb-6 max-w-xl">
              Your stories can change lives. Share your articles and make an impact in your community.
            </p>
            <button onClick={handleExplore} className="btn btn-primary  px-6 py-2 rounded-lg hover:bg-indigo-700">
              Explore Articles
            </button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="h-[80vh] bg-cover bg-center relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
          <div className="absolute inset-0  bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-5xl font-bold mb-4">Join the Community</h1>
            <p className="text-lg mb-6 max-w-xl">
              Connect with passionate learners and experts. Start your journey with us.
            </p>
            <button onClick={handleExplore} className="btn btn-primary  px-6 py-2 rounded-lg hover:bg-indigo-700">
              Explore Articles
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
