import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Link, useParams } from 'react-router-dom'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { Formik } from 'formik'
import * as yup from 'yup'
import Perks from '../components/Perks'
import axios from 'axios'

const schema = yup.object().shape({
    title: '',
    address: '',
    addedPhotos: '',
    photoLink: '',
    description: '',
    perks: '',
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: ''
})

const PlacesPage = () => {
    const { action } = useParams()
    const [photo, setPhoto] = useState(null)
    const [addedPhotos, setAddedPhotos] = useState([])

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

      async function addPhotoByLink(){
          const { data:filename } = await axios.post('/user/upload-by-link' , {link:photo})
          setPhoto('')
          setAddedPhotos(prev => {
            return [...prev , filename]
          })
        
      }

    return (
        <div>
            {action !== 'new' && (<div className='text-center'>
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={`/account/places/new`} >
                    <PlusIcon className='h-4 m-auto' />
                    Add new Places
                </Link>
            </div>)}
            {action === 'new' && (
                <div>
                    <Formik
                        initialValues={{
                            title: '',
                            address: '',
                            addedPhotos: '',
                            photoLink: '',
                            description: '',
                            perks: '',
                            extraInfo: '',
                            checkIn: '',
                            checkOut: '',
                            maxGuests: ''
                        }}
                        validationSchema={schema}
                        onSubmit={async(values, {resetForm})=>{
                         
                        }}
                    >
                        {({ handleSubmit , handleChange , handleBlur , errors , isValid , values }) => {
                           return <form onSubmit={handleSubmit}>
                              {preInput('Title' , 'Title for your place. should be short and catchy as in advertisement')}
                                <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.title} placeholder='title, for example: My lovely apt' />
                                {preInput('Address' , 'Address to this place')}
                                <input type="text" name="address" onChange={handleChange} onBlur={handleBlur} value={values.address} placeholder='address' />
                                {preInput('Photos' , 'more = better')}
                                <div className='flex gap-2'>
                                    <input type="text" name="photoLink" onChange={(e)=>setPhoto(e.target.value)} placeholder={'Add using a link .....jpg'} />
                                    <button onClick={addPhotoByLink} className='bg-gray-200 px-4 my-1.5 rounded-2xl'>Add&nbsp;photo</button>
                                </div>
                                <div className='grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                                    {addedPhotos.length > 0 && addedPhotos.map(link=>(
                                        <div>
                                            <img className='rounded-2xl' src={`http://localhost:4000/uploads/${link}`}/>
                                        </div>
                                    ))}
                                    <button className='flex gap-1 items-center justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                                        <CloudArrowUpIcon className='h-6 my-auto' />
                                        Upload
                                    </button>
                                </div>
                                {preInput('Description' , 'description of the place')}
                                <textarea type="text" name="description" onChange={handleChange} onBlur={handleBlur} value={values.description}/>
                              {preInput('Perks' , 'select all the perks of your place')}
                              <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                                    <Perks selected={values.perks} onChange={handleChange}/>
                                    </div>
                                {preInput('Extra info' , 'house rules, etc')}
                                <textarea />
                                {preInput('Check in&out times, max guests' , 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                                {preInput('' , 'house rules, etc')}
                                <div className='grid gap-2 sm:grid-cols-3'>
                                    <div className='mt-2 -mb-1'>
                                        <h3>Check in time</h3>
                                        <input type="text" name="checkin" onChange={handleChange} onBlur={handleBlur} value={values.checkIn} />
                                    </div>
                                    <div className='mt-2 -mb-1'>
                                        <h3>Check out time</h3>
                                        <input type="text" name="checkout" onChange={handleChange} onBlur={handleBlur} value={values.checkOut} />
                                    </div>
                                    <div className='mt-2 -mb-1'>
                                        <h3>Max number of guests</h3>
                                        <input type="text" name="extraInfo" onChange={handleChange} onBlur={handleBlur} value={values.extraInfo} />
                                    </div>
                                </div>
                                <button type='submit' className='primary my-4'>Save</button>
                            </form>
                        }}

                    </Formik>
                </div>
            )}
        </div>
    )
}

export default PlacesPage
