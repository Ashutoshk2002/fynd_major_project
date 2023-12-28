import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/Cart';
import toast from 'react-hot-toast';
const ProductDetails = () => {

  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug])

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  }

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title={`${product.name} - CollegeCrafters`}>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
            className="img-fluid rounded" alt={product.name}
            height={"300px"} />
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column justify-content-between h-100 p-3">
            <div>
              <h1 className='text-center'>Product Details</h1>
              <hr />
              <h6>Name :{product.name}</h6>
              <h6>Description :{product.description}</h6>
              <h6>Price :{product.price}</h6>
              <h6>Category :{product?.category?.name}</h6>
              <button className='btn btn-light ms-1 btn-outline-dark m-1' onClick={() => {
                        setCart([...cart, product])
                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                        toast.success("Item Added to Cart") 
                      }} style={{ width: '100%' }}>Add to Cart</button>
            </div>
            
          </div>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h4>Similar Product</h4>
        {relatedProduct.length < 1 && (<p className='text-center'>No Similar Product Found</p>)}
        <div className="d-flex flex-wrap">
          {relatedProduct?.map((p) => {
            return (
              <>
                <div className="card m-2" style={{ width: '18rem' }} >
                  <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} height={"300px"} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}</p>
                    <p className="card-text">Rs.{p.price}</p>
                    <button className='btn btn-light ms-1 btn-outline-dark m-1'
                      onClick={() => {
                        setCart([...cart, p])
                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                        toast.success("Item Added to Cart")
                      }}
                    >Add to Cart</button>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails
