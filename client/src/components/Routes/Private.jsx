import { useState,useEffect } from "react";
import {useAuth} from '../../context/auth'
import {Outlet} from 'react-router-dom'
import axios from 'axios'
import Spinner from "../Spinner";

export default function PrivateRoute(){
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()

    useEffect(()=>{
        const authCheck=async()=>{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/user_auth`);
            console.log(res.data.ok);
            if(res.data.ok){
                console.log(res.data.ok);
                setOk(true)
            }else{
                setOk(false)
            } 
            // console.log(res);
        }
        // console.log(ok);
        if(auth?.token) authCheck()
    },[auth?.token])

    return ok? <Outlet/>:<Spinner/>
}