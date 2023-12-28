import React from 'react';
import { useSearch } from '../../context/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="d-flex" role='search' onSubmit={handleSubmit}>
                <input className="form-control form-control-sm m-1" style={{height:"35px"}} type="search"
                    placeholder="Search" aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button className="btn btn-sm btn-outline-dark p-1 m-1" style={{height:"35px"}} type="submit">Search</button>
            </form>

        </>
    )
}

export default SearchInput
