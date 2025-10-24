import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import NoDataFound from "./NoDataFound";

const FeaturedArticles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/articles`).then((res) => {
      setLoading(false);
      const articles = res.data;
      setArticles(articles.slice(0, 8));
    });
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="p-8 bg-base-200">
        <h2 className="text-4xl font-bold text-center mb-8">✨ Featured Articles</h2>
        <NoDataFound 
          message="No Articles Yet" 
          description="Be the first to share your knowledge!" 
          showButton={true}
          buttonText="Post Article"
          buttonLink="/post-article"
        />
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">✨ Featured Articles</h2>
            <p className="text-base-content/70">Discover the most popular content</p>
          </div>
          <NavLink 
            to="/all-articles" 
            className="btn btn-outline btn-primary gap-2 hover:scale-105 transition-transform"
          >
            See All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </NavLink>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article) => (
            <div
              key={article._id}
              className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-[420px] hover:-translate-y-2 border border-base-300"
            >
              {/* Image Container - Fixed Height */}
              <div className="overflow-hidden h-48 relative">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <span className="badge badge-primary badge-lg shadow-lg">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content - Fixed Height with Flex */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Title - Fixed 2 lines */}
                <h3 className="text-lg font-bold  line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {article.title.slice(0,27)+ "..."}
                </h3>

                {/* Description - One line only */}
                <p className="text-sm text-base-content/70 mb-3 line-clamp-1">
                  {article.content}
                </p>

                {/* Author & Date */}
                <div className="flex items-center gap-3 mb-3 text-sm">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-8">
                      <span className="text-xs">{article.authorName?.charAt(0) || 'A'}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{article.authorName}</p>
                    <p className="text-xs text-base-content/60">
                      {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Read More Button - Auto pushed to bottom */}
                <Link
                  to={`/all-articles/${article._id}`}
                  className="mt-auto btn btn-primary btn-block gap-2 group-hover:gap-3 transition-all"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticles;
