import axios from 'axios';
import React from 'react';
const instance =axios.create({
    baseURL:import.meta.env.VITE_BASEURL
})
const UseAxiosSecure = () => {

    instance.interceptors.request.use(config=>{
        console.log(config);
        return config;
    })

    return (
        <div>
            
        </div>
    );
};

export default UseAxiosSecure;