import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend,BiPhoneCall,BiSupport } from "react-icons/bi";



const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img src="./src/assets/cs.jpg" alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
          <p className="text-justify mt-2">
            Any Query and Info about Product..Feel free to reach us, We're 24X7 available
          </p>
          <p className="mt-3"><BiMailSend />:www.help@CollegeCrafters.com</p>
          <p className="mt-3"><BiPhoneCall />:012-345678910</p>
          <p className="mt-3"><BiSupport />:1800-0000-0000</p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
