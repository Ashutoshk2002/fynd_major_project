import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const [clientToken, setClientToken] = useState("")
    const [instance, setinstance] = useState("")
    const [loading, setLoading] = useState(false)

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => {
                total = total + item.price
            })
            return total.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            });
        } catch (error) {
            console.log(error);
        }
    }

    //remove from cart
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error);
        }
    }

    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
        }
    }


    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/braintree/payment`, { nonce, cart })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success('Payment Completed Successfully')
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.token])

    return (
        <Layout title={"Cart"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length ? `You have ${cart.length} items in your cart ${auth?.token ? "" :
                                "Please login to Checkout"}` : "Your Cart is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            {
                                cart?.map(p => (
                                    <>
                                        <div className="row mb-2 p-3 card flex-row">
                                            <div className="col-md-4">
                                                <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={"100px"} height={"100px"} />
                                            </div>
                                            <div className="col-md-8">
                                                <p>{p.name}</p>
                                                <p>{p.description.substring(0, 30)}</p>
                                                <p>{p.price}</p>
                                                <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove Item</button>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}>Update Address </button>
                                ) : (
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/login', { state: '/cart' })}>Please Login to Checkout</button>
                                )}
                            </div>
                        )}
                        <div className="mt-2">
                            {!clientToken || !cart?.length ? ("") : (
                                <>
                                    {clientToken && (<DropIn
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
                                    />)}
                                    <button className='btn btn-primary' onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}>
                                        {loading ? 'Processing...' : 'Make Payment'}
                                    </button>
                                </>)}

                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    )
}

export default CartPage
