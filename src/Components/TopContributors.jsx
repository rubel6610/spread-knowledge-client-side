import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import NoDataFound from "./NoDataFound";

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
      <div className="min-h-[300px] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            🏆 Top Contributors
          </h2>
          <p className="text-base-content/70 text-lg">Celebrating our most active writers</p>
        </div>

        {contributors.length === 0 ? (
          <NoDataFound 
            message="No Contributors Yet" 
            description="Be the first to share your knowledge and become a top contributor!" 
            showButton={true}
            buttonText="Post Article"
            buttonLink="/post-article"
          />
        ) : (
          <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="bg-gradient-to-r from-primary to-secondary text-primary-content">
                  <tr>
                    <th className="text-lg">Rank</th>
                    <th className="text-lg">Author</th>
                    <th className="text-lg">Articles</th>
                    <th className="text-lg">Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.map((contributor, index) => (
                    <tr 
                      key={index}
                      className="hover:bg-base-200 transition-colors border-b border-base-300"
                    >
                      <td>
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <span className="text-3xl">🥇</span>
                          )}
                          {index === 1 && (
                            <span className="text-3xl">🥈</span>
                          )}
                          {index === 2 && (
                            <span className="text-3xl">🥉</span>
                          )}
                          {index > 2 && (
                            <span className="text-xl font-bold text-base-content/60">#{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className={`rounded-full w-12 ${
                              index === 0 ? 'bg-yellow-500' :
                              index === 1 ? 'bg-gray-400' :
                              index === 2 ? 'bg-orange-600' :
                              'bg-primary'
                            } text-white`}>
                              <span className="text-lg font-bold">
                                {contributor.authorName?.charAt(0) || 'A'}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-lg">{contributor.authorName}</div>
                            <div className="text-sm text-base-content/60">{contributor._id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-xl font-bold text-primary">{contributor.totalArticle}</span>
                          <span className="text-sm text-base-content/60">articles</span>
                        </div>
                      </td>
                      <td>
                        {index === 0 && (
                          <span className="badge badge-warning badge-lg gap-2 shadow-lg">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Legend
                          </span>
                        )}
                        {index === 1 && (
                          <span className="badge badge-info badge-lg gap-2">
                            Expert
                          </span>
                        )}
                        {index === 2 && (
                          <span className="badge badge-success badge-lg gap-2">
                            Pro
                          </span>
                        )}
                        {index > 2 && (
                          <span className="badge badge-primary badge-lg">
                            Active
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopContributors;
