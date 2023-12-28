import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';
const PhotoCopy = () => {

    const [task, setTask] = useState([]);
    const [auth, setAuth] = useAuth();

    function displayPDF(buffer) {
        // Convert the buffer into a Blob
        const blob = new Blob([new Uint8Array(buffer)], { type: 'application/pdf' });

        // Create an object URL for the Blob
        const url = URL.createObjectURL(blob);

        // Open the PDF in a new tab
        window.open(url, '_blank');
    }

    const getFile = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/get-files`);
            setTask(data);

        } catch (error) {
            console.log(error);
            toast.error('Error while getting File');
        }
    }
    useEffect(() => {
        if (auth?.token) getFile();
    }, [auth?.token]);


    return (
        <Layout title={"PhotoCopy"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>PhotoCopy List</h1>

                        <div className="border shadow">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Sr.No</th>
                                        <th scope='col'>Filename</th>
                                        <th scope='col'>PDF</th>
                                        <th scope='col'>Page Count</th>
                                        <th scope='col'>Copies</th>
                                        <th scope='col'>Owner</th>
                                        <th scope='col'>Address</th>
                                        <th scope='col'>Date</th>
                                    </tr>
                                </thead>
                                {
                                    task?.pdf?.map((item, index) => {
                                        return (
                                            <>
                                                <tbody>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.filename.substring(0, 10)}</td>
                                                        <td><Link to="#" onClick={() => displayPDF(item.pdf.data.data)}>{item.filename.substring(0, 10)}</Link></td>
                                                        <td>{item.page_count}</td>
                                                        <td>{item.copies}</td>
                                                        <td>{item.owner.name}</td>
                                                        <td>{item.location}</td>
                                                        <td>{moment(item?.createdAt).fromNow()}</td>
                                                    </tr>
                                                </tbody>

                                            </>
                                        )
                                    })

                                }
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PhotoCopy
