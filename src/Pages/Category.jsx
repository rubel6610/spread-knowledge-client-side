import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Navbar from '../Components/Navbar';

const Category = () => {
    const {category} = useParams();
    const [articles,setArticles]=useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASEURL}/category/${category}`)
        .then(res=>{
            setArticles(res.data)
        })
    },[category])
    return (
        <div>
            <Navbar/>
          <div className="min-h-screen p-4 ">
        <h2 className="text-3xl font-bold mb-6">Articles in "{category}"</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map(article => (
            <div key={article._id} className="bg-base-200 p-4 rounded shadow">
              <img src={article.thumbnail} alt={article.title} className="w-full h-40 object-cover mb-4 rounded" />
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className=" mb-2">Author: {article.authorName}</p>
              <p className="text-gray-500 mb-2">{article.date}</p>
              <p className="text-gray-300">{article.content.slice(0, 100)}...</p>
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
        </div>
    );
};

export default Category;