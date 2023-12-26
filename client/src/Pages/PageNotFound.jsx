import React from 'react'
import Layout from '../components/Layout/Layout'
import {Link} from 'react-router-dom'


const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className="pnf">
        <h1 className="pnf_title">404</h1>
        <h2 className="pnf_heading">Oops! Page Not Found</h2>
        <Link to="/" className="pnf_btn">Go Back</Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
