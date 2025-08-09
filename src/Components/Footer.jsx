import React from 'react';
import { Link } from 'react-router';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className=" py-10 mt-4 bg-base-300 ">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold">Spread Knowledge</h2>
                </div>

                <div className="flex gap-6 mb-4 md:mb-0">   
                      <Link to="/" className="hover:underline">Home</Link>  
                    <Link to="/all-articles" className="hover:underline">All Articles</Link>
                    <Link to="/about" className="hover:underline">About Us</Link>
                 
                
                </div>

         
                <div className="flex gap-4">
                    <a href="https://github.com/rubel6610" target="_blank" >
                        <FaGithub className="text-xl hover:text-blue-400" />
                    </a>
                    <a href="https://linkedin.com/in/rubelhosen13" target="_blank" >
                        <FaLinkedin className="text-xl hover:text-blue-400" />
                    </a>
                </div>
            </div>

        
            <div className="text-center mt-6 ">
                © {new Date().getFullYear()} Spread Knowledge. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
