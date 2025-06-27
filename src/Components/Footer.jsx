import React from 'react';
import { Link } from 'react-router';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className=" p-6 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold">Spread Knowledge</h2>
                </div>

                <div className="flex gap-6 mb-4 md:mb-0">
                    <Link to="/about" className="hover:underline">About Us</Link>
                    <Link to="/contact" className="hover:underline">Contact Us</Link>
                    <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
                </div>

         
                <div className="flex gap-4">
                    <a href="https://twitter.com" target="_blank" >
                        <FaTwitter className="text-xl hover:text-blue-400" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" >
                        <FaLinkedin className="text-xl hover:text-blue-400" />
                    </a>
                </div>
            </div>

        
            <div className="text-center mt-4 ">
                © {new Date().getFullYear()} Spread Knowledge. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
