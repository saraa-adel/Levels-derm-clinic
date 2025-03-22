import React, { useContext, useEffect, useState } from 'react'
import { AdminToken } from '../Context/AdminToken.js'
import axios from 'axios'
import Swal from 'sweetalert2';
import noServices from '../../assets/images/No data-rafiki.svg'
import BeatLoader from "react-spinners/BeatLoader";

export default function Services() {

    const BASE_URL = 'https://levelsodermclinic.up.railway.app'
    let { adminToken} = useContext(AdminToken) 
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState([])

    const getServices = async() => {
        setLoading(true)
        let {data} = await axios.get(`${BASE_URL}/api/services`,{
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
              }
              
        })
        setServices(data)
        setLoading(false)
    }

    const editService = async(id,title_ar,title_en) => {
        setLoading(true)
            let {data} = await axios.patch(`${BASE_URL}/api/services/${id}`,
                {title_ar,title_en},
                {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })
            if(data.id){
                getServices()
                setLoading(false)
                Swal.fire({
                    title: "Updated!",
                    text: "The service has been updated.",
                    icon: "success"
                })
                }
    }

    const addService = async(title_ar,title_en) => {
        setLoading(true)
            let {data} = await axios.post(`${BASE_URL}/api/services`,
                {title_ar,title_en},
                {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })
            if(data.id){
                getServices()
                setLoading(false)
                Swal.fire({
                    title: "Added!",
                    text: "The service has been Added.",
                    icon: "success"
                })
                }
    }

    const serviceProcess = async(mode, id = null , titleAr = "", titleEn = "") => {
        const { value: formValues  } = await Swal.fire({
            title: mode === "edit" ? "Edit The Service" : "Add New Service",
            html: `
                <input id="swal-input1" class="swal2-input form-control w-auto mx-auto py-2 bg-body-secondary mb-3" placeholder='Arabic service' value="${titleAr}">
                <input id="swal-input2" class="swal2-input form-control w-auto mx-auto py-2 bg-body-secondary mb-3" placeholder='English service' value="${titleEn}">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText:  mode === "edit" ? "Update":"Add",
            preConfirm: async() => {
                const title_ar = document.getElementById("swal-input1").value.trim()
                const title_en = document.getElementById("swal-input2").value.trim()

                if (!title_ar || !title_en) {
                    Swal.showValidationMessage("Both fields are required!");
                    return false;
                }
                mode==='edit'? editService(id,title_ar,title_en) : addService(title_ar,title_en)
            }
        })
    }

    const deleteService = (serviceId) => {
        Swal.fire({
          title: 'Are you sure you want to delete this service?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#A9A9A9',
          confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
          if (result.isConfirmed) {
            setLoading(true)
            let {data} = await axios.delete(`${BASE_URL}/api/services/${serviceId}`,{
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })
            if(data.id){
                getServices()
                setLoading(false)
                Swal.fire({
                    title: "Deleted!",
                    text: "The service has been deleted.",
                    icon: "success"
                })
                }
            }
        })
    }

    useEffect(()=>{
        getServices()
    },[])
    
  return <>

    {loading? <div className='bg-white position-absolute top-0 bottom-0 vh-100 end-0 start-0 d-flex justify-content-center align-items-center z-3'>
        <BeatLoader
        color='#D4AD62'
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    :<div className="row g-5 justify-content-center">
        {services.length > 0 ? (services.map((service) => <div key={service.id} className="col-lg-6">
            <div className="bg-light h-100 border shadow rounded-3 p-3">
                <div className="d-flex justify-content-end w-100">
                    <button className='btn btn-outline-primary me-3' onClick={() => serviceProcess('edit',service.id ,service.title_ar ,service.title_en)}>
                        <i className="fa-solid fa-pen fs-5"></i>
                    </button>
                    <button className='btn btn-outline-danger' onClick={() => deleteService(service.id)}>
                        <i className="fa-solid fa-trash-can fs-5"></i>
                    </button>
                </div>
                <p className='py-2'><span className='fw-medium'>Service in Arabic:  </span><span>{service.title_ar}</span></p>
                <p><span className='fw-medium'>Service in English:  </span><span className='text-capitalize'>{service.title_en}</span></p>
            </div>
        </div>)):<div className='d-flex w-100 flex-column justify-content-center align-items-center'>
                <div>
                    <img loading='lazy' className='w-100' src={noServices} alt="no request" />
                </div>
                <p>No Services</p>
            </div>
        }

        {/* add service */}
        <div className="col-lg-6">
            <div className="bg-light h-100 border shadow rounded-3 text-center p-3 d-flex w-100 justify-content-center align-items-center">
                <button className=' btn btn-main' onClick={() => serviceProcess('add')}>
                    <i className="fa-solid fa-plus fs-5"></i>
                </button>
            </div>
        </div>
    </div>
}
  </>
}
