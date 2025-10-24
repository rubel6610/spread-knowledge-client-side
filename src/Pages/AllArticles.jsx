import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import NoDataFound from "../Components/NoDataFound";

const AllArticles = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Technology", "Education", "Health", "Business"];

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/articles`).then((res) => {
      setLoading(false);
      setArticles(res.data);
      setAllArticles(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory || searchQuery) {
      let filteredData = allArticles;

      if (selectedCategory) {
        filteredData = filteredData.filter(
          (article) => article.category === selectedCategory
        );
      }

      if (searchQuery) {
        filteredData = filteredData.filter(
          (article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.authorName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            article.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setArticles(filteredData);
    } else {
      setArticles(allArticles);
    }
  }, [selectedCategory, searchQuery, allArticles]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            📚 All Articles
          </h1>
          <p className="text-lg text-base-content/70">Explore our collection of knowledge</p>
        </div>

        {/* Search + Filter */}
        <div className="mb-10">
          <div className="bg-base-100 rounded-2xl shadow-xl p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by title, author, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered w-full pl-12 bg-base-200 focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <select
                  className="select select-bordered w-full bg-base-200 focus:ring-2 focus:ring-primary"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">🎯 All Categories</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSearchQuery("");
                  }}
                  className="btn btn-outline btn-error"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Results Info */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-base-content/60">
                Showing <span className="font-semibold text-primary">{articles.length}</span> of{" "}
                <span className="font-semibold">{allArticles.length}</span> articles
              </p>
              {(selectedCategory || searchQuery) && (
                <span className="badge badge-primary badge-lg">Filtered Results</span>
              )}
            </div>
          </div>
        </div>

        {/* No Results */}
        {articles.length === 0 ? (
          <NoDataFound 
            message="No Articles Found" 
            description="Try adjusting your search or filters to find what you're looking for." 
            showButton={true}
            buttonText="Clear Filters"
            buttonLink="/all-articles"
          />
        ) : (
          /* Cards Grid - 4 columns on xl screens */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article) => (
              <div
                key={article._id}
                className="group bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-[420px] hover:-translate-y-2 border border-base-300"
              >
                {/* Image - Fixed Height */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Title - 2 lines max */}
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  {/* Author Info */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-8">
                        <span className="text-xs">{article.authorName?.charAt(0) || 'A'}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-primary">
                        {article.authorName}
                      </p>
                      <p className="text-xs text-base-content/60">
                        {new Date(article.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 mb-3 text-sm text-base-content/70">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span>{article.likes || 0}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    to={`/all-articles/${article._id}`}
                    className="mt-auto btn btn-primary btn-block gap-2 group-hover:gap-3 transition-all"
                  >
                    Read Article
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllArticles;
