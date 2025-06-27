import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const EditorChoice = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/editorchoice`).then((res) => {
      setArticles(res.data);
    });
  }, []);
  return (
    <div className="p-4  mt-4">
      <h2 className="text-2xl font-bold mb-4">Editor's Choice</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div key={article._id} className="bg-gray-800 p-4 rounded shadow">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="text-md font-bold mb-2">{article.title}</h3>
            <p className=" mb-2">Author: {article.authorName}</p>
            <p className="text-gray-300">{article.content.slice(0, 80)}...</p>
             <Link to={`/all-articles/${article._id}`}
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

export default EditorChoice;
