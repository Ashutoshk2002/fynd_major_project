import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
const Profile = () => {

  //context
  const [auth, setAuth] = useAuth();
  //state

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/auth/profile`,
        { name, email, password, phone, address })
      if (data?.error) {
        toast.error(data?.error)
      } else {
        setAuth({ ...auth, user: data?.updatedUser })
        console.log(data?.updatedUser);
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data?.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success('Profile Updated Successfully')
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  //get user data
  useEffect(() => {
    if (auth && auth.user) {
      const { name, email, phone, address } = auth.user
      setName(name)
      setEmail(email)
      setPhone(phone)
      setAddress(address)
    }
  }, [auth,auth.user])

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"><UserMenu /></div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h1>User Profile</h1>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Full Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder="Email"

                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"

                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputNumber"
                    placeholder="Phone Number"

                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Address"

                  />
                </div>
                <div className="mb-3">
                  <input
                    type="string"
                    value={auth?.user?.prn_no}
                    onChange={(e) => setPrn(e.target.value)}
                    className="form-control"
                    id="exampleInputPrn"
                    placeholder="PRN Number"
                    disabled
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
