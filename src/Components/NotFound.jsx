import React from 'react';
import {  useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col items-center justify-center  p-4">
           
            <h2 className="text-4xl font-bold mb-4">Lost in Knowledge?</h2>
            <p className=" mb-6 text-center">
                The page you are looking for doesn't exist. <br />
                Maybe it's hidden in a secret book!
            </p>
            <button onClick={()=>navigate(-1)} className="btn btn-primary ">
                Back to Home
            </button>
        </div>
    );
};

export default NotFound;
