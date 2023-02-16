import React from 'react'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

const PlaceGallery = ({showAllPhotos, setShowAllPhotos, place}) => {

 

  return (
     <div className="grid gap-2 grid-cols-[2fr_1fr]">
          <div className="grid">
            {place.photos?.[0] && <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="" />}
          </div>
          <div className="grid gap-2">
            {place.photos?.[1] && <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`http://localhost:4000/uploads/${place.photos[1]}`} alt="" />}
            <div className="overflow-hidden">
              {place.photos?.[2] && <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={`http://localhost:4000/uploads/${place.photos[2]}`} alt="" />}
            </div>
          </div>
        </div>
  )
}

export default PlaceGallery
