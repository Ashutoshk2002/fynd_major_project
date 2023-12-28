import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const getProductByCay = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-category/${params.slug}`);
            setProduct(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) getProductByCay();
    }, [params?.slug])
    return (

        <Layout>
            <div className="container">
                <h4 className='text-center'>{category?.name}</h4>
                <h6 className='text-center'>{products?.length} result found</h6>
                <div className="row">
                    <div className="col-md-9 offset-1">
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => {
                                return (
                                    <>
                                        <div className="card m-2" style={{ width: '18rem' }} >
                                            <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} height={"300px"} />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text">{p.description.substring(0, 30)}</p>
                                                <p className="card-text">Rs.{p.price}</p>
                                                <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                                <button className='btn btn-secondary ms-1'>Add to Cart</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct
