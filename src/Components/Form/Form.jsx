import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import logo from '../../assets/images/levels_derm_logo.png'
import videoBackground from '../../assets/images/Reel02.mp4'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast';
import BeatLoader from 'react-spinners/BeatLoader'
import linktree from '../../assets/images/linktree-logo-icon.svg'

export default function Form() {

    const BASE_URL = 'https://levelsodermclinic.up.railway.app';
    const [lang, setLang] = useState('ar')
    const [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [socialMedia, setSocialMedia] = useState('')
    const [servicesAr, setServicesAr] = useState([])
    const [servicesEn, setServicesEn] = useState([])
    const [formKey, setFormKey] = useState(0)

    const langSwitch = () => {
        if(lang==='ar'){
            setLang('en')
        }
        else{
            setLang('ar')
        }
    }

    // get social media
    const getSociaMedia = async() => {
        setLoading(true)
        let {data} = await axios.get(`${BASE_URL}/api/social-media`)
        setSocialMedia(data)
        setLoading(false)
    }

    // get all services
    const getServices = async() => {
        setLoading(true)
        let {data} = await axios.get(`${BASE_URL}/api/services`)
        const titlesAr = [...data.map(item => ({ id: item.id, value: item.title_ar, label: item.title_ar}))]
        const titlesEn = [...data.map(item => ({ id: item.id, value: item.title_ar, label: item.title_en}))]
        setServicesAr(titlesAr)
        setServicesEn(titlesEn)
        setLoading(false)
    }
    
    useEffect(() => {
        getSociaMedia()
        getServices()
        localStorage.removeItem("adminToken")
    },[])


    // form send
    const messageSend = async(values ,{resetForm}) =>{
        setLoadingBtn(true)        
        let {data} = await axios.post(`${BASE_URL}/api/messages`, values,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        if(data?.id){
            resetForm()
            setFormKey((prevKey) => prevKey + 1)
            setLoadingBtn(false)
            toast.success(lang==='ar'? 'شكرًا لك على تقديم طلبك! لقد تلقينا معلوماتك وسنقوم بالتواصل معك قريبًا':'Thank you for submitting your request! We have received your information and will contact you soon',{duration :5000})
        }
    }

    // validation
    let validationSchema = yup.object({
        name: yup.string().required(lang === 'ar' ? 'الاسم مطلوب' : 'Name is required').min(3, lang === 'ar' ? 'الحد الأدنى 3 أحرف' : 'Minimum length is 3').max(30, lang === 'ar' ? 'الحد الأقصى 30 أحرف' : 'Maximum length is 10'),
        phone: yup.string().required(lang === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone is required').matches(/^(?:\+966|0)?5[0-9]{8}$/, lang === 'ar' ? 'يجب إدخال رقم هاتف سعودي صحيح' : 'We need an Saudi number'),
        services: servicesAr.length === 0 && servicesEn.length === 0 ? yup.array(): yup.array().required('Services is required').min(1, lang==='ar'? "يرجى اختيار خدمة واحدة على الأقل" : "Please select at least one service")
    })
  
    let formik = useFormik({
      initialValues:{
        name:'',
        phone:'',
        email:'',
        services:[]
      },validationSchema
      ,onSubmit:messageSend
    })

  return <>

    {/* loading */}
    {loading?  <div className='bg-white position-absolute top-0 bottom-0 vh-100 end-0 start-0 d-flex justify-content-center align-items-center z-3'>
        <BeatLoader
        color='#D4AD62'
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    :<>
      {/* navbar */}
    <nav className={`navbar bg-white py-0 shadow-sm ${lang==='ar'? 'roboto':'cairo'} position-sticky top-0 start-0 end-0 z-3`}>
        <div className="container-lg px-5 vh-12">
            <div className="navbar-brand">
                <img loading='lazy' src={logo} alt="Levels Der /m Clinic" />
            </div>
            <button onClick={langSwitch} className='btn btn-main rounded-1 lh-sm'>{lang==='ar'? 'En':'عر'}</button>
        </div>
    </nav>

    {/* form */}
    <div dir={lang==='ar'? 'rtl':''} className={`bg-black-60 vh-88 w-100 d-flex align-items-center justify-content-center ${lang==='ar'? 'cairo':'roboto'}`}>
        <video autoPlay muted loop playsInline className="bg-video">
            <source src={videoBackground} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className='container-lg px-5 mx-auto py-sm-0 py-5'>
            <div className="row gx-5 py-md-5 py-5 rounded-1 justify-content-between shadow m-0 bg-white">
                <div className="col-xl-3 col-md-4">
                    <div className='bg-secondary-emphasis position-relative d-md-block d-sm-flex align-items-start justify-content-between pb-md-0 pb-4'>
                        <Link to={`${socialMedia?.address}`} target='_blank' className='d-flex px-2 flex-column align-items-center text-black text-decoration-none'>
                            <i className="fa-solid fa-location-dot fs-4 text-main pb-2"></i>
                            <p className='mb-1 fw-semibold text-hover'>{lang==='ar'? 'العنوان':'Address'}</p>
                            <p className='text-body-tertiary small text-capitalize text-center mb-0'>{lang==='ar'? 'المدينة المنورة – الخالدية – جبار بن صخر':'Al-Madinah Al-Munawwarah – Al-Khalidiyyah – Jabbar Bin Sakhr'}</p>
                        </Link>
                        <Link to={`tel:${socialMedia?.phone}`} className='d-flex px-2 flex-column align-items-center py-md-4 py-sm-0 py-4 text-black text-decoration-none'>
                            <i className="fa-solid fa-phone fs-4 text-main pb-2"></i>
                            <p className='mb-1 fw-semibold text-hover'>{lang==='ar'? 'الهاتف':'Phone'}</p>
                            <p dir='ltr' className='text-body-tertiary small mb-0'>{socialMedia?.phone}</p>
                        </Link>
                        <Link to={`mailto:${socialMedia?.email}`} className='d-flex px-2 flex-column align-items-center text-black text-decoration-none'>
                            <i className="fa-solid fa-envelope fs-4 text-main pb-2"></i>
                            <p className='mb-1 fw-semibold text-hover'>{lang==='ar'? 'البريد الإلكتروني':'Email'}</p>
                            <p className='text-body-tertiary small mb-0'>{socialMedia?.email}</p>
                        </Link>
                    <div className={`border-separate my-auto ${lang==='ar'? 'start-0':'end-0'} d-md-block d-none`}></div>
                    </div>
                </div>
                <div className="col-xl-9 col-md-8 position-relative">
                    <div>
                        <div>
                            <p className='fs-5 fw-semibold text-main mb-1'>{lang==='ar'? 'أرسل لنا رسالة':'Send Us Message'}</p>
                            <p className='text-body-tertiary'>{lang==='ar'? 'في عالم ملئ بالتكرار ، كوني أنتي ، كوني مميزة  ، كوني ':'In a world full of repetition, be yourself, be unique, be '}<span className='fw-medium roboto'>DIVA</span><br />{lang==='ar'? 'مع ليفلز، جمالك لا يعرف حدود':'With Levels, your beauty knows no bounds'}</p>
                        </div>
                        <form key={formKey} onSubmit={formik.handleSubmit}>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="name" placeholder={lang==='ar'? 'أدخل اسمك':'Enter your name'} className='form-control py-2 bg-body-secondary mb-3' />
                            {formik.errors.name && formik.touched.name?<div className="alert alert-danger py-2">{formik.errors.name}</div>: ''}

                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="phone" placeholder={lang==='ar'? 'أدخل هاتفك':'Enter your phone'} className='form-control py-2 bg-body-secondary mb-3' />
                            {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger py-2">{formik.errors.phone}</div>: ''}

                            <Select
                                isMulti
                                name="services"
                                options={lang==='ar'? servicesAr:servicesEn}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder={lang==='ar'? 'اختر خدمة أو أكثر':'Choose one or more services'}
                                value={(lang === 'ar' ? servicesAr : servicesEn).filter(option => formik.values.services.includes(option.id))}
                                onChange={(selectedOptions) => formik.setFieldValue("services", selectedOptions.map(option => option.id))}
                                onBlur={() => formik.setFieldTouched("services", true)}
                            />
                            {formik.errors.services && formik.touched.services ? <div className="alert alert-danger py-2">{formik.errors.services}</div>:''}
                            
                            {loadingBtn? <button type='button' className='btn btn-main position-absolute bottom-0'>
                            <i className='fas fa-spinner fa-spin'></i>
                            </button>
                            :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-main position-absolute bottom-0'>{lang==='ar'? 'إرسال':'Send'}</button>
                            }
                            <button type='button' className='btn mt-4 opacity-0'></button> 
                            <Toaster />
                        </form>
                    </div>
                </div>
            <div className={`w-100 d-flex align-items-center ${lang==='ar'? 'justify-content-sm-start justify-content-center flex-row-reverse':'justify-content-sm-end justify-content-center flex-row'} pt-sm-3 pt-4`}>
                <Link className='text-decoration-none' target='_blank' to={`https://wa.me/966${socialMedia.facebook}`}><i className="fa-brands fa-whatsapp whatsapp scale text-black d-flex fs-4 pe-3 cursor-pointer"></i></Link>
                <Link className='text-decoration-none' target='_blank' to={socialMedia.tiktok}><i className="fa-brands fa-tiktok tiktok scale text-black d-flex fs-4 pe-3 cursor-pointer"></i></Link>
                <Link className='text-decoration-none' target='_blank' to={socialMedia.instagram}><i className="fa-brands fa-instagram instagram scale text-black d-flex fs-4 pe-3 cursor-pointer"></i></Link>
                <Link className='text-decoration-none' target='_blank' to={socialMedia.twitter}><i className="fa-brands fa-snapchat text-black scale text-black d-flex fs-4 pe-3 cursor-pointer"></i></Link>
                <Link className='text-decoration-none' target='_blank' to={socialMedia.linkedin}><div className='me-sm-3 linktree-w d-flex align-items-center justify-content-center'>
                    <img loading='lazy' className='w-100 scale cursor-pointer' src={linktree} alt="linktree" />
                </div></Link>
            </div>
            </div>
        </div>
    </div>
  </>}
  
  </>
}