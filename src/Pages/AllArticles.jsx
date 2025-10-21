import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

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
      <div className="min-h-screen flex justify-center items-center bg-base-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-300 text-base-content py-10 px-4 md:px-8 transition-all duration-300">
      {/* Search + Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="🔍 Search by title, author, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full md:w-1/2 bg-base-100"
        />

        <select
          className="select select-bordered bg-base-100 text-base-content w-full md:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Info */}
      <p className="text-sm text-gray-500 mb-6">
        Showing {articles.length} of {allArticles.length} articles
      </p>

      {/* Cards Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((article) => (
          <div
            key={article._id}
            className="group bg-base-100 rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 border border-base-200"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300 mb-1">
                {article.title}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                Author:{" "}
                <span className="text-primary font-medium">
                  {article.authorName}
                </span>
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Published on:{" "}
                <span className="text-gray-400">
                  {new Date(article.date).toLocaleDateString()}
                </span>
              </p>

              <Link
                to={`/all-articles/${article._id}`}
                className="mt-auto btn btn-outline btn-primary w-full"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
