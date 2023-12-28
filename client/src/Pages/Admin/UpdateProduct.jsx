import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
const { Option } = Select
//toast error *
const UpdateProduct = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState();
    const [photo, setPhoto] = useState('');
    const [shipping, setShipping] = useState('');
    const [id, setId] = useState("");


    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setCategory(data.product.category._id);
            setPhoto(data.product.photo);
            setId(data.product._id);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    useEffect(() => {
        getSingleProduct();
        // eslint-disable-next-line 
    }, [])

    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-categories`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while fetching categories');
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    //update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('quantity', quantity);
            productData.append('price', price);
            productData.append('shipping', shipping);
            photo && productData.append('photo', photo);
            productData.append('category', category);
            const { data } = axios.put(`${import.meta.env.VITE_API_URL}/api/v1/product/update-product/${id}`, productData);
            //toast error
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success('Product Updated Successfully');
                navigate('/dashboard/admin/products');
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    //delete product
    const handleDelete=async()=>{ 
        try {
            let answer=window.prompt('Are You Sure want to delete this product ?');
            if(!answer) return
            const {data}=await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/product/delete-product/${id}`)
            console.log(data);
            toast.success('Product delete successfully')
            navigate('/dashboard/admin/products')
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout title={"Dashboard - Create Products"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select bordered={false}
                                placeholder='Select a category' size='large'
                                showSearch className='form-select mb-3'
                                onChange={(value) => { setCategory(value) }} value={category}>
                                {categories.map((c) => (
                                    <>
                                        <Option key={c._id} value={c._id}>{c.name}</Option>
                                    </>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : 'Upload Photo'}
                                    <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className="mb-3 p-1">
                                {photo ? (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive' />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${id}`} alt="product_photo" height={'200px'} className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className="md-3 p-2">
                                <input type="text" value={name} placeholder='Write a name' className='form-control' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="md-3 p-2">
                                <textarea type="text" value={description} placeholder='Write a description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="md-3 p-2">
                                <input type="number" value={price} placeholder='Write a Price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="md-3 p-2">
                                <input type="number" value={quantity} placeholder='Write a quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="md-3 p-2">
                                <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => { setShipping(value) }} value={shipping ? "Yes" : "No"}>
                                    <Option value='1'>Yes</Option>
                                    <Option value='0'>No</Option>
                                </Select>
                            </div>
                            <div className="mb-3 text-center">
                                <button className='btn btn-primary m-2' onClick={handleUpdate}>Update Product</button>
                                <button className='btn btn-danger m-2' onClick={handleDelete}>Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
