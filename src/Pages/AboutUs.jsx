import React from 'react';
import { Link } from 'react-router';

const AboutUs = () => {
    return (
        <div className="min-h-screen  p-6 flex flex-col items-center justify-center">
            <div className="max-w-3xl text-center">
                <h2 className="text-4xl font-bold mb-4">About Us</h2>
                <p className=" mb-6">
                    Welcome to <span className="text-primary font-semibold">Spread Knowledge</span> – a platform dedicated to sharing valuable knowledge across a variety of topics including technology, science, arts, and more.
                </p>
                <p className=" mb-6">
                    Our mission is to create a community where people can learn, share, and grow together. Whether you are a writer or a reader, Spread Knowledge is your destination for insightful articles written by passionate contributors.
                </p>
                <p className=" mb-6">
                    Thank you for being a part of our journey. Let's continue to spread knowledge together.
                </p>

                <Link to="/" className="btn btn-primary ">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default AboutUs;
