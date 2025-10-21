import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Content Creator',
      image: 'https://i.pravatar.cc/150?img=1',
      text: 'Spread Knowledge has transformed how I share my ideas. The platform is intuitive and the community is amazing!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Blogger',
      image: 'https://i.pravatar.cc/150?img=3',
      text: 'Best knowledge-sharing platform I\'ve used. The chat feature makes collaboration so easy!',
      rating: 5
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'Educator',
      image: 'https://i.pravatar.cc/150?img=5',
      text: 'I love how easy it is to publish articles and engage with readers. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="py-16 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">💬 What Our Users Say</h2>
          <p className="text-lg text-gray-600">
            Join thousands of satisfied content creators and readers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <FaQuoteLeft className="text-3xl text-primary opacity-20 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
