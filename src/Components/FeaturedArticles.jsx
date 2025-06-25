import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedArticles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/articles`).then((res) => {
      setLoading(false);
      const articles = res.data;
      setArticles(articles.slice(0, 6));
    });
  });
   if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }
  return (
    <div>
      <h1 className="p-6 text-4xl">Featured Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-gray-800 max-h-[500px] rounded-lg shadow-lg p-6 hover:scale-105 duration-300"
          >
            <img
              src={article.thumbnail}
              alt={article.title}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-300 mb-3">
              {article.content.slice(0, 100)}...
            </p>
            <div className="flex justify-between text-sm text-gray-400">
              <span>By: {article.authorName}</span>
              <span>{article.date}</span>
            </div>
            <Link
              to={`/all-articles/${article._id}`}
              className="mt-2 btn btn-primary text-white w-full"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
