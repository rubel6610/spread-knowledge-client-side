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
        <div
          className="h-[80vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg')` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 text-white">
            <h1 className="text-5xl font-bold mb-4">Share Your Knowledge</h1>
            <p className="text-lg mb-6 max-w-xl">
              Dive into a world of articles, insights, and shared experiences. Start learning and contributing today!
            </p>
            <button
              onClick={handleExplore}
              className="btn btn-primary px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Explore Articles
            </button>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          className="h-[80vh]  bg-cover bg-center relative"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg')` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 text-white">
            <h1 className="text-5xl font-bold mb-4">Inspire Others</h1>
            <p className="text-lg mb-6 max-w-xl">
              Your stories can change lives. Share your articles and make an impact in your community.
            </p>
            <button
              onClick={handleExplore}
              className="btn btn-primary px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Explore Articles
            </button>
          </div>
        </div>

        {/* Slide 3 */}
        <div
          className="h-[80vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg')` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 text-white">
            <h1 className="text-5xl font-bold mb-4">Join the Community</h1>
            <p className="text-lg mb-6 max-w-xl">
              Connect with passionate learners and experts. Start your journey with us.
            </p>
            <button
              onClick={handleExplore}
              className="btn btn-primary px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Explore Articles
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
