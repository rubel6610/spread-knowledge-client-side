
import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`${import.meta.env.VITE_BASEURL}/topcontributors`).then((res) => {
      setLoading(false);
      setContributors(res.data);
    });
  }, [axiosSecure]);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-300">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }
  return (
    <div className="bg-base-300  p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Top Contributors</h2>
      <ul className="space-y-3">
        {contributors.map((contributor, index) => (
          <li
            key={index}
            className="flex justify-between  p-3 rounded border"
          >
            <span>{contributor.authorName}</span>
            <span className="text-base-content font-semibold">
              {contributor.totalArticle} Articles
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopContributors;
