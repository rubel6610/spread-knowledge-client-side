import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import NoDataFound from "./NoDataFound";

const EditorChoice = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/editorchoice`).then((res) => {
      setArticles(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[300px] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-base-200 to-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            ⭐ Editor's Choice
          </h2>
          <p className="text-base-content/70 text-lg">Handpicked articles by our editorial team</p>
        </div>

        {articles.length === 0 ? (
          <NoDataFound 
            message="No Editor's Choice Yet" 
            description="Our editors are carefully selecting the best articles for you!" 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div 
                key={article._id} 
                className="group card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-primary/20"
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="badge badge-primary badge-lg shadow-lg gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Editor's Pick
                  </div>
                </div>

                <figure className="relative overflow-hidden h-56">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </figure>
                
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge badge-secondary badge-sm">{article.category}</span>
                  </div>
                  
                  <h3 className="card-title text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-base-content/70 text-sm line-clamp-2 mb-2">
                    {article.content}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-8">
                        <span className="text-xs">{article.authorName?.charAt(0) || 'A'}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{article.authorName}</p>
                    </div>
                  </div>
                  
                  <div className="card-actions">
                    <Link 
                      to={`/all-articles/${article._id}`}
                      className="btn btn-primary btn-block gap-2 group-hover:gap-3 transition-all"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorChoice;
