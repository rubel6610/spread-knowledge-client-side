import axios from "axios";
import React, { useEffect, useState } from "react";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/topcontributors`).then((res) => {
      setLoading(false);
      setContributors(res.data);
    });
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }
  return (
    <div className="  p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Top Contributors</h2>
      <ul className="space-y-3">
        {contributors.map((contributor, index) => (
          <li
            key={index}
            className="flex justify-between  p-3 rounded border"
          >
            <span>{contributor.authorName}</span>
            <span className="text-yellow-400 font-semibold">
              {contributor.totalArticle} Articles
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopContributors;
