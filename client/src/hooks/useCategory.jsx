import {useState,useEffect} from 'react';
import axios from 'axios';


export default function useCategory(){
    const [categories,setCategories]=useState([]);

    //get categories
    const getCategories=async()=>{
        try {
            const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-categories`);
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getCategories();
    },[])
    
    return categories;
}
