import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import logo from '../../assets/images/levels_derm_logo.png'
import { AdminToken } from '../Context/AdminToken.js'
import { useNavigate } from 'react-router-dom'
import Messages from '../Messages/Messages.jsx'
import Services from '../Services/Services.jsx'
import SocialMedia from '../SocialMedia/SocialMedia.jsx'

export default function Dashboard() {

    let {setAdminToken} = useContext(AdminToken) 
    let navigate = useNavigate()

    
    const logOut = () => {
        localStorage.removeItem('adminToken')
        setAdminToken(null)
        navigate('/login')
    }

  return <>
    <Helmet>
    <title>Dashboard</title>
    </Helmet>

    {/* navbar */}
        <nav className={`navbar bg-white py-0 shadow-sm roboto position-sticky top-0 start-0 end-0 z-3`}>
        <div className="container-lg px-5 vh-12">
            <div className="navbar-brand h-100">
            <img loading='lazy' className='w-100 h-100' src={logo} alt="Levels Der /m Clinic" />
            </div>
            <button onClick={logOut} className='btn btn-main rounded-1 lh-sm'>
                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                <span>Logout</span>
            </button>
        </div>
        </nav>

    {/* dashboard */}
    <div className="dashboard bg-light vh-88 w-100 d-flex justify-content-center roboto">
        <div className='container-lg px-5 mx-auto py-5'>
            <div className="row g-4 h-100">
                <div className="col-lg-2 col-md-3 col-sm-4">
                    <div className='border-endd border-dark-subtle'>
                        <p className='text-capitalize fw-bold text-main fs-4 mb-5'>Dashboard</p>
                        <ul className="nav flex-column align-items-sm-start align-items-center nav-tabs m-auto d-flex justify-content-evenly align-items-start border-0" id="myTab" role="tablist">
                            <li className="nav-item mb-4" role="presentation">
                                <button className="nav-link bg-transparent px-0 text-black text-capitalize fs-5 fw-medium position-relative border-0 active" id="messages-tab" data-bs-toggle="tab" data-bs-target="#messages-tab-pane" type="button" role="tab" aria-controls="messages-tab-pane" aria-selected="true">requests</button>
                            </li>
                            <li className="nav-item mb-4" role="presentation">
                                <button className="nav-link bg-transparent px-0 text-black text-capitalize fs-5 fw-medium position-relative border-0" id="services-tab" data-bs-toggle="tab" data-bs-target="#services-tab-pane" type="button" role="tab" aria-controls="services-tab-pane" aria-selected="false">services</button>
                            </li>
                            <li className="nav-item mb-4" role="presentation">
                                <button className="nav-link bg-transparent px-0 text-black text-capitalize fs-5 fw-medium position-relative border-0" id="social-tab" data-bs-toggle="tab" data-bs-target="#social-tab-pane" type="button" role="tab" aria-controls="social-tab-pane" aria-selected="false">social media</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='offset-lg-1 col-md-9 col-sm-8'>
                    <div className="tab-content" id="myTabContent">

                        <div className="tab-pane fade show active" id="messages-tab-pane" role="tabpanel" aria-labelledby="messages-tab" tabIndex="0">
                        {/* requests */}
                            <Messages />
                        </div>

                        <div className="tab-pane fade" id="services-tab-pane" role="tabpanel" aria-labelledby="services-tab" tabIndex="0">
                        {/* services */}
                            <Services />
                        </div>

                        <div className="tab-pane fade" id="social-tab-pane" role="tabpanel" aria-labelledby="social-tab" tabIndex="0">
                            {/* social media */}
                            <SocialMedia />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </>
}
