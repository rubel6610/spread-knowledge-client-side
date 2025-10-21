import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      Swal.fire({
        icon: 'success',
        title: 'Subscribed!',
        text: 'Thank you for subscribing to our newsletter!',
        showConfirmButton: false,
        timer: 2000
      });
      setEmail('');
    }
  };

  return (
    <div className="bg-gradient-to-b from-base-200 to-base-300 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold  mb-4">
          📧 Subscribe to Our Newsletter
        </h2>
        <p className=" text-lg mb-8 opacity-90">
          Get the latest articles and updates delivered directly to your inbox
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="input input-lg w-full sm:w-96 bg-white text-gray-800"
            required
          />
          <button type="submit" className="btn btn-lg bg-base-200 text-primary hover:bg-gray-100 border-none">
            Subscribe Now
          </button>
        </form>
        <p className=" text-sm mt-4 ">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
