import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import DropIn from "braintree-web-drop-in-react";
const Xerox = () => {

    const [auth, setAuth] = useAuth();
    const [copies, setCopies] = useState(null);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [location, setLocation] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [instance, setinstance] = useState("");


    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            total = pageCount * 10;
            return total.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            });
        } catch (error) {
            console.log(error);
        }
    }

    const PageCountCheck = async () => {
        const formData = new FormData();
        formData.append('file', file);
        if (file) {
            const count = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/xerox/get-count`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setPageCount(count.data.pageCount);
        }
    }


    useEffect(() => {
        if (file)
            PageCountCheck()
    }, [file]);

    //payment
    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    }

    
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const formData = new FormData();
            formData.append('description', description);
            formData.append('file', file);
            formData.append('address', auth?.user?.address);
            formData.append('location', location);
            formData.append('copies', copies);
            formData.append('nonce', nonce);
            formData.append('page_count', pageCount);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/xerox/braintree/payment`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setLoading(false);
            setPageCount(0);
            setFile(null);
            navigate('/');
            toast.success('Payment Completed Successfully');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.token]);



    return (
        <Layout title={"Photocopy- CollegeCrafters"}>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Photocopy Field</div>
                            <div className="card-body">

                                <div className="form-group">
                                    <label htmlFor="file">Select File: </label>
                                    <input type="file" className="form-control-file p-2" accept=".pdf"
                                        onChange={(e) => { setFile(e.target.files[0]) }} name="file" required />
                                </div>
                                <p className=' text-danger'>*Size Limit 16 Mb</p>
                                <div className="form-group ">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" name="description"
                                        onChange={(e) => setDescription(e.target.value)} rows={3} placeholder='Extra information about Photocopy (Optional)' />
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="copies"> No. of Copies</label>
                                    <input type='number' className="form-control" name="copies"
                                        onChange={(e) => setCopies(e.target.value)} required placeholder='' />
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="location">Location</label>
                                    <input type='text' className="form-control" name="location"
                                        onChange={(e) => setLocation(e.target.value)} rows={3} placeholder='Campus location / Shipping Address (Default)' />
                                </div>
                                <p className='m-2 text-danger'>*Login Before Proceeding</p>
                            </div>
                        </div>

                        <div className="text-center p-3">
                            <h4>Payment Summary</h4>
                            <hr />
                            <div className="alert alert-light" role="alert" style={{ lineHeight: '5px' }}>

                                <h5 className='text-center'>Dummy Credentials</h5>
                                <p className="text-center">Card No: 4242 4242 4242 4242</p>
                                <p className="text-center">Expiry Date: 12/25</p>
                                <p className="text-center">CVV: 121</p>
                            </div>
                            <hr />
                            <h4>Page Count: {pageCount} </h4>
                            <h4>Total Price: {totalPrice()} </h4>

                            <div className="mb-3">
                                {auth?.token ? (
                                    <button className='btn btn-outline-warning mt-3'
                                        onClick={() => navigate('/dashboard/user/profile')}>Update Address </button>
                                ) : (
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/login', { state: '/xerox' })}>Please Login to Checkout</button>
                                )}
                            </div>

                            <div className="mt-2">

                                {clientToken && file && copies !== null ? (
                                    <>
                                        {clientToken && (
                                            <DropIn
                                                options={{
                                                    authorization: clientToken,
                                                    paypal: {
                                                        flow: 'vault'
                                                    },
                                                    googlePay: {
                                                        merchantId: '1234',
                                                        transactionInfo: {
                                                            currencyCode: "INR",
                                                            countryCode: "IN",
                                                            totalPriceStatus: "FINAL",
                                                            totalPrice: totalPrice(),
                                                            checkoutOption: "DEFAULT"
                                                        }
                                                    }
                                                }}
                                                onInstance={instance => setinstance(instance)}
                                            />
                                        )}
                                        <button className='btn btn-primary' onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}>
                                            {loading ? 'Processing...' : 'Make Payment'}
                                        </button>
                                    </>
                                ) : null}

                            </div>
                        </div>



                    </div>
                </div>
            </div>



        </Layout>
    )
}

export default Xerox
