import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';

const Forgot_Password = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState();
    const [answer, setAnswer] = useState("");
  
    const navigate = useNavigate();

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`,
          { email, newPassword,answer }
        );
        if (res.data.success && res) {
          toast.success(res.data.message);
        
          navigate("/login");
        } else { 
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

  return (
    <Layout title={"Forgot Password - CollegeCrafters"}>
      <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Reset Password</h1>

            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="New Password"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputsecret"
                placeholder="Enter Your Secret Key"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
            
          </form>
        </div>
    </Layout>
  )
}

export default Forgot_Password
