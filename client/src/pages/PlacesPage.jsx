import React from 'react'
import {PlusIcon} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

const PlacesPage = () => {
  return (
    <div>
      {action !== 'new' && (<div className='text-center'> 
        <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={`/account/places/new`} >
             <PlusIcon className='h-4 m-auto'/>
            Add new Places
        </Link>
      </div>)}
    {action === 'new' && (
        <div>
            <form>
                <input type="text" placeholder='title, for example: My lovely apt'/>
            </form>
        </div>
    )}
    </div>
  )
}

export default PlacesPage
