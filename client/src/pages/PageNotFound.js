/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/style-prop-object */
import { Link } from '@mui/material'
import React from 'react'

const PageNotFound = () => {
  return (
    <div className="px-4 pt-5 my-5 text-center">
        <Link color="inherit" href="/">
            <img alt="GTrack Logo" width={150} className='mb-4' src='/images/gtrack-logo-1.png'></img>
        </Link>
        <h1 className="display-4 fw-bold">404 | Page not found</h1>
        <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">We could not find what you're looking for.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <a type="button" href='/' className="btn btn-success btn-md px-4 me-sm-3">Go back home</a>
        </div>
        </div>
  </div>
  )
}

export default PageNotFound