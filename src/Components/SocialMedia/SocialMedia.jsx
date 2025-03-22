import React, { useContext, useEffect, useState } from 'react'
import { AdminToken } from '../Context/AdminToken'
import axios from 'axios'
import { useFormik } from 'formik'
import Swal from 'sweetalert2';
import BeatLoader from 'react-spinners/BeatLoader';

export default function SocialMedia() {

    const BASE_URL = 'https://levelsodermclinic.up.railway.app'
    let { adminToken} = useContext(AdminToken) 
    const [social, setSocial] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)

    const getSocial = async(values) => {
        setLoading(true)
        let {data} = await axios.get(`${BASE_URL}/api/social-media`)
        setSocial(data)
        if(data.updatedAt){
            setLoading(false)
        }
    }

    const updateSocial = async(values) => {
        Swal.fire({
            title: 'Are you sure you want to update social media?',
            text: "This action will overwrite the current details. Proceed with caution!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0D6EFD',
            cancelButtonColor: '#A9A9A9',
            confirmButtonText: 'Yes, update!'
          }).then(async(result) => {
            if (result.isConfirmed) {
            setLoadingBtn(true)
            let {data} = await axios.patch(`${BASE_URL}/api/social-media`,values,
                {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })
            if(data.id){
                setLoadingBtn(false)
                Swal.fire({
                    title: "Updated!",
                    text: "The message has been updated.",
                    icon: "success"
                })
            }
        }
    })
}
      
    let formik = useFormik({
        enableReinitialize: true,
        initialValues: social || {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: '',
            tiktok: '',
            phone: '',
            email: '',
            address: ''
        },onSubmit:updateSocial
    })

    useEffect(()=>{
        getSocial()
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
    :<form onSubmit={formik.handleSubmit}>
        <div className="position-relative social">
            <input onChange={formik.handleChange} value={formik.values.facebook} id="facebook" type="text" placeholder="Facebook Url" name="facebook" className="form-control py-2 bg-body-secondary mb-3 ps-5" />
            <i className="fa-brands fa-facebook fs-4 position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
        </div>

        <div className="position-relative social">
            <input onChange={formik.handleChange} value={formik.values.twitter} id="twitter" type="text" placeholder="Twitter Url" name="twitter" className="form-control py-2 bg-body-secondary mb-3 ps-5" />
            <i className="fa-brands fa-twitter fs-4 position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
        </div>

        <div className="position-relative social">
            <input onChange={formik.handleChange} value={formik.values.instagram} id="instagram" type="text" placeholder="Instagram Url" name="instagram" className="form-control py-2 bg-body-secondary mb-3 ps-5" />
            <i className="fa-brands fa-instagram fs-4 position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
        </div>

        <div className="position-relative social">
            <input onChange={formik.handleChange} value={formik.values.linkedin} id="linkedin" type="text" placeholder="Linkedin Url" name="linkedin" className="form-control py-2 bg-body-secondary mb-3 ps-5" />
            <i className="fa-brands fa-linkedin fs-4 position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
        </div>

        <div className="position-relative social">
            <input onChange={formik.handleChange} value={formik.values.tiktok} id="tiktok" type="text" placeholder="Tiktok Url" name="tiktok" className="form-control py-2 bg-body-secondary mb-3 ps-5" />
            <i className="fa-brands fa-tiktok fs-4 position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
        </div>

        <div className="position-relative social">
            <input onChange={formik.handleChange} value={formik.values.phone} id="phone" type="tel" placeholder="Phone Number" name="phone" className="form-control py-2 bg-body-secondary mb-3 ps-5" />
            <i className="fa-solid fa-phone fs-4 position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
        </div>

        <div className="position-relative social">
            <input onChange={formik.handleChange} value={formik.values.email} id="email" type="email" placeholder="Email Address" name="email" className="form-control py-2 bg-body-secondary mb-3 ps-5" />
            <i className="fa-solid fa-envelope fs-4 position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
        </div>

        <div className="position-relative social">
            <input onChange={formik.handleChange} value={formik.values.address} id="address" type="text" placeholder="The Address" name="address" className="form-control py-2 bg-body-secondary mb-3 ps-5" />
            <i className="fa-solid fa-location-dot fs-4 position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
        </div>
        <div className="d-flex w-100 justify-content-center">
            {loadingBtn? <button type='button' className='btn btn-main position-absolute bottom-0'>
            <i className='fas fa-spinner fa-spin'></i>
            </button>
            :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-main bottom-0'>Update</button>
            }
        </div>
    </form>
}
  </>
}
