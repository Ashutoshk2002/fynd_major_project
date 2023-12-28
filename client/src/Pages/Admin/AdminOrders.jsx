import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import axios from 'axios';
import { Select } from 'antd';
const { Option } = Select
const AdminOrders = () => {
  const [status, setStatus] = useState(["Not Process", "Processing", "Shipping", "Delivered", "Cancelled"]);
  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/all-orders`);
      setOrders(data);
      console.log(data, orders);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/auth/order-status/${orderId}`,
        { status: value });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title={"All Orders"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>All Orders</h1>
          <div className="border shadow">
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Sr.No</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Buyer</th>
                  <th scope='col'>Date</th>
                  <th scope='col'>Payment</th>
                  <th scope='col'>Quantity</th>
                </tr>
              </thead>
              {
                orders?.map((order, index) => {
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <Select bordered={false} onChange={(value) => handleChange(order._id, value)} defaultValue={order?.status}>
                              {status.map((s, i) => (
                                <Option key={i} value={s}>{s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{order?.buyer.name}</td>
                          <td>{moment(order?.createdAt).fromNow()}</td>
                          <td>{order?.payment.success ? "Success" : "Failed"}</td>
                          <td>{order?.products?.length}</td>
                        </tr>
                      </tbody>
                      <div className="container">

                        {order?.products?.map(p => (
                          <>
                            <div className="row mb-2 p-3 card flex-row">
                              <div className="col-md-4">
                                <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={"100px"} height={"100px"} />
                              </div>
                              <div className="col-md-8">
                                <p>{p.name}</p>
                                <p>{p.description.substring(0, 30)}</p>
                                <p>{p.price}</p>
                              </div>
                            </div>
                          </>
                        ))
                        }
                      </div>

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

export default AdminOrders
