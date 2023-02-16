import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import BookingWidget from '../components/BookingWidget'
import PlaceGallery from '../components/PlaceGallery'
import AddressLink from '../components/AddressLink'

const PlacePage = () => {

  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/user/places/${id}`).then(response => {
      setPlace(response.data)
    })
  }, [id])

  if (!place) return '';

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-h-screen">
        <div className='p-8 grid gap-4 bg-black text-white'>
          <div>
            <h2 className='text-3xl mr-48'>Photos of {place.title}</h2>
            <button onClick={() => setShowAllPhotos(false)} className='fixed right-12 top-8 text-black inline-flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white'>
              <XMarkIcon className='h-6' />
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 && place.photos.map(photo => (
            <img key={photo} src={`http://localhost:4000/uploads/${photo}`} alt="" />
          ))}
        </div>
      </div>

    )
  }

 

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-2xl">{place.title}</h1>
     <AddressLink>{place.address}</AddressLink>
      <div className="relative">
        <PlaceGallery showAllPhotos={showAllPhotos} setShowAllPhotos={showAllPhotos} place={place}/>
        <button onClick={() => setShowAllPhotos(true)} className='absolute inline-flex gap-1 bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
          <PhotoIcon className='h-6' />
          Show more photos
        </button>
      </div>

      <div className='mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <div className='my-4'>
            <h2 className='font-semibold text-2xl'>Description</h2>
            {place.description}
          </div>
          <div>
            Check-in: {place.checkIn}<br />
            Check-out: {place.checkIn}<br />
            Max number of guests: {place.maxGuests}
          </div>
        </div>
        <BookingWidget place={place}/>
      </div>
      <div className='bg-white -mx-8 px-8 py-8  border-t'>
      <div>
        <h2 className='font-semibold text-2xl mt-4'>Extra info</h2>
      </div>
      <div className='mb-4 mt-2 text-sm text-gray-700 leading-5'>{place.extraInfo}</div>
      </div>
     
    </div>
  )
}

export default PlacePage
