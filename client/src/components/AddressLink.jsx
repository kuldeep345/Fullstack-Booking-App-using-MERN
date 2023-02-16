import React from 'react'
import { MapPinIcon } from '@heroicons/react/24/outline'

const AddressLink = ({children , className=null}) => {
    
  return (
    <a className={`inline-flex my-2 gap-1 font-semibold underline ${className}`} target="_blank" href={`https://maps.google.com/?q=${children}`}>
        <MapPinIcon className='h-5'/>
        {children}
    </a>
  )
}

export default AddressLink
