import React, { useState, useEffect } from 'react';
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={"All Categories"}>
            
            <div className="container mt-5">
                <div className="row row-cols-1 row-cols-md-2 g-3">
                    {categories.map(c => (
                        <div className="col" key={c._id}>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{c.name}</h5>
                                    <Link to={`/category/${c.slug}`} className="btn btn-light">
                                        View Category
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories
