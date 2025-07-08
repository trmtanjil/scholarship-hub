import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure =axios.create({
    baseURL:`http://localhost:5000`
});

const useAxiosSecure = () => {
    const {user,logOut}=useAuth();

    const navigate =useNavigate()

    axiosSecure.interceptors.request.use(config =>{
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }),error=>{
        return Promise.reject(error)
    }


    axiosSecure.interceptors.response.use(res =>{
        return res;
    },error=>{
        console.log('error inside the inter ceptor', error.status);
        const status = error.status;
        if(status ===403){
            navigate('/forbidden')
        }
        else if(status ===401){
            logOut()
            .then(()=>{
                navigate('/login')
            })
            .catch(()=>{
                
            })
        }
    })




    return  axiosSecure;
};

export default useAxiosSecure;