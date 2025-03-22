import React, { useContext, useState } from 'react'
import logo from '../../assets/images/logo.png'
import videoBackground from '../../assets/images/Reel02.mp4'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AdminToken } from '../Context/AdminToken.js'

export default function Login() {

    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(false)
    let {setAdminToken} = useContext(AdminToken)
    let navigate = useNavigate()

    async function loginSubmit(values){
        setLoading(true)
       let {data} = await axios.post('https://levelsodermclinic.up.railway.app/api/login',values)
       .catch((err)=>{
        setApiError(err.response.data.error)
        setLoading(false)
       })
       if (data.token){
        setLoading(false)
        localStorage.setItem('adminToken', data.token)
        setAdminToken(data.token)
        navigate('/dashboard')
       }
      }
    
      let validationSchema = yup.object({
          email: yup.string().required('Email is required').email('invalid email'),
          password: yup.string().required('Password is required'),
      })
    
      let formik = useFormik({
        initialValues:{
          email:'',
          password:'',
        },validationSchema
        ,onSubmit:loginSubmit
      })

  return <>
    <Helmet>
        <title>Admin Login</title>
    </Helmet>
    <div className={`bg-black-60 vh-100 w-100 d-flex align-items-center justify-content-center roboto`}>
        <video autoPlay muted loop playsInline className="bg-video">
            <source src={videoBackground} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className='container-lg px-5 mx-auto py-sm-0 py-5'>
            <div className="row justify-content-center m-0">
                <div className="col-xl-6 col-md-8">
                    <div className='row justify-content-center text-center px-sm-5 px-2 bg-white shadow rounded-1 py-5'>
                        <div className='col-lg-3 col-sm-4 col-6'>
                            <div>
                                <img loading='lazy' className='w-100' src={logo} alt="logo" />
                            </div>    
                        </div>    
                        <div className='col-12'>
                            <div>
                                <p className='fs-4 text-uppercase text-main fw-bold mb-1 text-center letter-spacing'>Admin Login</p>
                                <p className='text-body-tertiary'></p>
                            </div>
                            <form onSubmit={formik.handleSubmit} className='mt-4'>
                                {apiError ?<div className="alert alert-danger">{apiError}</div>:''} 
                                <div className="position-relative">
                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" type="email" placeholder="Enter your email" name="email" className="form-control py-2 bg-body-secondary mb-3 ps-5" />
                                    <i className="fa fa-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                                </div>
                                {formik.errors.email && formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>: ''}
                                    
                                <div className="position-relative">
                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id="password" type="password" placeholder="Enter your password" name="password" className="form-control py-2 bg-body-secondary mb-3 ps-5" />
                                    <i className="fa fa-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                                </div>
                                {formik.errors.password && formik.touched.password?<div className="alert alert-danger py-2">{formik.errors.password}</div>: ''}

                                {loading? <button type='button' className='btn btn-main'>
                                    <i className='fas fa-spinner fa-spin'></i>
                                </button>
                                :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-main'>Login</button>
                                }
                            </form>
                        </div>                
                    </div>                    
                </div>
            </div>
        </div>
    </div>
  </>
}
