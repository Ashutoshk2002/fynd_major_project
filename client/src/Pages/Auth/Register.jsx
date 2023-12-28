import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import '../../styles/AuthStyles.css';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState("");
    const [prn_no, setPrn] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, 
            { name, email, password, phone, prn_no, address, answer });
            if (res.data.success && res) {
                toast.success(res.data.message);
                navigate("/login");
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout title={"Register-CollegeCrafters"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1>Register Here</h1>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Full Name"
                            required
                        />
                    </div>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputNumber"
                            placeholder="Phone Number"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="Address"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={prn_no}
                            onChange={(e) => setPrn(e.target.value)}
                            className="form-control"
                            id="exampleInputprn"
                            placeholder="PRN Number"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputans"
                            placeholder="Enter Secret Key for Recovery"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register
