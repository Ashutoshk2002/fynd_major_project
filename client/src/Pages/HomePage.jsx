import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Button, Checkbox, Radio } from 'antd';
import toast from 'react-hot-toast';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
const HomePage = () => {

  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-categories`)
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while fetching categories')
    }
  }

  useEffect(() => {
    getAllCategory(), getTotal()
  }, [])


  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts()
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio]);


  //get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  }

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/product-filters`, { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title={"CollegeCrafters- Shop Now"}>
      {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
      <div className="row mt-3">
        {/* Filter Dropdown for Small Screens */}
        <div className="col-12 d-md-none">
          <div className="dropdown mt-2 text-center">
            <button
              className="btn btn-light btn-outline-dark dropdown-toggle"
              type="button"
              id="filterDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
            Filter
            </button>
            <hr />
            <div className="dropdown-menu p-1" aria-labelledby="filterDropdown">
              <h4 className='text-center'>Filter by Category</h4>
              <hr />
              <div className="d-flex flex-column">
                {categories?.map((c) => {
                  return (
                    <>
                      <Checkbox className='' key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                        <span className='fs-6'>{c.name}</span>
                      </Checkbox>
                    </>
                  )
                })}
              </div>
              {/* Price filter */}
              <h4 className='text-center mt-4'>Filter by Price</h4>
              <hr />
              <div className="d-flex flex-column ">
                <Radio.Group onChange={e => setRadio(e.target.value)}>
                  {Prices?.map((p) =>
                  (
                    <div className='m-1' key={p._id}>
                      <Radio value={p.array}>
                        <span className='fs-6'>{p.name}</span>
                      </Radio>
                    </div>
                  )
                  )}
                </Radio.Group>
              </div>

              <div className="d-flex flex-column mt-1 text-center">
                <button className='btn btn-danger p-1 mx-auto' style={{ width: "100px", height: "40px" }} onClick={() => window.location.reload()}>Reset Filters</button>
              </div>
            </div>
          </div>
        </div>
        {/* Filter column for Medium and larger screens */}
        <div className="col-md-3 m-3 p-4 order-md-1 order-2" style={{ borderRight: '2px solid black' }}>
          <h4 className='text-center'>Filter by Category</h4>
          <hr />
          <div className="d-flex flex-column">
            {categories?.map((c) => {
              return (
                <>
                  <Checkbox className='' key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                    <span className='fs-6'>{c.name}</span>
                  </Checkbox>
                </>
              )
            })}
          </div>
          {/* Price filter */}
          <h4 className='text-center mt-4'>Filter by Price</h4>
          <hr />
          <div className="d-flex flex-column ">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map((p) =>
              (
                <div className='m-1' key={p._id}>
                  <Radio value={p.array}>
                    <span className='fs-6'>{p.name}</span>
                  </Radio>
                </div>
              )
              )}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column mt-1 text-center">
            <button className='btn btn-danger p-1 mx-auto' style={{ width: "100px", height: "40px" }} onClick={() => window.location.reload()}>Reset Filters</button>
          </div>
        </div>
        <div className="col-md-8 order-md-2 order-1">
          <h1 className="text-center">All Products</h1>
          <hr />
          <div className="d-flex flex-wrap justify-content-start">
            {products?.map((p) => {
              return (
                <>
                  <div className="card m-2" style={{ width: '18rem' }} >
                    <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} height={"300px"} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description.substring(0, 30)}</p>
                      <p className="card-text">Rs.{p.price}</p>
                      <button className='btn btn-light ms-1 btn-outline-dark m-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                      <button className='btn btn-light ms-1 btn-outline-dark m-1'
                        onClick={() => {
                          setCart([...cart, p])
                          localStorage.setItem('cart', JSON.stringify([...cart, p]))
                          toast.success("Item Added to Cart")
                        }}>Add to Cart</button>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          <div className='m-2 p-3 text-center'>
            {products && products.length < total && (
              <button className='btn btn-light btn-outline-dark' onClick={(e) => { e.preventDefault(); setPage(page + 1) }}>
                {loading ? 'Loading...' : 'Load more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
