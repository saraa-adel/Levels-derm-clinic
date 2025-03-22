import React from 'react'
import notFound from '../../assets/images/404 error with people holding the numbers-amico.svg'
import { Link } from 'react-router-dom'
 
export default function NotFound() {
  return <>
    <div className='vh-100 d-flex container-lg flex-column justify-content-center align-items-center'>
        <p className='text-secondary-emphasis fs-1 fw-bold'>Page Not Found</p>
        <div className='w-100 h-50 pb-5'>
            <img className='w-100 h-100' src={notFound} alt="not found" />
        </div>
        <Link className='btn btn-main' to={'/'}>Back to home</Link>
    </div>
  </>
}
