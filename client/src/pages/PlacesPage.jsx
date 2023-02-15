import React from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Link, useLocation} from 'react-router-dom'
import AllPlaces from '../components/AllPlaces'
import PlaceForm from './PlaceForm'

const PlacesPage = () => {
    const { pathname }= useLocation()
    const paths = pathname.split('/')
    const subpage = paths[paths.length - 1]

    return (
        <div>
            {subpage !== 'new' && (<div className='text-center'>
                list of all added places
                <br/>
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={`/account/places/new`} >
                    <PlusIcon className='h-4 m-auto' />
                    Add new Places
                </Link>
            <AllPlaces/>
            </div>)}
            {subpage === 'new' && (
               <PlaceForm/>
            )}
        </div>
    )
}

export default PlacesPage
