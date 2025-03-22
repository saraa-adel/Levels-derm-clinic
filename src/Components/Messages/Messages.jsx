import React, { useContext, useEffect, useState } from 'react'
import { AdminToken } from '../Context/AdminToken.js'
import axios from 'axios'
import Swal from 'sweetalert2';
import noRequest from '../../assets/images/No data-pana.svg'
import BeatLoader from 'react-spinners/BeatLoader.js';

export default function Messages() {

    const BASE_URL = 'https://levelsodermclinic.up.railway.app'
    let { adminToken} = useContext(AdminToken) 
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])

    const getMessages = async() => {
        setLoading(true)
        let {data} = await axios.get(`${BASE_URL}/api/messages`,{
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
              }
              
        })
        setMessages(data)
        setLoading(false)
    }

    const deleteMessage = (messageId) => {
        Swal.fire({
          title: 'Are you sure you want to delete this message?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#A9A9A9',
          confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
          if (result.isConfirmed) {
            setLoading(true)
            let {data} = await axios.delete(`${BASE_URL}/api/messages/${messageId}`,{
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })
            if(data.id){
                getMessages()
                setLoading(false)
                Swal.fire({
                    title: "Deleted!",
                    text: "The message has been deleted.",
                    icon: "success"
                })
                }
            }
        })
    }

    useEffect(()=>{
        getMessages()
    },[])
    
  return <>

    {loading?  <div className='bg-white position-absolute top-0 bottom-0 vh-100 end-0 start-0 d-flex justify-content-center align-items-center z-3'>
        <BeatLoader
        color='#D4AD62'
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    :<div className="row g-5">
        {messages.length > 0 ? (messages.map((message) => <div key={message.id} className="col-md-6">
            <div className="bg-light h-100 border shadow rounded-3 p-3">
                <div className="d-flex justify-content-end w-100">
                    <button className=' btn btn-outline-danger' onClick={() => deleteMessage(message.id)}>
                        <i className="fa-solid fa-trash-can fs-5"></i>
                    </button>
                </div>
                <p><span className='fw-medium'>Name: </span><span className='text-capitalize'>{message.name}</span></p>
                <p className='py-2'><span className='fw-medium'>Phone: </span><span>{message.phone}</span></p>
                <div className="d-flex">
                    <p className='fw-medium'>Services:</p>
                    <ul>
                    {message?.services?.length > 0 ? (
                        message.services.map((service) => <li key={service.id}>{service.title_en}</li>)
                        ) : <li>No services</li>}
                    </ul>
                </div>
            </div>
        </div>)): <div className='d-flex w-100 flex-column justify-content-center align-items-center'>
                <div>
                    <img loading='lazy' className='w-100' src={noRequest} alt="no request" />
                </div>
                <p>No Requests</p>
            </div>
        }
    </div>
}
  </>
}
