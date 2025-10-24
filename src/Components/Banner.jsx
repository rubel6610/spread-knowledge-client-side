import React from 'react';
import { useNavigate } from 'react-router';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/all-articles');
  };

  const slides = [
    {
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg',
      title: 'Share Your Knowledge',
      description: 'Dive into a world of articles, insights, and shared experiences. Start learning and contributing today!',
      gradient: 'from-purple-600/10 via-blue-600/70 to-transparent'
    },
    {
      image: 'https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg',
      title: 'Inspire Others',
      description: 'Your stories can change lives. Share your articles and make an impact in your community.',
      gradient: 'from-blue-600/10 via-indigo-600/70 to-transparent'
    },
    {
      image: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg',
      title: 'Join the Community',
      description: 'Connect with passionate learners and experts. Start your journey with us.',
      gradient: 'from-green-600/10 via-teal-600/70 to-transparent'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={800}
        showArrows={true}
        swipeable={true}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[85vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh]">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
              <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow-md">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={handleExplore}
                    className="btn btn-primary btn-lg px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    🚀 Explore Articles
                  </button>
                  <button
                    onClick={() => navigate('/post-article')}
                    className="btn btn-outline btn-lg px-8 py-3 text-lg font-semibold text-white border-white hover:bg-white hover:text-primary shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    ✍️ Start Writing
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-100 to-transparent"></div>
          </div>
        ))}
      </Carousel>

      {/* Floating Stats Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 shadow-2xl border border-white/20">
          <div className="flex gap-8 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm opacity-80">Articles</div>
            </div>
            <div className="border-l border-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm opacity-80">Writers</div>
            </div>
            <div className="border-l border-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-sm opacity-80">Readers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
