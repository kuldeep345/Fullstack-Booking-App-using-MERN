import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import Perks from '../components/Perks'
import PhotoUploader from '../components/PhotoUploader'
import axios from 'axios'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'


const schema = yup.object().shape({
    title: yup.string().required(),
    address: yup.string().required(),
    description: yup.string().required(),
    extraInfo: yup.string().required(),
    checkIn: yup.string().required(),
    checkOut: yup.string().required(),
    maxGuests: yup.string().required(),
})

const PlaceForm = () => {

    const [res ,setRes] = useState({
        title: '',
        address: '',
        description: '',
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuests: '',
    })
    const { id } = useParams()
    const [perks, setPerks] = useState([])
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photo, setPhoto] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get(`/user/places/${id}`).then((res)=>{
            const {data} = res;
            setRes(data)
            setPerks(data.perks)
            setAddedPhotos(data.photos)
        })
    }, [id])
    

    function inputHeader(text){
        return <h2 className='text-2xl mt-4'>{text}</h2>
       }
    
       function inputDescription(text){
        return (
          <p className='text-gray-500 text-sm'>{text}</p>
        )
       }
    
      function preInput(header , description){
        return (
          <>
          {inputHeader(header)}
          {inputDescription(description)}
          </>
        )
      }  

  return (
    <div>
    <Formik
        initialValues={{
            title: res.title,
            address: res.address,
            description: res.description,
            extraInfo: res.extraInfo,
            checkIn: res.checkIn,
            checkOut: res.checkOut,
            price:res.price,
            maxGuests: res.maxGuests
        }}
        enableReinitialize={true} 
        validationSchema={schema}
        onSubmit={async(values, {resetForm})=>{
            if(id){
        
             await axios.put('/user/places', {...values, id , perks , addedPhotos})
                navigate('/account/places')
                resetForm({values:""})
                setPerks([])
                setAddedPhotos([])
                setPhoto(null)
            }
            else{
                await axios.post('/user/places' , {...values , perks , addedPhotos})
                navigate('/account/places')
                resetForm({values:""})
                setPerks([])
                setAddedPhotos([])
                setPhoto(null)
            }
      
            
        }}
    >
        {({ handleSubmit , handleChange , handleBlur , errors , isValid , values }) => {

           return <form onSubmit={handleSubmit}>
              {preInput('Title' , 'Title for your place. should be short and catchy as in advertisement')}
                <input type="text" name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} placeholder='title, for example: My lovely apt' />
                {preInput('Address' , 'Address to this place')}
                <input type="text" name="address" onChange={handleChange} onBlur={handleBlur} value={values.address} placeholder='address' />
                {preInput('Photos' , 'more = better')}
                <PhotoUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} photo={photo} setPhoto={setPhoto}/>
                {preInput('Description' , 'description of the place')}
                <textarea type="text" name="description" onChange={handleChange} onBlur={handleBlur} value={values.description}/>
              {preInput('Perks' , 'select all the perks of your place')}
              <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                   <Perks selected={perks} onChange={setPerks}/>
                    </div>
                {preInput('Extra info' , 'house rules, etc')}
                <textarea name="extraInfo" onChange={handleChange} onBlur={handleBlur} value={values.extraInfo}/>
                {preInput('Check in&out times, max guests' , 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                {preInput('' , 'house rules, etc')}
                <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                    <div className='mt-2 -mb-1'>
                        <h3>Check in time</h3>
                        <input type="number" name="checkIn" onChange={handleChange} onBlur={handleBlur} value={values.checkIn} />
                    </div>
                    <div className='mt-2 -mb-1'>
                        <h3>Check out time</h3>
                        <input type="number" name="checkOut" onChange={handleChange} onBlur={handleBlur} value={values.checkOut} />
                    </div>
                    <div className='mt-2 -mb-1'>
                        <h3>Max number of guests</h3>
                        <input type="number" name="maxGuests" onChange={handleChange} onBlur={handleBlur} value={values.maxGuests} />
                    </div>
                    <div className='mt-2 -mb-1'>
                        <h3>Price per night</h3>
                        <input type="number" name="price" onChange={handleChange} onBlur={handleBlur} value={values.price} />
                    </div>
                </div>
                <button type='submit' className='primary my-4'>Save</button>
            </form>
        }}

    </Formik>
</div>
  )
}

export default PlaceForm
