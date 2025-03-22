import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import logo from '../../assets/images/levels_derm_logo.png'
import { AdminToken } from '../Context/AdminToken.js'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Dashboard() {

    const BASE_URL = 'https://levelsodermclinic.up.railway.app'
    let { adminToken, setAdminToken} = useContext(AdminToken) 
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    let navigate = useNavigate()

    
    const logOut = () => {
        localStorage.removeItem('adminToken')
        setAdminToken(null)
        navigate('/login')
    }

    const getMessages = async() => {
        setLoading(true)
        let {data} = await axios.get(`${BASE_URL}/api/messages`,{
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
              }
              
        })
        console.log(data)
        setMessages(data)
        setLoading(false)
    }

    useEffect(()=>{
        getMessages()
    },[])

  return <>
    <Helmet>
    <title>Dashboard</title>
    </Helmet>

    {loading? <div className='bg-black position-absolute top-0 bottom-0 end-0 start-0'></div>
    :<>
        {/* navbar */}
        <nav className={`navbar bg-white py-0 shadow-sm roboto position-sticky top-0 start-0 end-0 z-3`}>
        <div className="container-lg px-5 vh-12">
            <div className="navbar-brand h-100">
            <img className='w-100 h-100' src={logo} alt="Levels Der /m Clinic" />
            </div>
            <button onClick={logOut} className='btn btn-main rounded-1 lh-sm'>
                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                <span>Logout</span>
            </button>
        </div>
    </nav>

    {/* dashboard */}
    <div className="dashboard bg-light vh-88 w-100 d-flex justify-content-center">
        <div className='container-lg px-5 mx-auto py-5'>
            <div className="row h-100">
                <div className="col-lg-2 col-md-3 col-sm-4">
                    <div className='border-end border-dark-subtle h-100'>
                        <ul className="nav flex-sm-column nav-tabs m-auto d-flex justify-content-evenly align-items-start border-0" id="myTab" role="tablist">
                            <li className="nav-item mb-4" role="presentation">
                                <button className="nav-link bg-transparent px-0 text-main text-capitalize fs-5 fw-medium position-relative border-0 active" id="messages-tab" data-bs-toggle="tab" data-bs-target="#messages-tab-pane" type="button" role="tab" aria-controls="messages-tab-pane" aria-selected="true">messages</button>
                            </li>
                            <li className="nav-item mb-4" role="presentation">
                                <button className="nav-link bg-transparent px-0 text-main text-capitalize fs-5 fw-medium position-relative border-0" id="services-tab" data-bs-toggle="tab" data-bs-target="#services-tab-pane" type="button" role="tab" aria-controls="services-tab-pane" aria-selected="false">services</button>
                            </li>
                            <li className="nav-item mb-4" role="presentation">
                                <button className="nav-link bg-transparent px-0 text-main text-capitalize fs-5 fw-medium position-relative border-0" id="social-tab" data-bs-toggle="tab" data-bs-target="#social-tab-pane" type="button" role="tab" aria-controls="social-tab-pane" aria-selected="false">social</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='offset-lg-1 col-md-9 col-sm-8'>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="messages-tab-pane" role="tabpanel" aria-labelledby="messages-tab" tabIndex="0">
                            <div className="row g-5">
                                {messages.length > 0 ? (messages.map((message) => <div key={message.id} className="col-md-6">
                                    <div className="bg-light h-100 border shadow rounded-3 p-3">
                                        <button className=' btn border-0 text-end w-100'>
                                            <i className="fa-solid fa-trash-can fs-5 text-danger"></i>
                                        </button>
                                        <p><span className='fw-medium'>Name: </span><span className='text-capitalize'>sara adel</span></p>
                                        <p className='py-2'><span className='fw-medium'>Phone: </span><span>0102938334</span></p>
                                        <p className='fw-medium'>Services:</p>
                                        <ul>
                                            <li>denmaa</li>
                                            <li>denmaa</li>
                                            <li>denmaa</li>
                                            <li>denmaa</li>
                                        </ul>
                                    </div>
                                </div>)):'no messages'}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="services-tab-pane" role="tabpanel" aria-labelledby="services-tab" tabIndex="0">
                            <div className='vh-88 bg-warning w-100'>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="social-tab-pane" role="tabpanel" aria-labelledby="social-tab" tabIndex="0">
                            <div className='vh-88 bg-danger w-100'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>}
  </>
}
