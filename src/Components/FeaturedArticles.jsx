import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

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
      <div className="min-h-screen flex justify-center items-center ">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }
  return (
    <div className="p-4 bg-base-300  mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Featured Articles</h1>
        <NavLink to="/all-articles" className="font-semibold mr-3 text-lg text-base-content hover:underline rounded px-4 py-2">See All</NavLink>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-base-200 max-h-[500px] rounded-lg shadow-lg p-6 hover:scale-105 duration-300"
          >
            <img
              src={article.thumbnail}
              alt={article.title}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-base-content mb-3">
              {article.content.slice(0, 100)}...
            </p>
            <div className="flex justify-between text-sm text-base-content">
              <span>By: {article.authorName}</span>
              <span>{article.date}</span>
            </div>
            <Link
              to={`/all-articles/${article._id}`}
              className="mt-2 btn btn-primary  w-full"
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
