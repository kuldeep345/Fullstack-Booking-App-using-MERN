import axios from 'axios'
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'

const IndexPage = () => {
    const [places , setPlaces] = useState([])

    useEffect(() => {
      axios.get('/user/allplaces').then(response => {
        setPlaces(response.data)
      })
    }, [])
    
    console.log(places)

    return (
    
        <div className='mt-8 gap-x-8 gap-y-8 grid grid-cols-1 sm:grid-cols-2 mx-auto lg:grid-col-3 xl:grid-cols-4 md:px-10'>
        {places.length > 0 && places.map(place => (
            <Link to={`/place/${place._id}`}>
                <div className='bg-gray-500 h-[270px] w-[270px] mb-2 rounded-2xl'>
                {place.photos?.[0] && (
                    <img className='rounded-2xl object-cover aspect-square' src={`http://localhost:4000/uploads/${place.photos[0]}`} alt=""/>
                    )}
                    </div>
                <h3 className='font-semibold text-xl truncate'>{place.title}</h3>
                <h2 className='text-sm text-gray-500'>{place.address.slice()}</h2>
                <div>
                    <span className='font-semibold'>${place.price} per night</span>
                </div>
            </Link>
        ))}
        </div>
     
    )
}

export default IndexPage
