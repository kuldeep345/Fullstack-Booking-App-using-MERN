import axios from 'axios'
import React from 'react'
import { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'

const AllPlaces = () => {

    const [places, setPlaces] = useState([])
    
    useEffect(() => {
      axios.get('/user/places').then(({data})=>{
        setPlaces(data)
      })
    }, [])
    

  return (
    <div className='mt-4'>
        {places.length > 0 && places.map(place => (
            <Link key={place._id} to={`/account/places/${place._id}`} className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl my-8'>
                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                    {place.photos.length && (
                        <img className='object-cover' src={`${process.env.REACT_APP_BASE_URL}/uploads/${place.photos[0]}`} alt="" />
                    )}
                </div>
                <div className='grow-0 shrink'>  
                    <h2 className='text-xl'>{place.title}</h2>
                    <p className="text-sm">{place.description}</p>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default AllPlaces
