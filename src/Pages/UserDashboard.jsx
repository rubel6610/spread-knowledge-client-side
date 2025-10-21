import React, { useState, useEffect } from 'react';
import { FaChartLine, FaComments, FaPlusCircle, FaNewspaper } from 'react-icons/fa';
import Analytics from '../Components/Analytics';
import Chat from '../Components/Chat';
import PostArticle from './PostArticle';
import MyArticles from './MyArticles';
import { useLocation } from 'react-router';

const UserDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'analytics');

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: <FaChartLine className="w-5 h-5" /> },
    { id: 'myarticles', name: 'My Articles', icon: <FaNewspaper className="w-5 h-5" /> },
    { id: 'postarticle', name: 'Post Article', icon: <FaPlusCircle className="w-5 h-5" /> },
    { id: 'chat', name: 'Chat', icon: <FaComments className="w-5 h-5" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <Analytics />;
      case 'myarticles':
        return <MyArticles />;
      case 'postarticle':
        return <PostArticle />;
      case 'chat':
        return <Chat />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">User Dashboard</h1>
          <p className="text-center text-gray-600">Manage your articles, analytics, and chat with other users</p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-base-100 rounded-lg shadow-xl p-2 mb-6">
          <div className="tabs tabs-boxed bg-base-100 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab tab-lg gap-2 flex-1 min-w-[120px] ${
                  activeTab === tab.id ? 'tab-active bg-primary text-primary-content' : ''
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-base-100 rounded-lg shadow-xl">
          <div className="p-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
