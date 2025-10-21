import React from 'react';
import { FaPenFancy, FaComments, FaChartLine, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router';

const Features = () => {
  const features = [
    {
      icon: <FaPenFancy className="text-5xl text-primary" />,
      title: 'Write & Publish',
      description: 'Share your knowledge with the world. Create engaging articles easily.',
      link: '/post-article',
      buttonText: 'Start Writing'
    },
    {
      icon: <FaComments className="text-5xl text-secondary" />,
      title: 'Real-time Chat',
      description: 'Connect with authors and readers. Discuss ideas in real-time.',
      link: '/dashboard',
      buttonText: 'Start Chatting'
    },
    {
      icon: <FaChartLine className="text-5xl text-accent" />,
      title: 'Track Analytics',
      description: 'Monitor your article performance with detailed analytics.',
      link: '/dashboard',
      buttonText: 'View Analytics'
    },
    {
      icon: <FaUsers className="text-5xl text-success" />,
      title: 'Join Community',
      description: 'Be part of a growing community of knowledge enthusiasts.',
      link: '/all-articles',
      buttonText: 'Explore Articles'
    }
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">✨ Platform Features</h2>
          <p className="text-lg text-gray-600">
            Everything you need to share and discover knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="card-title text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <Link to={feature.link} className="btn btn-primary btn-sm">
                  {feature.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
