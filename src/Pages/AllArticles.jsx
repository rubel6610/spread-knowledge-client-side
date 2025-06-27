import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router";

const AllArticles = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ['Technology','Education', 'Health', 'Business'];
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/articles`).then((res) => {
      setLoading(false);
      setArticles(res.data);
      setAllArticles(res.data);
      
    });
  }, []);
  useEffect(()=>{
    if(selectedCategory){
    const filteredData =allArticles.filter(article=>article.category === selectedCategory)
    setArticles(filteredData)
  }else{
    setArticles(allArticles)
  }
  },[selectedCategory,allArticles])
  
 




  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen  p-4">
      <h2 className="text-4xl text-center font-bold mb-8">All Articles</h2>
      <div className="mb-6">
        <select
          className="select select-bordered "
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
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col"
          >
            <img
              src={article.thumbnail}
              alt={article.title}
              className="h-48 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
            <p className=" mb-1">Author: {article.authorName}</p>
            <p className=" mb-4">
              Published on: {new Date(article.date).toLocaleDateString()}
            </p>
            <Link
              to={`/all-articles/${article._id}`}
              className="mt-auto btn btn-primary  w-full"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
