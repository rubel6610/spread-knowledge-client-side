import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router';

const AllArticles = () => {
    const [articles,setArticles]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASEURL}/articles`).then(res=>{
            setLoading(false);
            setArticles(res.data)
        })
    },[])
     if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <h2 className="text-4xl text-center font-bold mb-8">All Articles</h2>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <div key={article._id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col">
                        <img  src={article.thumbnail} alt={article.title} className="h-48 w-full object-cover rounded-md mb-4" />
                        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                        <p className="text-gray-400 mb-1">Author: {article.authorName}</p>
                        <p className="text-gray-400 mb-4">Published on: {new Date(article.date).toLocaleDateString()}</p>
                        <Link
                            to={`/all-articles/${article._id}`}
                            className="mt-auto btn btn-primary text-white w-full"
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
