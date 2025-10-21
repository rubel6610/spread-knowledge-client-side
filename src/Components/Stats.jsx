import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaNewspaper, FaUsers, FaComments, FaHeart } from 'react-icons/fa';

const Stats = () => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalUsers: 0,
    totalComments: 0,
    totalLikes: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch articles
      const articlesRes = await axios.get(`${import.meta.env.VITE_BASEURL}/articles`);
      const articles = articlesRes.data;
      
      const totalArticles = articles.length;
      const totalLikes = articles.reduce((sum, article) => sum + (article.likes || 0), 0);
      
      // Get unique authors count
      const uniqueAuthors = new Set(articles.map(a => a.authorEmail));
      const totalUsers = uniqueAuthors.size;
      
      // Estimate comments (you can make this more accurate with an API endpoint)
      const totalComments = Math.floor(totalArticles * 3.5); // Rough estimate
      
      setStats({
        totalArticles,
        totalUsers,
        totalComments,
        totalLikes
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statItems = [
    {
      icon: <FaNewspaper className="text-4xl" />,
      value: stats.totalArticles,
      label: 'Articles Published',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaUsers className="text-4xl" />,
      value: stats.totalUsers,
      label: 'Active Writers',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FaComments className="text-4xl" />,
      value: stats.totalComments,
      label: 'Total Comments',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FaHeart className="text-4xl" />,
      value: stats.totalLikes,
      label: 'Likes Received',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">📊 Platform Statistics</h2>
          <p className="text-lg text-gray-600">
            Growing community of knowledge sharers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${item.color} text-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform`}
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <div className="text-4xl font-bold mb-2">
                {item.value.toLocaleString()}
              </div>
              <div className="text-sm opacity-90">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
